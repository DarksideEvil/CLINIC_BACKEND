const cors = require('cors');
const allowedOrigins = [
    'https://clinic0.netlify.app',
    'https://clinicdashboard.netlify.app'
];

module.exports = (app) => {
    app.use(cors({
        origin: allowedOrigins,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
}