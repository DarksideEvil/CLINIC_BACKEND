const router = require('express').Router();
const {patientLogin, adminLogin, doctorLogin, bossLogin} = require('./register');

router.route('/patient').post(patientLogin);

router.route('/doctor').post(doctorLogin);

router.route('/admin').post(adminLogin);

router.route('/boss').post(bossLogin);

module.exports = router;