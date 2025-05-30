const mongoose=require('mongoose');

const PlanSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
    
},{
    timestamps: true
})


const Plan=mongoose.model('Plan',PlanSchema);
module.exports=Plan;