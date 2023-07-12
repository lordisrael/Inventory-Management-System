const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const transactionSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
});

//Export the model
module.exports = mongoose.model('Transaction', transactionSchema);