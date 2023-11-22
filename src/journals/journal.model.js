const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: String,
    fullname: String,
    type: String,
    accountNumber: String,
    operation: {
        type: String,
        enum: ['Debit', 'Credit']
    },
    amount: Number
}, {versionKey: false, timestamps: true});

const journalModel = mongoose.model('journal', journalSchema);

module.exports = journalModel;