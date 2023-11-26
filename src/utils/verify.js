const verify = require('jsonwebtoken').verify;

const authVerify = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) return res.status(400).send({message: 'token\'s not defined !'});
        const validToken = await verify(header, process.env.JWT_SECRET_KEY);
        if (validToken) next();
    } catch (err) {
        return res.status(400).send({message: err?.message});
    }
}

module.exports = authVerify;