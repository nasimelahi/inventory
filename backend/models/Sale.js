const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    Items: [
      {
        name: String,
        qyt: Number,
        price: Number,
      },
    ],

    discount: {
      type: String,
    },

    subtotal: {
      type: Number,
    },

    total: {
      type: Number,
    },

    CasherName: {
      type: String,
    },

    paymentMethod : {
      type : String
    },
    isCancel : {
      type : Boolean,
      default : false
    },
    isRefunded : {
      type: Boolean,
      default : false
    }, 
    note : {
      type : String
    }
  },
  { timestamps: true }
);
const Order = mongoose.model("order", order);
module.exports = Order;