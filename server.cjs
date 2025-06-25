// server.cjs

const express       = require('express');
const multer        = require('multer');
const nodemailer    = require('nodemailer');
const { google }    = require('googleapis');
const fs            = require('fs');
const cors          = require('cors');
const rateLimit     = require('express-rate-limit');
const { z }         = require('zod');
const { verifyToken, createClerkClient } = require('@clerk/backend');
const helmet        = require('helmet');
const winston       = require('winston');
const path          = require('path');
const { GoogleAuth } = require('google-auth-library');
require('dotenv').config();



const app = express();

// ------------------------------
// 1) SECURITY: Helmet + CSP
// ------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // your own code + Clerk’s remote bundle
        "script-src": [
          "'self'",
          "https://innocent-moth-72.clerk.accounts.dev"
        ],
        // allow <script> tags from same sources
        "script-src-elem": [
          "'self'",
          "https://innocent-moth-72.clerk.accounts.dev"
        ],
        // allow Web Workers spun up via blob:
        "worker-src": [
          "'self'",
          "blob:"
        ],
        // images from your own origin, data URIs, and the external hosts
        "img-src": [
          "'self'",
          "data:",
          "https://images.unsplash.com",
          "https://unpkg.com",
          "https://img.clerk.com"
        ],
        // fetch/XHR to Clerk APIs, telemetry, your local dev, and production API
        "connect-src": [
          "'self'",
          "https://innocent-moth-72.clerk.accounts.dev",
          "https://clerk-telemetry.com",
          "http://localhost:3000",
          "http://localhost:5173",
          "http://localhost:8080",
          "https://mypartnerketakiworld.onrender.com"
        ],
        // leave everything else at Helmet’s defaults
      }
    }
  })
);


// ------------------------------
// 2) CORS
// ------------------------------
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mypartnerketakiworld.onrender.com'
];

const rawJwtKey = process.env.CLERK_JWT_KEY;
// Attempt to replace escaped newlines if they are present in the environment variable
const processedJwtKey = rawJwtKey ? rawJwtKey.replace(/\\n/g, '\n') : undefined;

// Add a log to show the start of the JWT Key being read (first 50 chars)
console.log('🚧 Processed CLERK_JWT_KEY start:', processedJwtKey ? processedJwtKey.substring(0, 50) + '...' : 'Not Set');

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// ------------------------------
// 3) Rate limiting on /api/
// ------------------------------
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ------------------------------
// 4) Multer for uploads
// ------------------------------
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 25 * 1024 * 1024 }
}).fields([
  { name: 'aadhaarPhoto', maxCount: 1 },
  { name: 'gstCert',     maxCount: 1 },
  { name: 'electricityBill', maxCount: 1 }
]);

// ------------------------------
// 5) Google Drive setup
// ------------------------------
// New Service Account–based Drive setup


const saKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON;
let saKey;
try {
  saKey = JSON.parse(saKeyRaw);
} catch {
  // if you stored it base64-encoded
  const json = Buffer.from(saKeyRaw, 'base64').toString('utf8');
  saKey = JSON.parse(json);
}

const auth = new GoogleAuth({
  credentials: saKey,
  scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

async function uploadToDrive(file, folderId) {
  const res = await drive.files.create({
    requestBody: { name: file.originalname, parents: [folderId] },
    media: { mimeType: file.mimetype, body: fs.createReadStream(file.path) },
    fields: 'id, webViewLink'
  });
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: { role: 'reader', type: 'user', emailAddress: 'testmail0532949@gmail.com' }
  });
  fs.unlinkSync(file.path);
  return res.data.webViewLink;
}


// ------------------------------
// 6) Zod schema & logger
// ------------------------------
const ALLOWED_MIME_TYPES = ['application/pdf','image/jpeg','image/png','image/jpg'];
const onboardingSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  pan: z.string().regex(/^[A-Z0-9]{10}$/),
  panName: z.string().min(1),
  aadhaarNumber: z.string().regex(/^\d{12}$/),
  gstNumber: z.string().regex(/^[A-Z0-9]{15}$/i)
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [ new winston.transports.Console() ]
});

// ------------------------------
// 7) Clerk auth middleware
// ------------------------------
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
});
async function requireClerkAuth(req, res, next) {
  try {
    // Build the full URL for Clerk
    const protocol = req.protocol || 'http';
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;
    req.url = fullUrl;

    const authenticationResult = await clerkClient.authenticateRequest(req, {
      jwtKey: processedJwtKey,
      authorizedParties: allowedOrigins
    });

    const { isSignedIn, session, userId } = authenticationResult;

    if (!isSignedIn) {
      throw new Error('Not signed in');
    }
    req.clerkUser = {
      userId: authenticationResult.userId,
      session: authenticationResult.session
    };
    next();
  } catch (err) {
    // Log the full error object for detailed debugging
    console.error('Clerk authentication error:', err);
    res.status(401).json({ error: 'Authentication failed. Please log in again and try.' });
  }
}
// ------------------------------
// 8) Onboarding API Route
// ------------------------------
app.post('/api/onboarding', requireClerkAuth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      let msg = 'Something went wrong. Please try again.';
      if (err.code === 'LIMIT_FILE_SIZE') {
        msg = 'One of your files is too large. Please upload files smaller than 25MB.';
      }
      return res.status(400).json({ error: msg });
    }

    // Validate input fields
    try {
      onboardingSchema.parse(req.body);
    } catch (e) {
      return res.status(400).json({
        error: 'Invalid details.',
        details: e.errors
      });
    }

    // Validate file presence
    const files = req.files;
    if (!files.aadhaarPhoto || !files.gstCert || !files.electricityBill) {
      return res.status(400).json({
        error: 'All documents (Aadhaar, GST, Electricity Bill) are required.'
      });
    }

    // Validate MIME types
    for (const key of ['aadhaarPhoto','gstCert','electricityBill']) {
      const file = files[key][0];
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return res.status(400).json({
          error: `Unsupported file type for ${key}. Use PDF, JPG, or PNG.`
        });
      }
    }

    logger.info('Form fields:', req.body);
    logger.info('Files:', Object.keys(files));

    const { name, phone, email, pan, panName, aadhaarNumber, gstNumber } = req.body;

    try {
      // Upload each file to Google Drive
      const aadhaarUrl = await uploadToDrive(files.aadhaarPhoto[0], process.env.GOOGLE_DRIVE_FOLDER_ID);
      const gstUrl     = await uploadToDrive(files.gstCert[0],      process.env.GOOGLE_DRIVE_FOLDER_ID);
      const billUrl    = await uploadToDrive(files.electricityBill[0], process.env.GOOGLE_DRIVE_FOLDER_ID);

      // Send notification email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
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
      });

      logger.info('Email sent successfully');
      res.json({ success: true });
    } catch (error) {
      console.error('Server error during onboarding:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  });
});

// ------------------------------
// 9) Rate-limit error handler
// ------------------------------
app.use((err, req, res, next) => {
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a bit and try again.'
    });
  }
  next(err);
});

// ------------------------------
// 10) Static files & SPA fallback
// ------------------------------
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get(/^(?!\/api\/).*/, (req, res) =>
  res.sendFile(path.join(distDir, 'index.html'))
);

// ------------------------------
// 11) Start the server
// ------------------------------
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
