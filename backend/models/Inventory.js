const mongoose = require('../utils/db');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, default: 0 }, // Quantity in milliliters (ml)
});

module.exports = mongoose.model('Inventory', inventorySchema);
