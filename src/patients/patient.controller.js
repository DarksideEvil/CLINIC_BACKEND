const patientModel = require('./patient.model');
const {logError} = require('../settings/logs/log');
const argon2 = require('argon2');
const salt = process.env.ARGONSALT;
const sign = require('jsonwebtoken').sign;

const addPatient = async (req, res) => {
    const body = req.body;
    const hashedPswd = await argon2.hash(body.password, salt);
    try {
        const existPatient = await patientModel.findOne({email: body.email});
        if (existPatient) {
            const validPswd = await argon2.verify(existPatient.password, body.password);
            if (validPswd) return res.status(400).send({message: 'This patient\'s already exists !'});
        } else {
            const patient = new patientModel({
                fullname: body.fullname, 
                phone: body.phone, 
                address: body.address,
                age: body.age, 
                email: body.email,
                password: hashedPswd,
                point: 1,
                balance: body.balance,
            });
            await patient.save();
            if (patient) {
                const payload = {
                    _id: patient._id,
                    fullname: patient.fullname,
                    email: patient.email,
                    address: patient.address,
                    phone: patient.phone,
                    age: patient.age,
                    spent: patient.spent,
                    role: patient.role,
                    balance: patient.balance
                }
                const token = await sign(payload, process.env.JWT_SECRET_KEY,
                    {expiresIn: process.env.PATIENT_TOKEN_EXPIRESIN});

                return res.status(201).json({token: token});
            }
        }
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const getPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({}).select('-password');

        return res.status(200).json(patients);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const getPatient = async (req, res) => {
    try {
        const patient = await patientModel.findById(req.params.id).select('-password');

        return res.status(200).json(patient);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const editPatient = async (req, res) => {
    try {
        const updatedPatient = await patientModel.findByIdAndUpdate(req.params.id, req.body)
        .select('-password');

        return res.status(200).json(updatedPatient);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const deletePatient = async (req, res) => {
    try {
        const deletedpatient = await patientModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(deletedpatient);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

module.exports = {
    addPatient,
    getPatients,
    getPatient,
    editPatient,
    deletePatient
}