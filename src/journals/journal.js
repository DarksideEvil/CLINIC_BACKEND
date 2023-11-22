const journalModel = require('./journal.model');

module.exports = {
    getJournals: async (req, res) => {
        try {
            const journals = await journalModel.find();

            return res.status(200).json(journals);
        } catch (err) {
            return res.status(500).send({message: err?.message});
        }
    }
}