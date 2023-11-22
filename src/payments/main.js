const transferMoney = require('./transaction');

const payment = (req, res) => {
    try {
        transferMoney(req, res);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports = payment;