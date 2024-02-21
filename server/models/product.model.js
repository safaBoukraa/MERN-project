const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({  
    category:{
        type: String,
        required:[true,"Category is required !"],
        minlength:[2, '{PATH} length must be at least 2 ⛔⛔⛔']
    },
    description:{
        type: String,
        required:[true,"Description is required !"],
        minlength:[6, '{PATH} length must be at least 6 ⛔⛔⛔']
    },
    image:{
        type: [String],
        required : [true , '{PATH} is required'],
        // minLength : [3, '{PATH} must be at least 3 chars'],
        trim : true,
    },
    price:{
        type:Number,
        min: [5, 'Product Price must be valid']
    },
    favorite:{
        type:Boolean,
        default:false
    },
    quantity:{
        type:Number,
        min: [5, 'Quantity must be valid']
    }
}, {timestamps : true})  

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;