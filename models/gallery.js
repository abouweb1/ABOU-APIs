const mongoose = require('mongoose');

const gallerySchema = {

    _id: mongoose.Schema.Types.ObjectId,

    productId: {
        type: String,
        required: true
    },

    data: Buffer,

    contentType: String,

};

module.exports = mongoose.model("Gallery", gallerySchema);