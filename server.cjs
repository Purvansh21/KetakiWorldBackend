// server.cjs


const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { verifyToken, createClerkClient } = require('@clerk/backend');
const helmet = require('helmet');
const winston = require('winston');
const path = require('path');
require('dotenv').config();

console.log('🚧 CWD:', process.cwd());
console.log('🚧 Files in project root:', fs.readdirSync(process.cwd()));


const app = express();

// CORS setup to allow multiple origins for dev and prod
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  // 'https://your-production-domain.com',
  'https://mypartnerketakiworld.onrender.com' 
// <-- Replace with your real production domain
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Add rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Multer setup for file uploads (max 25MB per file)
const upload = multer({ dest: 'uploads/', limits: { fileSize: 25 * 1024 * 1024 } }).fields([
  { name: 'aadhaarPhoto', maxCount: 1 },
  { name: 'gstCert', maxCount: 1 },
  { name: 'electricityBill', maxCount: 1 }
]);

// Google Drive Auth
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost'
);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oAuth2Client });

// File type whitelist
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

// Zod schema for input validation
const onboardingSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  pan: z.string().regex(/^[A-Z0-9]{10}$/),
  panName: z.string().min(1),
  aadhaarNumber: z.string().regex(/^\d{12}$/),
  gstNumber: z.string().regex(/^[A-Z0-9]{15}$/i)
});

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});


app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // allow your own code plus Clerk’s script
        "script-src": [
          "'self'",
          "https://innocent-moth-72.clerk.accounts.dev"
        ],
        // allow blob workers and include them in script-src-elem too
        "worker-src": [
          "'self'",
          "blob:"
        ],
        "script-src-elem": [
          "'self'",
          "blob:",
          "https://innocent-moth-72.clerk.accounts.dev"
        ],
        // allow your own origin plus data URIs and these external hosts
        "img-src": [
          "'self'",
          "data:",
          "https://images.unsplash.com",
          "https://unpkg.com",
          "https://img.clerk.com"
        ],
        // allow Clerk API connections
        "connect-src": [
          "'self'",
          "https://innocent-moth-72.clerk.accounts.dev"
        ],
        // keep all other directives at their default Helmet values
      }
    }
  })
);



const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

async function uploadToDrive(file, folderId) {
  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [folderId],
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    },
    fields: 'id, webViewLink',
  });
  // Share with reviewer email
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: { role: 'reader', type: 'user', emailAddress: 'testmail0532949@gmail.com' },
  });
  fs.unlinkSync(file.path);
  return res.data.webViewLink;
}

// Clerk JWT authentication middleware using authenticateRequest
async function requireClerkAuth(req, res, next) {
  try {
    // Build the full URL for Clerk
    const protocol = req.protocol || 'http';
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;
    //req.url = fullUrl;

    const authenticationResult = await clerkClient.authenticateRequest(req, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: [
        'http://localhost:8080',
        'http://localhost:5173',
        'http://localhost:3000',
        // 'https://your-production-domain.com', // <-- Replace with your real production domain
      ],
    });

    const { isSignedIn, session, userId } = authenticationResult;

    if (!isSignedIn) {
      return res.status(401).json({ error: 'Authentication failed. Please log in again and try.' });
    }
    req.clerkUser = { userId, session };
    next();
  } catch (err) {
    // Log a general error without exposing sensitive details
    console.error('Clerk authentication error:', err.message);
    res.status(401).json({ error: 'Authentication failed. Please log in again and try.' });
  }
}

// Onboarding endpoint
app.post('/api/onboarding', requireClerkAuth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // Multer errors (file size, etc.)
      let msg = 'Something went wrong. Please try again after some time.';
      if (err.code === 'LIMIT_FILE_SIZE') {
        msg = 'One of your files is too large. Please upload files smaller than 25MB.';
      }
      return res.status(400).json({ error: msg });
    }
    // Validate fields
    try {
      onboardingSchema.parse(req.body);
    } catch (e) {
      // Zod validation errors
      return res.status(400).json({ error: 'Some of your details are invalid. Please check the highlighted fields and try again.', details: e.errors });
    }
    // Validate files
    const files = req.files;
    if (!files.aadhaarPhoto || !files.gstCert || !files.electricityBill) {
      return res.status(400).json({ error: 'All required documents must be uploaded. Please check and try again.' });
    }
    // File type validation
    for (const key of ['aadhaarPhoto', 'gstCert', 'electricityBill']) {
      const file = files[key][0];
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return res.status(400).json({ error: `The file you uploaded for ${key} is not a supported type. Please upload a PDF, JPG, or PNG.` });
      }
    }

    logger.info('Files received:', req.files);
    logger.info('Form fields received:', req.body);

    // Validate fields
    const {
      name, phone, email, pan, panName, aadhaarNumber, gstNumber
    } = req.body;
    if (!name || !phone || !email || !pan || !panName || !aadhaarNumber || !gstNumber) {
      logger.error('Validation Error: Missing required form fields.');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      logger.info('Attempting to upload files to Google Drive...');
      // Upload files to Google Drive
      const aadhaarUrl = await uploadToDrive(files.aadhaarPhoto[0], process.env.GOOGLE_DRIVE_FOLDER_ID);
      const gstUrl = await uploadToDrive(files.gstCert[0], process.env.GOOGLE_DRIVE_FOLDER_ID);
      const billUrl = await uploadToDrive(files.electricityBill[0], process.env.GOOGLE_DRIVE_FOLDER_ID);
      logger.info('Files uploaded to Google Drive. URLs:', { aadhaarUrl, gstUrl, billUrl });

      // Send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // Changed to true for SSL port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      logger.info('Attempting to send email...');
      const mailOptions = {
        from: process.env.SMTP_USER, // Ensuring consistent sender with auth user
        to: process.env.MAIL_TO,
        subject: 'New Onboarding Submission',
        html: `
          <h2>New Onboarding Submission</h2>
          <ul>
            <li><b>Name:</b> ${name}</li>
            <li><b>Phone:</b> ${phone}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>PAN:</b> ${pan}</li>
            <li><b>Name on PAN:</b> ${panName}</li>
            <li><b>Aadhaar Number:</b> ${aadhaarNumber}</li>
            <li><b>GST Number:</b> ${gstNumber}</li>
          </ul>
          <h3>Documents:</h3>
          <ul>
            <li><b>Aadhaar Photo:</b> <a href="${aadhaarUrl}">${aadhaarUrl}</a></li>
            <li><b>GST Certificate:</b> <a href="${gstUrl}">${gstUrl}</a></li>
            <li><b>Electricity Bill:</b> <a href="${billUrl}">${billUrl}</a></li>
          </ul>
        `
      };

      await transporter.sendMail(mailOptions);
      logger.info('Email sent successfully!');
      res.json({ success: true });
    } catch (error) {
      logger.error('Server error during onboarding submission:', error.message, error);
      res.status(500).json({ error: 'Something went wrong while processing your submission. Please try again after some time.' });
    }
  });
});

// Rate limit error handler (must be after all routes)
app.use((err, req, res, next) => {
  if (err && err.status === 429) {
    return res.status(429).json({ error: 'You have submitted too many requests. Please wait a few minutes and try again.' });
  }
  next(err);
});

// Serve your Vite build from <project-root>/src/dist
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));

// SPA fallback for non-API routes
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
