const router = require('express').Router();
const serviceRouter = require('./services/service.router');
const patientRouter = require('./patients/patient.router');
const jobRouter = require('./jobs/job.router');
const doctorRouter = require('./doctors/doctor.router');
const ownerRouter = require('./owners/owner.router');
const loginRouter = require('./registration/register.router');
const paymentRouter = require('./payments/main.router');
const journalRouter = require('./journals/journal.router');
const reportRouter = require('./reports/report.router');

router.use('/services', serviceRouter);
router.use('/patients', patientRouter);
router.use('/jobs', jobRouter);
router.use('/doctors', doctorRouter);
router.use('/owners', ownerRouter);
router.use('/login', loginRouter);
router.use('/payments', paymentRouter);
router.use('/journals', journalRouter);
router.use('/reports', reportRouter);

module.exports = router;