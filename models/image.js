const mongoose = require('mongoose');

const imageSchema = {

    _id: mongoose.Schema.Types.ObjectId,

    data: Buffer,

    contentType: String,

};

module.exports = mongoose.model("Image", imageSchema);