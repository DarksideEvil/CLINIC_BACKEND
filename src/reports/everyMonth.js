const journalModel = require('../journals/journal.model');
const reportModel = require('./report.model');
const { logError } = require('../settings/logs/log');
const dayjs = require('dayjs');

const onceEveryMonth = async () => {
    try {
        // the beginning and end date of this month is being determined
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        // aggregating all of this month's docs
        const profit = await journalModel.aggregate([
            {
                $match: {
                    operation: 'Credit',
                    $expr: {
                        $and: [
                            { $gte: ["$createdAt", startOfMonth] },
                            { $lt: ["$createdAt", endOfMonth] }
                        ]
                    }
                }
              },
            {
                $group: {_id: {title: '$title', type: '$type'}, income: {$sum: '$amount'}}
            }
        ]);
        // deleting unnecessary fields of profit's object
        for ( let i of profit ) {
            i['title'] = i._id.title,
            i['type'] = i._id.type
            delete i._id
        }
        // All documents collected by the end of the month are stored in the report collection
            const thatDay = dayjs().format('YYYY-MM');
            profit.forEach(async journal => {
                const incomeReports = new reportModel ({
                    title: journal.title,
                    type: journal.type,
                    date: thatDay,
                    income: journal.income
                });
                await incomeReports.save();
            });

    } catch (err) {
        // logging if there's an error
        logError(err);
    }
}
module.exports = onceEveryMonth;