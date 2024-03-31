const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const BACKEND_URL = process.env.BACKEND_URL

// Send email for verification
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "nasim.1990@hotmail.com",
      pass: "Delln4011",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  },
});

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name , email, password, role, workingHours } = req.body;
   
     //Check if user already exists
     let user = await User.findOne({ email });
     if (user) {
       return res.status(400).json({ message: 'User already exists' });
     }

     // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);

     // Create new user
     user = new User({
         name,
         email,
         password: hashedPassword,
         role,
         workingHours,
    });

     await user.save();

    // Send email for approval
    let approvalEmailSubject;

    // if (role === 'supervisor') {
    //   approvalEmailSubject = 'supervisor Registration Approval';
    //   emailSendTo = 'froseon@gmail.com'
    // } else {
    //   approvalEmailSubject = 'Staff Registration Approval';
    //   emailSendTo = 'nasimmd6@gmail.com'
    // }
    switch (role) {
      case 'supervisor':
      case 'staff':
        approvalEmailSubject = `${role} Registration Approval`;
        emailSendTo = 'froseon@gmail.com';
        break;
      case 'manager':
        approvalEmailSubject = `${role} Registration Approval`;
        emailSendTo = 'nasimmd6@gmail.com';
        break;
      default:
        // Handle any other cases or provide a default behavior
        break;
    }
    

    const mailOptions = {
      from: 'nasim.1990@hotmail.com',
      to: `${emailSendTo}`,
      subject: approvalEmailSubject,
      html: `
        <p>${name} with email ${email} has registered.</p>
        <p>Do you want to approve this user?</p>
        <button onclick="window.location.href='${BACKEND_URL}/approve-registration/${user._id}?approve=true'">Approve</button>
        <button onclick="window.location.href='${BACKEND_URL}/approve-registration/${user._id}?approve=false'">Disapprove</button>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log(`Email sent: ${name}`);
      }
    });
    res.status(201).json({ message: `Hi ${name},your registration pending for approval` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Approve user registration
  exports.approveRegistration = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user's approval status
      user.isApproved = true;
      await user.save();
  
    
  
      const mailOptions = {
        from: 'froseon@gmail.com',
        to: user.email,
        subject: 'Registration Approval',
        html: `
          <p>Your registration has been approved. You can now log in to the application.</p>
        `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.json({ message: 'User registration approved' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Refresh token
  exports.refreshToken = async (req, res) => {
    try {
      const { token } = req.body;
  
      // Verify token
      const decodedToken = jwt.verify(token, 'your-secret-key');
  
      // Generate new token
      const newToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role }, 'your-secret-key', { expiresIn: '1h' });
  
      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };

  