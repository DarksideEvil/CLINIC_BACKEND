const patientModel = require('../patients/patient.model');
const doctorModel = require('../doctors/doctor.model');
const ownerModel = require('../owners/owner.model');
const argon2 = require('argon2');
const sign = require('jsonwebtoken').sign;
const {logError} = require('../settings/logs/log');

const auth = async (res, user, body, expiresin) => {
    const validUser = await user.findOne({email: body.email});
        if (!validUser) return res.status(403).send({message: 'you\'ve never signed up !'});
        else {
            const validPswd = await argon2.verify(validUser.password, body.password);
            if (!validPswd) return res.status(400).send({message: 'email/password incorrect !'});
            const payload = {
                _id: validUser?._id,
                fullname: validUser?.fullname,
                email: validUser?.email,
                address: validUser?.address,
                phone: validUser?.phone,
                age: validUser?.age,
                spent: validUser?.spent,
                role: validUser?.role,
                balance: validUser?.balance
            }
            const token = await sign(payload, process.env.JWT_SECRET_KEY,
                {expiresIn: expiresin});
            if (token) return res.status(200).json({token: token});
        }
}

const patientLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.PATIENT_TOKEN_EXPIRESIN;
    try { auth(res, patientModel, body, expiresIn); } catch (err) {logError(err); return res.status(400)
        .send({message: err?.message});}
}

const doctorLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, doctorModel, body, expiresIn); } catch (err) {logError(err); return res.status(400)
        .send({message: err?.message});}
}

const adminLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, ownerModel, body, expiresIn); } catch (err) {logError(err); return res.status(400)
        .send({message: err?.message});}
}

const bossLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, ownerModel, body, expiresIn); } catch (err) {logError(err); return res.status(400)
        .send({message: err?.message});}
}

module.exports = {
    patientLogin,
    doctorLogin,
    adminLogin,
    bossLogin
}