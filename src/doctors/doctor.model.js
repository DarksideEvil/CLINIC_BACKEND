const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 2,
        maxlength: 35,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        min: 9,
        maxlength: 12,
        trim: true,
        unique: true,
        required: true
    },
    address: {
        type: String,
        minlength: 3,
        maxlength: 150,
        required: true
    },
    age: {
        type: Number,
        trim: true,
        required: true
    },
    email: {
        type: String,
        minlength: 4,
        maxlength: 30,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1024,
        trim: true,
        required: true
    },
    point: {
        type: Number,
        trim: true
    },
    role: {
        type: String,
        minlength: 2,
        maxlength: 10,
        trim: true,
        lowercase: true,
        default: 'doctor',
        enum: ['doctor']
    },
}, {timestamps: true, versionKey: false});

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel;