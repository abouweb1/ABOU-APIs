const Product = require('../models/products');
const mongoose = require("mongoose");


function getAllProduct(req, res) {
    Product.find((err, products) => {
        if (products) {
            res.status(200).json(products)
        } else {
            res.status(400).json({ message: "Failed!" });
        }
    })


}

function getActiveProduct(req, res) {
    // Product.find({ active: true }, (err, products) => {
    //     if (products) {
    //         res.status(200).json(products)
    //     } else {
    //         res.status(400).json({ message: "Failed!" });
    //     }
    // })
    // if (res.params.lang == 'en') {
    //     Product.find({ active: true }).select()
    // }
    // else if (res.params.lang == 'ar') {
    //     Product.find({ active: true }).select()
    // }
    if (req.params.lang == 'en') {

        Product.find({ active: true }).select('productId superTitle title subtitle bulletList description productImage gallery')
            .then((products) => { res.status(200).json(products) })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })
    }
    else if (req.params.lang == 'ar') {
        Product.find({ active: true }).select('productId superTitle_ar title_ar subtitle_ar bulletList_ar description_ar productImage gallery')
            .then((products) => {
                res.status(200).json(
                    products.map(product => {
                        return {
                            productId: product.productId,
                            superTitle: product.superTitle_ar,
                            title: product.title_ar,
                            subtitle: product.subtitle_ar,
                            bulletList: product.bulletList_ar,
                            description: product.description_ar,
                            productImage: product.productImage,
                            gallery: product.gallery,
                        }
                    })
                )
            })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })
    }
}

function getHeroSectionProduct(req, res) {
    // Product.find({ active: true, heroSectionItem: true }, (err, products) => {
    //     if (products) {
    //         res.status(200).json(products)
    //     } else {
    //         res.status(400).json({ message: "Failed!" });
    //     }
    // })

    if (req.params.lang == 'en') {
        Product.find({ active: true, heroSectionItem: true }).select('productId superTitle title subtitle description productImage')
            .then((products) => { res.status(200).json(products) })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })


    }
    else if (req.params.lang == 'ar') {
        Product.find({ active: true, heroSectionItem: true }).select('productId superTitle_ar title_ar subtitle_ar  description_ar productImage ')
            .then((products) => {
                res.status(200).json(
                    products.map(product => {
                        return {
                            productId: product.productId,
                            superTitle: product.superTitle_ar,
                            title: product.title_ar,
                            subtitle: product.subtitle_ar,
                            description: product.description_ar,
                            productImage: product.productImage,
                        }
                    })
                )
            })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })


    }
}


function getProductById(req, res) {

    if (req.params.lang == 'en') {
        Product.find({ productId: req.params.id }).select('productId superTitle title subtitle bulletList description productImage gallery')
            .then((products) => { res.status(200).json(products) })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })


    }
    else if (req.params.lang == 'ar') {
        Product.find({ productId: req.params.id }).select('productId superTitle_ar title_ar subtitle_ar bulletList_ar description_ar productImage gallery')
            .then((products) => {
                res.status(200).json(
                    products.map(product => {
                        return {
                            productId: product.productId,
                            superTitle: product.superTitle_ar,
                            title: product.title_ar,
                            subtitle: product.subtitle_ar,
                            bulletList: product.bulletList_ar,
                            description: product.description_ar,
                            productImage: product.productImage,
                            gallery: product.gallery,
                        }
                    })
                )
            })
            .catch(err => { res.status(400).json({ message: 'Failed to get products', error: err }) })


    }
    // Product.find({ productId: req.params.id }, (err, product) => {
    //     if (product) {
    //         res.status(200).json(product)
    //     } else {
    //         res.status(400).json({ message: "Failed!" });
    //     }
    // })
}

function addProduct(req, res) {
    const newProduct = Product({
        ...req.body,
        heroSectionItem: false,
        _id: new mongoose.Types.ObjectId(),

        // productId: req.body.productId,

        // superTitle: req.body.superTitle,

        // title: req.body.title,

        // subtitle: req.body.subtitle,

        // bulletList: req.body.bulletList,

        // description: req.body.description,

        // productImage: req.body.productImage,

        // gallery: req.body.productImage,
        // // productImage: req.files['productImage'] && req.files['productImage'][0].path,

        // // gallery: req.files['gallery'] && req.files['gallery'].length > 0 && req.files['gallery'].map((image) => (image.path)),

        // active: req.body.active
    })
    newProduct.save((err, productData) => {
        if (err) {
            console.log(err, req.body);
            res.status(400).json({
                message: 'Failed to add product'
            })
        }
        else {
            res.status(200).json({
                message: 'Product added successfully',
                model: productData
            })
        }
    })
    // res.status(200).json({ message: 'success' })
}

function updateProduct(req, res) {
    Product.findByIdAndUpdate(req.body.id, {

        // productId: req.body.productId,

        // superTitle: req.body.superTitle,

        // title: req.body.title,

        // subtitle: req.body.subtitle,

        // bulletList: req.body.bulletList,

        // description: req.body.description,
        ...req.body,

        // productImage: req.files['productImage'] && req.files['productImage'][0].path,

        // gallery: req.files['gallery'] && req.files['gallery'].length > 0 && req.files['gallery'].map((image) => (image.path)),

    }, { new: true }, (err, updatedProduct) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: 'Failed to update product'
            })
        }
        else {
            res.status(200).json({
                message: 'Product updated successfully',
                model: updatedProduct
            })
        }
    })
}

function activateProduct(req, res) {
    Product.findOne({ productId: req.params.id }, (err, product) => {
        if (product) {
            product.active = !product.active
            product.save((err, updatedProduct) => {
                if (updatedProduct) {
                    res.status(200).json({
                        message: 'Product status changed successfully',
                        product: updatedProduct
                    })
                } else {
                    res.status(400).json({ message: "Failed to change status of this product." });
                }
            })

        } else {
            res.status(400).json({ message: "No Product found." });
        }
    })
}

function addProductToHeroSection(req, res) {
    Product.findOne({ productId: req.params.id }, (err, product) => {
        if (product) {
            product.heroSectionItem = !product.heroSectionItem
            product.save((err, updatedProduct) => {
                if (updatedProduct) {
                    res.status(200).json({
                        message: 'Product status changed successfully',
                        product: updatedProduct
                    })
                } else {
                    res.status(400).json({ message: "Failed to change status of this product." });
                }
            })

        } else {
            res.status(400).json({ message: "No Product found." });
        }
    })
}

function deleteProduct(req, res) {
    Product.findOneAndDelete({ productId: req.params.id }, (err) => {
        if (err) {
            res.status(400).json({
                message: 'Failed to delete product'
            })
        }
        else {
            res.status(200).json({
                message: 'Product deleted successfully',
            })
        }
    })
}

module.exports = { getActiveProduct, getAllProduct, getProductById, addProduct, updateProduct, activateProduct, deleteProduct, getHeroSectionProduct, addProductToHeroSection }