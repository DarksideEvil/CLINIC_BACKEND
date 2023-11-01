const mongoose = require('mongoose');

module.exports = async () => {
    const connected = await mongoose.connect(process.env.MONGO_CONNECT)
        connected ? console.log('MongoDB\'s online...') : console.log('MongoDB\'s offline !');
}