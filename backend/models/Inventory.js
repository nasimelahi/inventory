const mongoose = require('../utils/db');

const Schema = mongoose.Schema

const product = new Schema ({
    name : {
        type : String,
        required : true
    },

    barcode : {
        type : String,
    },

    brand : {
        type : String
    },

    supplier : {
        type : String
    },

    buyprice : {
        type : Number
    },

    category : {
        type : String
    },

    discount : {
        type : Number
    },

    reorderlavel : {
        type : Number
    },
    sellprice : {
        type : Number
    },
    size : {
        type : String
    },
    unitinstock : {
        type : Number
    }
    
},{timestamps : true})
const Product = mongoose.model('product' , product, 'product')
module.exports = Product
