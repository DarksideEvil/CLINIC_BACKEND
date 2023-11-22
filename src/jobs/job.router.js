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

const {adminCheck} = require('.././utils/permission');

router.route('/').get(getJobs);

router.route('/').post(validating, addJob);

router.route('/:id').get(paramsValidate, getJob);

router.route('/:id').put(adminCheck, paramsValidate, validatingg, editJob);

router.route('/:id').delete(adminCheck, paramsValidate, deleteJob);

module.exports = router;