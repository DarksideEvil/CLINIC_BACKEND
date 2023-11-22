const doctorModel = require('./doctor.model');
const {logError} = require('../settings/logs/log');
const argon2 = require('argon2');
const salt = process.env.ARGONSALT;
const sign = require('jsonwebtoken').sign;

const addDoctor = async (req, res) => {
    const {fullname, phone, address, age, email, password} = req.body;
    const hashedPswd = await argon2.hash(password, salt);
    try {
        const existDoctor = await doctorModel.findOne({email: req.body.email});
        if (existDoctor) return res.status(400)
        .send({message: 'This doctor\'s already exists in database !'});

        const doctor = new doctorModel({
            fullname, phone, address, age, email, password: hashedPswd
        });
        await doctor.save();
        if (doctor) {
            const payload = {
                _id: doctor._id,
                fullname: doctor.fullname,
                phone: doctor.phone,
                email: doctor.email,
                password: doctor.password,
                role: doctor.role
            }
            const token = await sign(payload, process.env.JWT_SECRET_KEY,
                {expiresIn: process.env.TOKEN_EXPIRESIN});
            if (token) { return res.status(201).json({token: token}); }
        }
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const getDoctors = async (req, res) => {
    try {
        const allDoctors = await doctorModel.find().select('-password');

        return res.status(200).json(allDoctors);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: err?.message});
    }
}

const getDoctor = async (req, res) => {
    try {
        await client.connect();
        const doctor = await doctorModel.findById(req.params.id).select('-password');

        return res.status(200).json(doctor);
    } catch (err) {
        return res.status(500).send({message: err?.message});
    }
}

const editDoctor = async (req, res) => {
    try {
        const updatedDoctor = await doctorModel.findByIdAndUpdate(req.params.id, req.body)
        .select('-password');
        return res.status(200).json(updatedDoctor);
    } catch (err) {
        return res.status(500).send({message: err?.message});
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(deletedDoctor);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: err?.message});
    }
}

module.exports = {
    addDoctor,
    getDoctors,
    getDoctor,
    editDoctor,
    deleteDoctor
}