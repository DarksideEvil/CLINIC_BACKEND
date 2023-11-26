const {logError} = require('../settings/logs/log');
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const ObjectId = require('mongoose');

//for post request, validates req.body
const schema = {
    type: "object",
    properties: {
        fullname: {type: "string", minLength: 2, maxLength: 35},
        phone: {type: "integer"},
        address: {type: "string", minLength: 3, maxLength: 150},
        age: {type: "integer"},
        email: {type: "string", minLength: 4, maxLength: 30},
        password: {type: "string", minLength: 4, maxLength: 50},
        role: {type: "string", minLength: 2, maxLength: 10},
    },
    required: ["fullname", "phone", "address", "age", "email", "password"],
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
        fullname: {type: "string", minLength: 2, maxLength: 35},
        phone: {type: "integer", minimum: 9},
        address: {type: "string", minLength: 3, maxLength: 150},
        age: {type: "integer"},
        email: {type: "string", minLength: 4, maxLength: 30},
        password: {type: "string", minLength: 4, maxLength: 50},
        role: {type: "string", minLength: 2, maxLength: 10},
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