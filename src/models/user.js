const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    subscriptions:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subscription',
        default: null
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }    
},{
    timestamps: true
})

const User=mongoose.model('User', UserSchema);

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = User;
