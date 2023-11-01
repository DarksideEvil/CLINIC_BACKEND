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
        return res.send(err);
    }
}

const bossCheck = (req, res, next) => {
    try {
        const headers = req.headers['authorization'];
        if (headers) {
            const decoded = jwtDecoder(headers);
            if (decoded.role === 'boss') next();
            else res.status(405).send({message: 'Prohibited ⛔'});
        } else return res.status(403).send({message: 'Token not found !'});
    } catch (err) {
        return res.send(err);
    }
}

module.exports = { adminCheck, bossCheck };