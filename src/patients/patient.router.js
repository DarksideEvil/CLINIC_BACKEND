const express = require('express');
const router = express.Router();
const authVerify = require('../utils/verify');

const {
    addPatient,
    getPatients,
    getPatient,
    editPatient,
    deletePatient
} = require('./patient.controller');

const {
    validating,
    paramsValidate,
    validatingg
} = require('./patient.validation');

router.route('/').post(validating, addPatient);

//get, put, delete are prohibited if user's token no exists !
router.use(authVerify);

router.route('/').get(getPatients);

router.route('/:id').get(paramsValidate, getPatient);

router.route('/:id').put(paramsValidate, validatingg, editPatient);

router.route('/:id').delete(paramsValidate, deletePatient);

module.exports = router;