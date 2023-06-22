const mongoose = require('mongoose') 


const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, 

);


module.exports = mongoose.model('Category', categorySchema);