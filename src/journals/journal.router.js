const router = require('express').Router();
const { getJournals } = require('./journal');
const { bossAdminCheck } = require('.././utils/permission');

router.route('/').get(bossAdminCheck, getJournals);

module.exports = router;