const journalModel = require('../journals/journal.model');
const reportModel = require('./report.model');
const { logError } = require('../settings/logs/log');
// aggregating all kind of transactions
const byIncome = async (req, res) => {
    try {
        const profit = await journalModel.aggregate([
            {$match: {operation: 'Credit'}},
            {
                $group: {_id: '$title', income: {$sum: '$amount'}}
            }
        ]);
        // making laconic doc
        for ( let i of profit ) {
            i['title'] = i._id
            delete i._id
        }

        return res.status(200).json(profit);
    } catch (err) {
        logError(err);
        return res.status(500).send(err);
    }
}
// aggregating docs by month income
const fullMonthInfo = async (req, res) => {
    const query = req.query;
    try {
        let reports;
        if (query.month && query.year) {
            reports = await reportModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $gte: ["$createdAt", new Date(query.year, query.month - 1, 1)] },
                                { $lt: ["$createdAt", new Date(query.year, query.month, 1)] }
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: {type: '$type', title: '$title', date: '$date',
                        income: '$income'}
                    }
                    
                },
                {
                    $project: {
                        _id: 0, title: '$_id.title', type: '$_id.type', date: '$_id.date',
                        income: '$_id.income'
                    }
                }, {$sort: {date: 1}}
            ]);
        } else {
            reports = await reportModel.aggregate([
                {
                    $group: {
                        _id: {type: '$type', title: '$title', date: '$date', income: '$income'}
                    }
                    
                },
                {
                    $project: {
                        _id: 0, title: '$_id.title', type: '$_id.type', 
                        date: '$_id.date', income: '$_id.income'
                    }
                }, {$sort: {date: 1}}
            ]);
        }

        return res.status(200).json(reports);
    } catch (err) {
        logError(err);
        return res.status(500).send(err);
    }
}

module.exports = { byIncome, fullMonthInfo }