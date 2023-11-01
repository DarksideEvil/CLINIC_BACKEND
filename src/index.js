const express = require('express');
const app = express();
const DB = require('./settings/mongo/db');
const PORT = process.env.PORT || 5000;
const config = require('dotenv').config();
const cors = require('cors');
const {logError} = require('./settings/logs/log');
const allRouter = require('./router');

//configuring..
config;
//connecting to MongoDB..
DB();

app.use(express.json());
cors();
app.use('/api', allRouter);

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