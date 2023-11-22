const serviceModel = require('./service.model');
const {logError} = require('../settings/logs/log');

const addService = async (req, res) => {
    try {
        const existService = await serviceModel.findOne({title: req.body.title});
        if (existService) return res.status(400).send({message: 'This service\'s already exists in database !'});

        const service = await serviceModel.create(req.body);

        return res.status(201).send(service);
    } catch (err) {
        logError(err);
        return res.status(400).send({message: err?.message});
    }
}

const getServices = async (req, res) => {
    try {
        const services = await serviceModel.find({})
        .populate('doctor', 'fullname -_id');

        return res.status(200).json(services);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const getService = async (req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id)
        .populate('doctor', 'fullname');

        return res.status(200).json(service);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const editService = async (req, res) => {
    try {
        const updatedService = await serviceModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .populate('doctor', 'fullname -_id');

        return res.status(200).json(updatedService);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const deleteService = async (req, res) => {
    try {
        const deletedService = await serviceModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(deletedService);
    } catch (err) {
        logError(err); 
        return res.status(500).send({message: err?.message});
    }
}

module.exports = {
    addService,
    getServices,
    getService,
    editService,
    deleteService
}