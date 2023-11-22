const express = require('express');
const router = express.Router();

const {
    addService,
    getServices,
    getService,
    editService,
    deleteService
} = require('./service.controller');

const {
    validating,
    paramsValidate,
    validatingg
} = require('./service.validation');

const {adminCheck} = require('../utils/permission');

router.route('/').get(getServices);

router.route('/').post(adminCheck, validating, addService);

router.route('/:id').get(paramsValidate, getService);

router.route('/:id').put(adminCheck, paramsValidate, validatingg, editService);

router.route('/:id').delete(adminCheck, paramsValidate, deleteService);

module.exports = router;