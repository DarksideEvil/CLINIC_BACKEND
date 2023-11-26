const mongoose = require('mongoose');
const { logError } = require('../../settings/logs/log');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('MongoDB\'s online...');
    } catch (err) {
        logError(err);
        console.log(err);
    }
}