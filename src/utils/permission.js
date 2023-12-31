const jwtDecoder = require('jwt-decode').jwtDecode;

const adminCheck = (req, res, next) => {
    try {
        const headers = req.headers['authorization'];
        if (headers) {
            const decoded = jwtDecoder(headers);
            if (decoded.role === 'admin') next();
            else res.status(405).send({message: 'Prohibited ⛔'});
        } else return res.status(403).send({message: 'Token not found !'});
    } catch (err) {
        return res.send({message: err?.message});
    }
}

const bossAdminCheck = (req, res, next) => {
    try {
        const headers = req.headers['authorization'];
        if (headers) {
            const decoded = jwtDecoder(headers);
            if (decoded.role === 'boss' || decoded.role === 'admin') next();
            else res.status(405).send({message: 'Prohibited ⛔'});
        } else return res.status(403).send({message: 'Token not found !'});
    } catch (err) {
        return res.send({message: err?.message});
    }
}

module.exports = { adminCheck, bossAdminCheck };