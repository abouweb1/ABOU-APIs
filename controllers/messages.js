const Message = require('../models/message');
const mongoose = require("mongoose");


function getAllMessages(req, res) {
    Message.find((err, messages) => {
        if (messages) {
            res.status(200).json(messages)
        } else {
            res.status(400).json({ message: "Failed!" });
        }
    })
}

function sendMessage(req, res) {
    const newMessage = Message({
        ...req.body,
        replied: false,
        time: Date.now(),
        _id: new mongoose.Types.ObjectId()

    })
    newMessage.save((err, message) => {
        if (err) {
            res.status(400).json({ message: "Failed to send message!" });
        } else {
            res.status(200).json({
                message: 'Message sent successfully',
                model: message
            });
        }
    })
}

function replied(req, res) {
    Message.findOne({ _id: req.params.id }, (err, message) => {
        if (message) {
            message.replied = !message.replied
            message.save((err, updatedMessage) => {

                if (updatedMessage) {
                    res.status(200).json({
                        message: 'Message status changed successfully',
                        model: updatedMessage
                    })
                } else {
                    res.status(400).json({ message: "Failed to change status of this message." });
                }
            })

        } else {
            res.status(400).json({ message: "No message found." });
        }
    })

}

function deleteMessage(req, res) {
    Message.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(400).json({
                message: 'Failed to delete message'
            })
        }
        else {
            res.status(200).json({
                message: 'Message deleted successfully',
            })
        }
    })
}
module.exports = { getAllMessages, sendMessage, deleteMessage, replied }