const router = require('express').Router();
const payment = require('./main');
const authVerify = require('.././utils/verify');

router.use(authVerify);

router.route('/').post(payment);

module.exports = router;