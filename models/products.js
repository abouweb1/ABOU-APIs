const mongoose = require('mongoose');

const productSchema = {

    _id: mongoose.Schema.Types.ObjectId,

    productId: {
        type: String,
        required: true,
        unique: true
    },

    superTitle: String,

    title: String,

    subtitle: String,

    bulletList: Array,

    description: String,

    superTitle_ar: String,

    title_ar: String,

    subtitle_ar: String,

    bulletList_ar: Array,

    description_ar: String,

    productImage: String,

    gallery: Array,

    heroSectionItem: Boolean,

    active: {
        type: Boolean,
        required: true,
    }

};

module.exports = mongoose.model("Product", productSchema);