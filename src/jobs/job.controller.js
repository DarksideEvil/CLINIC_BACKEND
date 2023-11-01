const jobModel = require('./job.model');
const {logError} = require('../settings/logs/log');

const addJob = async (req, res) => {
    try {
        const existJob = await jobModel.findOne({title: req.body.title});
        if (existJob) return res.status(400).send('This job\'s already exists in database !');

        const job = await jobModel.create(req.body);
        return res.status(201).send(job);
    } catch (err) {
        logError(err);
        return res.status(400).send({message: err?.message});
    }
}

const getJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({})
        .populate('doctor', '-_id fullname');
        return res.status(200).json(jobs);
    } catch (err) {
        return res.status(400).send(err);
    }
}

const getJob = async (req, res) => {
    try {
        const job = await jobModel.findById(req.params.id)
        .populate('doctor', '-_id fullname');
        if (!job) {
            return res.status(400).send('That job not exists !');
        }
        return res.status(200).json(job);
    } catch (err) {
        return res.status(400).send({message: err?.message});
    }
}

const editJob = async (req, res) => {
    try {
        const updatedJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .populate('doctor', '-_id fullname');;
        if (!updatedJob) {
            return res.status(400).send('Couldn\'t update this job !');
        }
        return res.status(200).json(updatedJob);
    } catch (err) {
        return res.status(400).send({message: err?.message});
    }
}

const deleteJob = async (req, res) => {
    try {
        const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(400).send('Couldn\'t delete this Job !');
        }
        return res.status(200).json(deletedJob);
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: err?.message});
    }
}

module.exports = {
    addJob,
    getJobs,
    getJob,
    editJob,
    deleteJob
}