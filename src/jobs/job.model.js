const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
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
        type: objectId,
        ref: 'doctor',
        default: null,
        unique: true
    },
    price: {type: Number, required: true}
}, {timestamps: true, versionKey: false});

const jobModel = mongoose.model('job', jobSchema);

module.exports = jobModel;