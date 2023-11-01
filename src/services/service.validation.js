const {logError} = require('../settings/logs/log');
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const ObjectId = require('mongoose');

//for post request, validates req.body
const schema = {
    type: "object",
    properties: {
        title: {type: "string", minLength: 3, maxLength: 50},
        desc: {type: "string", minLength: 2, maxLength: 500},
        doctor: {type: "string"},
        price: {type: "integer"}
    },
    required: ["title", "desc", "price"],
    additionalProperties: false
}

const validating = (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
        logError(validate.errors);
        return res.status(400).send({message: validate.errors[0].message});
    }
    next();
}

//for get, put requests, validates req.params..
ajv.addFormat('objectid', {
    type: "string",
    validate: (data) => {
        return ObjectId.isValid(data);
    }
});

const paramsSchema = {
    type: "string",
    properties: {
        id: {type: "string", format: "objectid"}
    }
}

const paramsValidate = (req, res, next) => {
    const validate = ajv.compile(paramsSchema);
    const validParams = validate(req.params.id);
    if (!validParams) {
        return res.status(400).send({message: err.message});
    }
    next();
}

//for put request, validates req.body
const editSchema = {
    type: "object",
    properties: {
        title: {type: "string", minLength: 3, maxLength: 50},
        desc: {type: "string", minLength: 2, maxLength: 500},
        doctor: {type: "string"},
        price: {type: "integer"}
    },
    additionalProperties: false
}

const validatingg = (req, res, next) => {
    const validate = ajv.compile(editSchema);
    const valid = validate(req.body);
    if (!valid) {
        logError(validate.errors);
        return res.status(400).send({message: validate.errors[0].message});
    }
    next();
}

module.exports = {
    validating,
    paramsValidate,
    validatingg
}