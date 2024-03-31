const mongoose = require('mongoose');

const workingHoursSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., "Monday", "Tuesday", etc.
  month: { type: String, required: true }, // e.g., "January", "February", etc.
  startTime: { type: String, required: true }, // e.g., "09:00 AM"
  endTime: { type: String, required: true }, // e.g., "05:00 PM"
});

const userSchema = new mongoose.Schema({
  name :{type : String , required : true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['administrator', 'manager', 'supervisor', 'staff'], required: true },
  isApproved: { type: Boolean, default: false },
  workingHours: [workingHoursSchema], // Array of working hours details
});

module.exports = mongoose.model('User', userSchema);
