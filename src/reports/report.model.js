const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    income: Number
}, {versionKey: false, timestamps: true});

const reportModel = mongoose.model('report', reportSchema);

module.exports = reportModel;