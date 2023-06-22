const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
    }
});

//Export the model
module.exports = mongoose.model('Product', productSchema);