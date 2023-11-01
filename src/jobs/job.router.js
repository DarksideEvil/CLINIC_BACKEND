const express = require('express');
const router = express.Router();

const {
    addJob,
    getJobs,
    getJob,
    editJob,
    deleteJob
} = require('./job.controller');

const {
    validating,
    paramsValidate,
    validatingg
} = require('./job.validation');

router.route('/').post(validating, addJob);

router.route('/').get(getJobs);

router.route('/:id').get(paramsValidate, getJob);

router.route('/:id').put(paramsValidate, validatingg, editJob);

router.route('/:id').delete(paramsValidate, deleteJob);

module.exports = router;