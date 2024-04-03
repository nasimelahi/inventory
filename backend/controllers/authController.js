const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const BACKEND_URL = process.env.BACKEND_URL
const LOGIN_SEC = process.env.LOGIN_SEC
const DOMAIN = process.env.DOMAIN
const PASS_REST_SEC = process.env.PASS_REST_SEC
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_SECURE = process.env.EMAIL_SECURE
const EMAIL_PORT = process.env.EMAIL_PORT
const { generateMailOptions} = require('../utils/email')

// Send email for verification
const transporter = nodemailer.createTransport({
    host: `${EMAIL_HOST}`,
    port: `${EMAIL_PORT}`,
    secure: `${EMAIL_SECURE}`,
    auth: {
      user: `${EMAIL_USER}`,
      pass: `${EMAIL_PASS}`,
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

    // Check if Administrator already exists
    let admin = await User.findOne({ role: 'admin' });

    switch (role) {
      case 'supervisor':
      case 'staff':
        let manager = await User.findOne({ role: 'manager' });
        if (!manager) {
          // If manager doesn't exist, send email to admin
          emailSendTo = admin.email;
        } else {
          // If manager exists, send email to manager
          emailSendTo = manager.email;
        }
        approvalEmailSubject = `${role} Registration Approval`;
        break;
      case 'manager':
        // Send email to admin for manager registration
        emailSendTo = admin.email;
        approvalEmailSubject = `${role} Registration Approval`;
        break;
      default:
        break;
    }
   
    // Generate approve and disapprove links
    const approveLink = `${BACKEND_URL}/api/auth/approve-registration/${user._id}/true`;
   


   // Send email for approval
   const mailOptions = generateMailOptions(
    `${EMAIL_USER}`,
    `${emailSendTo}`, 
    approvalEmailSubject,
    `
    <p>A new user with email : ${email} has been registered.</p>
      <p>Do you want to approve this user?</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#000000" style="border-radius: 3px color=#fff" ;>
                <a href="${approveLink}" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 15px 25px; display: inline-block;">Approve</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      ` 
  );
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log(`Email sent: ${name}`);
        res.status(201).json({ message: `Hi ${name}, your registration is pending for approval` });
      }
    });
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
      if (!isPasswordValid || !user.isApproved) {
        return res.status(400).json({ message: 'Invalid credentials or your account is not approved' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, `${LOGIN_SEC}`, { expiresIn: '1h' });
      res.json({ token: `Bearer ${token}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Approve user registration
  exports.approveRegistration = async (req, res) => {
    try {
      const { id , option } = req.params;
  
      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (option){
        user.isApproved = true;
        await user.save();
      }
  
      const mailOptions = generateMailOptions(
        `${EMAIL_USER}`, // Sender email (replace with actual sender email)
        `${user.email}`, // Recipient email based on user's role
        `Your registaion has been ${user.isApproved ? 'approved' : 'rejected'}`, // Subject based on user's role
        `
          <p>Your registaion has been ${user.isApproved ? 'approved.  Use your email to login .' : 'rejected'}.</p>
          <p>Thanks</p>
        ` // HTML body with approval buttons
      );
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log(`Email sent: ${user.name}`);
            res.json({ message: 'User registration approved' });
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

  // Forgot password - send reset link
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const resetToken = jwt.sign({ userId: user._id }, `${PASS_REST_SEC}`, { expiresIn: '1h' });

    // Send password reset link via email
    const resetLink = `${DOMAIN}/reset-password?token=${resetToken}`;

    const mailOptions =  generateMailOptions(
      `${EMAIL_USER}`,
      `${user.email}`,
      'Password Reset',
      `You are receiving this email because you (or someone else) has requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
    );

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'Password reset link sent to your email' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decodedToken = jwt.verify(token, `${PASS_REST_SEC}`);

    // Check if user exists
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateWorkingHours = async (req, res) => {
  try {
    const { day, month, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the day already exists in the working hours array
    const existingWorkingHour = user.workingHours.find(
      (wh) => wh.day === day && wh.month === month
    );

    if (existingWorkingHour) {
      // Update existing working hours
      existingWorkingHour.startTime = startTime;
      existingWorkingHour.endTime = endTime;
    } else {
      // Add new working hours
      user.workingHours.push({ day, month, startTime, endTime });
    }

    // Save the updated user
    await user.save();

    res.json({ message: 'Working hours updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  