const mongoose = require('mongoose');

const messageSchema = {

    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'This is not valid email'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    replied: {
        type: Boolean,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }

};

module.exports = mongoose.model("Message", messageSchema);