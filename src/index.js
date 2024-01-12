const config = require('dotenv').config();
const express = require('express');
const app = express();
const DB = require('./settings/mongo/db');
const PORT = process.env.PORT || 5000;
// const cors = require('cors');
const {logError} = require('./settings/logs/log');
const allRouter = require('./router');
const onceEveryMonth = require('./reports/everyMonth');
const cron = require('node-cron');

// configurs..
config;
// connects to MongoDB..
DB();
// parses incoming JSON requests and puts the parsed data in req.body..
app.use(express.json());
// enables Cross-Origin Resource Sharing (CORS)
// app.use(cors({
//     origin: 'https://clinic0.netlify.app',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }));
// this function is performed on the 1st of every month
cron.schedule('* * 1 * *', () => {
    // saving monthly income
    onceEveryMonth();
}, {name: 'inserted monthly income !'});
// path to all routes
app.use('/api', allRouter);
// handles errors..
app.use((err, req, res, next) => {
    if (err) {
        logError(err);
        console.error(err?.message);
        if (!err.statusCode) err.statusCode = 500  // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).json({
            statusCode: err.status,
            message: err?.details?.body[0]?.message
        });
    }
    next();
});

app.listen(PORT, () => console.log(`${PORT} server's online...`));