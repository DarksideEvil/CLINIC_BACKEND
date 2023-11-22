const mongoose = require('mongoose');
const patientModel = require('../patients/patient.model');
const journal = require('../journals/journal.model');
const serviceModel = require('../services/service.model');
const jobModel = require('../jobs/job.model');
const currency = require('currency.js');
const { logError } = require('../settings/logs/log');

const transferMoney = async (req, res) => {
    const body = req.body; 
    const amount = req.body.amount;
    //starting session
    const session = await mongoose.startSession();

    // open a transaction inside our session
    session.startTransaction();
    try {
        // we look up the sender from the base, where the base is being queried, so
         // we must also pass the session to all requests executed within the transaction
        let sender = await patientModel.findOne({_id: body.senderAccountNumber});
        // if (!sender) {throw new Error('sender not found !');}
        if (!sender) {return res.status(400).send({message: 'sender not found !'});}

        // look for the recipient in the database and return an error if it is not found
        let receiver;
        if (body.role === 'service') {
            receiver = await serviceModel.findOne({_id: body.receiverAccountNumber});
        } else {receiver = await jobModel.findOne({_id: body.receiverAccountNumber});}
        // if (!receiver) {throw new Error('receiver not found !');}
        if (!receiver) {return res.status(400).send({message: 'receiver not found !'});}

        sender.spent += amount;
        // we deduct money from the sender's account in the amount of the transaction
        sender.balance = currency(sender.balance).subtract(amount);
        // if there is not enough money in his account, we return an error
        if (sender.balance <= 0) {return res.status(400)
            .send({message: `${sender.fullname} has insufficient funds !`});}
        // write the changes made to the sender to the database
         // no need to provide a session object here.
        await sender.save();
        // about the action of withdrawing money from the sender's account
         // write a log
        const debitJournal = new journal({
            fullname: sender.fullname, accountNumber: sender._id, operation: 'Debit', amount: amount
        });
        await debitJournal.save();
        // We add money to the recipient's account in the amount of the transaction
         // and write it to the database
        receiver.income = currency(receiver.income).add(amount);
        await receiver.save();
        //we will record the act of adding money to the recipient's account
        const creditJournal = new journal({
            title: receiver.title, type: receiver.role, 
            accountNumber: receiver._id, operation: 'Credit', amount: amount
        });
        await creditJournal.save();

        // if everything has been successful up to this point, we commit the session
        await session.commitTransaction();
        return res.status(200).send({message: 'Transaction has been completed successfully !'});
    } catch (err) {
        logError(err);
        // if there is an error in the try block above
         // then all changes made will be canceled and
         // nothing is written to the data store
        await session.abortTransaction();

        console.error(err);
        // throw err;
        res.status(500).send({message: err?.message});
    } finally {
        // in any case, we close the session when we're done
        session.endSession();
    }
}

module.exports = transferMoney;