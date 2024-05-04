const Product = require('../models/Inventory');
//const Inventory = Product

exports.getAllItems = async(req , res) => {
  await Product.find().limit(20)
  .then( data => {
       return res.status(200).json({msg : 'Product list successfuly fetched' , data : data})
  })
  .catch( err => {
      return res.status(400).json({msg : 'Something worng. couldn\'t fetch product list' , data : err})
  })
};


// exports.getItemById = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createItem = async (req, res) => {
//   const { name, description, quantityInML } = req.body;

//   const item = new Inventory({
//     name,
//     description,
//     quantity: quantityInML, // Store quantity in milliliters (ml)
//   });

//   try {
//     const newItem = await item.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);
    
//     // Check if user is allowed to update item
//     if (req.user.role !== 'staff') {
//       if (req.body.name) {
//         item.name = req.body.name;
//       }
//       if (req.body.description) {
//         item.description = req.body.description;
//       }
//       if (req.body.quantityInML) {
//         item.quantity = req.body.quantityInML; // Update quantity in milliliters (ml)
//       }
//     } else {
//       res.status(403).json({ message: 'Access denied' });
//       return;
//     }

//     const updatedItem = await item.save();
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteItem = async (req, res) => {
//   try {
//     // Check if user is allowed to delete item
//     if (req.user.role === 'administrator' || req.user.role === 'manager' || req.user.role === 'supervisor') {
//       await Inventory.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Item deleted' });
//     } else {
//       res.status(403).json({ message: 'Access denied' });
//       return;
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
