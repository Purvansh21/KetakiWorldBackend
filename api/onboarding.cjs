const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { verifyToken } = require('@clerk/backend');
// require('dotenv').config(); // Vercel handles environment variables internally

const app = express();

// Use CORS middleware
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-production-domain.com', // <-- Replace for production
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
app.use(express.json()); // For parsing application/json

// Configure Multer for file uploads (memory storage for Vercel functions)
const upload = multer({ storage: multer.memoryStorage() });

// Google Drive API setup (make sure these ENV vars are set on Vercel)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail email address
        pass: process.env.EMAIL_PASS, // Your App Password for Gmail
    },
});

// Add rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// File type whitelist
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

// Zod schema for input validation
const onboardingSchema = z.object({
  fullName: z.string().min(1),
  phoneNumber: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  panNumber: z.string().regex(/^[A-Z0-9]{10}$/),
  nameOnPan: z.string().min(1),
  aadhaarNumber: z.string().regex(/^\d{12}$/),
  gstNumber: z.string().regex(/^[A-Z0-9]{15}$/i)
});

// Clerk JWT authentication middleware
async function requireClerkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  try {
    const token = authHeader.replace('Bearer ', '');
    req.clerkUser = await verifyToken(token, {});
    next();
  } catch (err) {
    // Print everything possible about the error
    console.error('Clerk verification error:', err);
    if (err && typeof err === 'object') {
      for (const key of Object.getOwnPropertyNames(err)) {
        console.error(`  ${key}:`, err[key]);
      }
    }
    res.status(401).json({
      error: 'Authentication failed. Please log in again and try.',
      details: err && err.message,
      stack: err && err.stack,
      code: err && err.code,
      reason: err && err.reason,
      action: err && err.action,
    });
  }
}

// Onboarding API Route
app.post('/api/onboarding', requireClerkAuth, upload.fields([
    { name: 'panCardPhoto', maxCount: 1 },
    { name: 'aadhaarPhoto', maxCount: 1 },
    { name: 'gstCertificate', maxCount: 1 },
    { name: 'electricityBill', maxCount: 1 }
]), async (req, res) => {
    // Validate fields
    try {
      onboardingSchema.parse(req.body);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid input', details: e.errors });
    }
    // Validate files
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'Missing required file uploads.' });
    }
    for (const key of ['panCardPhoto', 'aadhaarPhoto', 'gstCertificate', 'electricityBill']) {
      const file = req.files[key]?.[0];
      if (!file || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return res.status(400).json({ error: `Invalid or missing file type for ${key}` });
      }
    }

    console.log('Received onboarding request');
    // console.log('Body:', req.body);
    // console.log('Files:', req.files);

    const {
        fullName,
        phoneNumber,
        email,
        panNumber,
        nameOnPan,
        aadhaarNumber,
        gstNumber
    } = req.body;

    // Basic server-side validation (add more robust validation here)
    if (!fullName || !phoneNumber || !email || !panNumber || !nameOnPan || !aadhaarNumber || !gstNumber) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const fileLinks = [];

    try {
        for (const fieldName in req.files) {
            const files = req.files[fieldName];
            if (files && files.length > 0) {
                for (const file of files) {
                    // Check file size (25MB limit)
                    if (file.size > 25 * 1024 * 1024) {
                        return res.status(400).json({ message: `File ${file.originalname} exceeds 25MB limit.` });
                    }

                    const response = await drive.files.create({
                        requestBody: {
                            name: `${fullName}_${fieldName}_${Date.now()}_${file.originalname}`,
                            mimeType: file.mimetype,
                            parents: [DRIVE_FOLDER_ID], // Ensure this folder ID exists and is shared correctly
                        },
                        media: {
                            mimeType: file.mimetype,
                            body: file.buffer,
                        },
                    });

                    const fileId = response.data.id;
                    // Set file permissions to 'reader' for anyone with the link (for demonstration, NOT for sensitive data in production)
                    await drive.permissions.create({
                        fileId: fileId,
                        requestBody: {
                            role: 'reader',
                            type: 'anyone',
                        },
                    });

                    const webViewLink = (await drive.files.get({
                        fileId: fileId,
                        fields: 'webViewLink',
                    })).data.webViewLink;

                    fileLinks.push({ fieldName, originalname: file.originalname, webViewLink });
                }
            }
        }

        // Construct email content
        let emailContent = `New Partner Onboarding Submission:\n\n`;
        emailContent += `Full Name: ${fullName}\n`;
        emailContent += `Phone Number: ${phoneNumber}\n`;
        emailContent += `Email: ${email}\n`;
        emailContent += `PAN Number: ${panNumber}\n`;
        emailContent += `Name on PAN: ${nameOnPan}\n`;
        emailContent += `Aadhaar Number: ${aadhaarNumber}\n`;
        emailContent += `GST Number: ${gstNumber}\n\n`;
        emailContent += `Uploaded Documents:\n`;
        fileLinks.forEach(link => {
            emailContent += `- ${link.fieldName} (${link.originalname}): ${link.webViewLink}\n`;
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL, // Add a recipient email in your .env
            subject: 'New Partner Onboarding Submission',
            text: emailContent,
        });

        // Important: Store onboarding status and document links in your database here!
        // This is where Neon would come in:
        // await neonDb.collection('onboardingSubmissions').insertOne({
        //    clerkUserId: req.headers['x-clerk-user-id'], // If you integrate Clerk with your backend
        //    fullName, phoneNumber, email, panNumber, ...
        //    fileLinks,
        //    status: 'pending_review',
        //    submittedAt: new Date(),
        // });

        res.status(200).json({ message: 'Onboarding data and documents submitted successfully!' });

    } catch (error) {
        console.error('Error during onboarding process:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Export the app for Vercel
module.exports = app; 