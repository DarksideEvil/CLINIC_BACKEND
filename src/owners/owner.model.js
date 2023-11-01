const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 2,
        maxlength: 35,
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
    role: {
        type: String,
        minlength: 2,
        maxlength: 10,
        trim: true,
        lowercase: true,
        required: true,
        enum: ['admin', 'boss']
    },
}, {timestamps: true, versionKey: false});

const ownerModel = mongoose.model('owner', ownerSchema);

module.exports = ownerModel;