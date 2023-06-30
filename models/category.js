const mongoose = require('mongoose') 


const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
        index: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
}, 
{ 
    timestamps: true
}
);


module.exports = mongoose.model('Category', categorySchema);