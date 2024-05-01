const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { checkRole } = require('../utils/authorize')


// Define allowed roles for each endpoint
const managerAndAbove = ['manager', 'administrator', 'supervisor'];
const allRoles = ['manager', 'administrator', 'supervisor', 'staff'];

// Get all items
router.get('/', inventoryController.getAllItems);

// Get item by ID
router.get('/:id', inventoryController.getItemById);

// Create item (allowed for manager and above)
router.post('/', checkRole(managerAndAbove), inventoryController.createItem);

// Update item (allowed for manager and above)
router.put('/:id', checkRole(managerAndAbove), inventoryController.updateItem);

// Delete item (allowed for manager and above)
router.delete('/:id', checkRole(managerAndAbove), inventoryController.deleteItem);

module.exports = router;
