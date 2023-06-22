const mongoose = require('mongoose') 


const departmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
        index: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, 

);


module.exports = mongoose.model('Department', departmentSchema);