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
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'

    },
    // department: {
    //     type: string,
    //     required: true,
    //     enum: ['Appliances', 'Building Materials', 'Electrical', 'Flooring and Rugs', 'Kitchen and bath', 'Lightening', 'Plumbing', 'Windows and Doors,', 'Tools']
    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    weight: {
        type: Number,
    },
    image: [],
});

    // productSchema.pre('save', async function(next){
    //     const department = this.department
    //     switch(department) {
    //         case 'Appliances':
    //             this.schema.path('category').enum(['Refrigerators', 'Microwaves', 'Air Conditioners and fans', 'Ranges, cooktops, and Ovens'])
    //             break;
    //         case 'Building Materials':
    //             this.schema.path('category').enum(['Lumber', 'Bricks and Blocks', 'Plywood', 'Cements'])
    //             break;
    //         case 'Electrical':
    //             this.schema.path('category').enum(['Wire and Cable', 'Light switchers and Dimmers', 'Bulbs', 'Detectors'])
    //             break;
    //         case 'Flooring and rugs':
    //             this.schema.path('category').enum(['Floor, Wall Tile', 'Vinyl', 'Carpet & Carpet Tiles', 'Area Rugs'])
    //             break;
    //         case 'Kitchen and Bath':
    //             this.schema.path('category').enum(['Cabinets', 'Sinks', 'Faucets', 'Showers'])
    //             break;
    //         case 'Lightening':
    //             this.schema.path('category').enum(['Chandeliers', 'Lamp', 'Outdoor Lights', 'Under cabinet Lightening'])
    //             break;
    //         case 'Plumbing':
    //             this.schema.path('category').enum(['Toilet seat', 'Water Heaters', 'Shower base or pan', 'Tub'])
    //             break;
    //         case 'Windows and Doors':
    //             this.schema.path('category').enum(['Double, single Hung Windows', 'Bay windows', 'Patio Doors', 'Garage Doors'])
    //             break;
    //         case 'Tools':
    //             this.schema.path('category').enum(['Power tools', 'Hand tools', 'Air Compressors', 'Safety Equipment'])
    //             break;

    //     }
    // })

//Export the model
module.exports = mongoose.model('Product', productSchema);