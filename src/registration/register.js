const patientModel = require('../patients/patient.model');
const doctorModel = require('../doctors/doctor.model');
const ownerModel = require('../owners/owner.model');
const argon2 = require('argon2');
const sign = require('jsonwebtoken').sign;

const auth = async (res, user, body, expiresin) => {
    const validPatient = await user.findOne({email: body.email});
        if (!validPatient) return res.status(403).send('you\'ve never signed up !');
        else {
            const validPswd = await argon2.verify(validPatient.password, body.password);
            if (!validPswd) return res.status(400).send('email/password incorrect !');
            const payload = {
                _id: validPatient._id,
                fullname: validPatient.fullname,
                email: validPatient.email,
                role: validPatient.role
            }
            const token = await sign(payload, process.env.JWT_SECRET_KEY,
                {expiresIn: expiresin});
            if (token) return res.status(200).json({token: token});
        }
}

const patientLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.PATIENT_TOKEN_EXPIRESIN;
    try { auth(res, patientModel, body, expiresIn); } catch (err) {return res.status(400).send(err);}
}

const doctorLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, doctorModel, body, expiresIn); } catch (err) {return res.status(400).send(err);}
}

const adminLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, ownerModel, body, expiresIn); } catch (err) {return res.status(400).send(err);}
}

const bossLogin = (req, res) => {
    const body = req.body;
    const expiresIn = process.env.TOKEN_EXPIRESIN;
    try { auth(res, ownerModel, body, expiresIn); } catch (err) {return res.status(400).send(err);}
}

module.exports = {
    patientLogin,
    doctorLogin,
    adminLogin,
    bossLogin
}