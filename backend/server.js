const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const { connectDB, Appointment } = require('./database');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-blue-springs-key-for-demo';

// --- Razorpay Setup ---
// These are test keys. In production, use environment variables.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id_123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key_456789',
});

// --- Nodemailer Setup ---
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return;
  }

  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
  console.log('Ethereal Email Setup ready! Check terminal for test email links when appointments are booked.');
});

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Blue Springs Dental Backend is running' });
});

// Create a new appointment
app.post('/api/appointments', async (req, res) => {
  const { fullName, phone, email, date, time, service, message } = req.body;

  // Basic validation
  if (!fullName || !phone || !date || !time || !service) {
    return res.status(400).json({ error: 'Please provide all required fields (*)' });
  }

  try {
    const newAppointment = await Appointment.create({
      fullName, phone, email, date, time, service, message
    });

    // --- Send Email Notification ---
    if (transporter && email) {
      const mailOptions = {
        from: '"Blue Springs Dental" <appointments@bluespringsdental.in>',
        to: email, // Patient email
        subject: 'Appointment Request Received - Blue Springs Dental',
        text: `Hello ${fullName},\n\nYour appointment request for ${service} on ${date} at ${time} has been received.\n\nOur team will confirm your slot shortly.\n\nRegards,\nBlue Springs Dental Clinic`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2 style="color: #1A73E8;">Appointment Request Received</h2>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p>Your appointment request for <strong>${service}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been received.</p>
            <p>Our team will review your request and confirm your slot shortly.</p>
            <hr style="border: none; border-top: 1px solid #EAF4FB; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              Blue Springs Dental Clinic<br/>
              NH 47 Pongumoodu, Thiruvananthapuram<br/>
              Phone: 070127 70366
            </p>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Notification email sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Appointment successfully booked!',
      appointmentId: newAppointment._id
    });
  } catch (error) {
    console.error('Error creating appointment in DB:', error.message);
    res.status(500).json({ error: 'Failed to book appointment. Please try again later.' });
  }
});

// --- Admin Authentication ---

// Admin Login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials for demonstration
  if (username === 'admin' && password === 'clinic2024') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
});

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
  }
};

// --- Payment API ---

// Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in INR

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: 'Failed to create order' });
    }

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Error processing payment request' });
  }
});

// Verify Payment Signature
app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Create expected signature using the secret key
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', razorpay.key_secret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // In a real app, you would save the payment ID to the database here
    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, error: 'Invalid payment signature' });
  }
});

// Fetch all appointments (Protected Admin/Dashboard use case)
app.get('/api/appointments', authenticateAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ error: 'Failed to retrieve appointments.' });
  }
});

// Export the app for Vercel serverless function
module.exports = app;

// Start the server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
