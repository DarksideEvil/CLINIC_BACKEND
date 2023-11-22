const ownerModel = require('./owner.model');
const {logError} = require('../settings/logs/log');
const argon2 = require('argon2');
const salt = process.env.ARGONSALT;
const sign = require('jsonwebtoken').sign;

const addOwner = async (req, res) => {
    const {fullname, email, password, role} = req.body;
    const hashedPswd = await argon2.hash(password, salt);
    try {
        const existOwner = await ownerModel.findOne({email: req.body.email});
        if (existOwner) return res.status(400).send({message: 'This owner\'s already exists in database !'});

        const owner = new ownerModel({
            fullname, email, password: hashedPswd, role
        });
        await owner.save();
        if (owner) {
            const payload = {
                fullname: owner.fullname,
                email: owner.email,
                role: owner.role
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

const getOwners = async (req, res) => {
    try {
        const owners = await ownerModel.find({}).select('-password');
        return res.status(200).json(owners);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const getOwner = async (req, res) => {
    try {
        const owner = await ownerModel.findById(req.params.id).select('-password');

        return res.status(200).json(owner);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const editOwner = async (req, res) => {
    try {
        const updatedOwner = await ownerModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .select('-password');

        return res.status(200).json(updatedOwner);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

const deleteOwner = async (req, res) => {
    try {
        const deletedOwner = await ownerModel.findByIdAndDelete(req.params.id);
        
        return res.status(200).json(deletedOwner);
    } catch (err) {
        logError(err);
        return res.status(500).send({message: err?.message});
    }
}

module.exports = {
    addOwner,
    getOwners,
    getOwner,
    editOwner,
    deleteOwner
}