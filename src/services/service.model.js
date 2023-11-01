const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        minlength: 2,
        maxlength: 500,
        trim: true,
        required: true
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'doctor',
        default: null,
        unique: true
    },
    price: {type: Number, required: true}
}, {timestamps: true, versionKey: false});

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceModel;