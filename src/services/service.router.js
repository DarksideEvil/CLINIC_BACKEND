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

router.route('/').post(validating, addService);

router.route('/').get(getServices);

router.route('/:id').get(paramsValidate, getService);

router.route('/:id').put(paramsValidate, validatingg, editService);

router.route('/:id').delete(paramsValidate, deleteService);

module.exports = router;