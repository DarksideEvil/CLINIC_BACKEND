const router = require('express').Router();

const {
    byIncome,
    fullMonthInfo
} = require('./report');

const {bossAdminCheck} = require('../utils/permission');

router.route('/byIncome').get(bossAdminCheck, byIncome);

router.route('/byMonth').get(bossAdminCheck, fullMonthInfo);

module.exports = router;