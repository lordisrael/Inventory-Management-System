const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    // quantity: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    alert: {
        type: Boolean,
        default: false
    }, 
    alertNum: {
        type: Number,
        default: 0
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
});

//Export the model
module.exports = mongoose.model('Inventory', inventorySchema);