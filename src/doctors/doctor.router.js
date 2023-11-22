const express = require('express');
const router = express.Router();

const {
    addDoctor,
    getDoctors,
    getDoctor,
    editDoctor,
    deleteDoctor
} = require('./doctor.controller');

const {
    validating,
    paramsValidate,
    validatingg
} = require('./doctor.validation');

const authVerify = require('../utils/verify');

const { adminCheck } = require('../utils/permission');

router.route('/').post(validating, addDoctor);

router.route('/').get(getDoctors);

router.use(authVerify);

router.route('/:id').get(paramsValidate, getDoctor);

router.route('/:id').put(paramsValidate, validatingg, editDoctor);

router.route('/:id').delete(adminCheck, paramsValidate, deleteDoctor);

module.exports = router;