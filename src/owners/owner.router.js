const express = require('express');
const router = express.Router();

const {
    addOwner,
    getOwners,
    getOwner,
    editOwner,
    deleteOwner
} = require('./owner.controller');

const {
    validating,
    paramsValidate,
    validatingg
} = require('./owner.validation');

router.route('/').post(validating, addOwner);

router.route('/').get(getOwners);

router.route('/:id').get(paramsValidate, getOwner);

router.route('/:id').put(paramsValidate, validatingg, editOwner);

router.route('/:id').delete(paramsValidate, deleteOwner);

module.exports = router;