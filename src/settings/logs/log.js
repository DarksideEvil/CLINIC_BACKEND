const winston = require('winston');

const logger = winston.createLogger({
    //writing down err to journal named "CLINIC_logs"
    transports: new winston.transports.File({filename: 'CLINIC_logs.log'},
    //showing err on colsole
    new winston.transports.Console())
});

module.exports.logError = (err) => {
    return logger.error(err);
}
