const mongoose = require('mongoose');
const validator = require('validator');
const {Schema}  = mongoose ;
const clientDataSchema = new mongoose.Schema({
    ownHome : {
        type:Boolean,
        required: true
    },
    electricBill: {
        type: String,
        required: true
    }, 
    homeType: {
        type:String,
        required: true
    }, 
    roofShade: {
        type:String,
        required: true
    }, 
    zipcode: {
        type:Number,
        required: true
    }, 
    address: {
        type:String,
        required: true
    }, 
    firstName: {
        type:String,
        required: true
    }, 
    lastName: {
        type:String,
        required: true
    }, 
    email: {
        type:String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Plase provide a valid email'],
        trim: true,
        lowercase: true,
    }, 
    phoneNumber: {
        type:String,
        required: true
    }, 
    excitedType: {
        type:String,
        required: true
    }
},
{timestamps: true});

module.exports = mongoose.model('clients', clientDataSchema);


