const Product = require('../models/products');
const Image = require('../models/image');
const Gallery = require('../models/gallery');
const mongoose = require("mongoose");
const image = require('../models/image');


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
}

function addProduct(req, res) {
    console.log(req.file);


    if (req.file) {
        const newImage = Image({
            _id: new mongoose.Types.ObjectId(),

            data: req.file?.buffer,

            contentType: req.file?.mimetype,
        })

        newImage.save((err, imageData) => {
            if (err) {
                // console.log(err, req.body);
                res.status(400).json({
                    message: 'Failed to upload image product, adding product failed'
                })
            }
            else {
                const newProduct = Product({
                    ...req.body,
                    heroSectionItem: false,
                    active: req.body.active || false,
                    _id: new mongoose.Types.ObjectId(),
                    productImage: `https://abou-apis.herokuapp.com/products/product-image/${imageData.id}`,
                    productImageId: imageData.id,
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
            }
        })
    } else {
        const newProduct = Product({
            ...req.body,
            heroSectionItem: false,
            active: req.body.active || false,
            _id: new mongoose.Types.ObjectId(),
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
    }


    // res.status(200).json({ message: 'success' })
}

function updateProduct(req, res) {
    if (req.file) {

        Product.findByIdAndUpdate(req.body.id, {
            ...req.body,

        }, { new: true }, (err, updatedProduct) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message: 'Failed to update product'
                })
            } else {
                if (updatedProduct.productImageId) {
                    Image.findByIdAndUpdate(updatedProduct.productImageId, {
                        data: req.file?.buffer,
                        contentType: req.file?.mimetype,
                    }, (err) => {
                        if (err) {
                            res.status(400).json({
                                message: 'Failed to update image product'
                            })
                        } else {
                            res.status(200).json({
                                message: 'Product updated successfully',
                                model: updatedProduct
                            })
                        }

                    })
                }

                else {
                    const newImage = Image({
                        _id: new mongoose.Types.ObjectId(),

                        data: req.file?.buffer,

                        contentType: req.file?.mimetype,
                    })

                    newImage.save((err, imageData) => {
                        if (err) {
                            // console.log(err, req.body);
                            res.status(400).json({
                                message: 'Failed to upload image product'
                            })
                        }
                        else {

                            Product.findByIdAndUpdate(
                                req.body.id,
                                { productImage: `https://abou-apis.herokuapp.com/products/product-image/${imageData.id}`, productImageId: imageData.id },
                                { new: true },
                                (err, updatedProduct) => {
                                    if (err) {
                                        res.status(400).json({
                                            message: 'Failed to update image product'
                                        })
                                    } else {
                                        res.status(200).json({
                                            message: 'Product updated successfully',
                                            model: updatedProduct
                                        })
                                    }
                                }
                            )

                        }
                    })
                }

            }

        })
    } else {
        Product.findByIdAndUpdate(req.body.id, {

            ...req.body,

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


////////////////Gallery////////////

function addImageToProductGAllery(req, res) {
    // console.log(req.body, req.files);
    if (req.files && (req.files.length > 0)) {
        Product.find({ productId: req.body.productId }, async (err, product) => {
            // console.log(product);
            if (product.length > 0) {


                const iamgesArray = req.files.map(function (image) {

                    return new Promise(function (resolve, reject) {

                        const newGalleryImage = Gallery({
                            _id: new mongoose.Types.ObjectId(),

                            productId: req.body.productId,

                            data: image.buffer,

                            contentType: image.mimetype,
                        });

                        newGalleryImage.save((err, imageData) => {
                            if (!err) {

                                let imageUrl = {
                                    imageUrl: `https://abou-apis.herokuapp.com/products/gallery-product-image/${imageData.id}`,
                                    imageId: imageData.id,
                                }
                                return resolve(imageUrl);

                            }
                        })

                    });
                });

                Promise.all(iamgesArray).then(function (imagesUrl) {

                    Product.findOneAndUpdate(
                        { productId: req.body.productId },
                        { "$push": { "gallery": { "$each": imagesUrl } } },
                        { new: true },
                        (err, updatedProduct) => {
                            if (err) {
                                res.status(400).json({
                                    message: 'Failed to upload images'
                                })
                            } else {
                                res.status(200).json({
                                    message: 'Images uploaded successfully',
                                    model: updatedProduct
                                })
                            }
                        }
                    )
                })

            }

        })

    } else {
        res.status(400).json({
            message: 'Failed to upload images'
        })
    }

}

function deleteImageFromProductGallery(req, res) {
    if (req.params.imageId && req.params.productId) {
        Gallery.findByIdAndDelete(req.params.imageId, (err) => {
            if (err) {
                res.status(400).json({
                    message: 'Failed to delete image'
                })
            } else {
                Product.findOneAndUpdate(
                    { productId: req.params.productId },
                    { $pull: { gallery: { imageId: req.params.imageId } } },
                    { new: true },
                    (err, updatedProduct) => {
                        if (err) {
                            res.status(400).json({
                                message: 'Failed to delete image'
                            })
                        } else {
                            res.status(200).json({
                                message: 'Image deleted successfully',
                                model: updatedProduct
                            })
                        }
                    })
            }
        })
    }
}

function returnImageInProductGallery(req, res) {
    Gallery.findById(req.params.id, (err, image) => {
        if (image) {
            res.contentType(image.contentType)
            res.send(image.data);
        } else {
            res.send('error')
        }
    })
}

function returnProductImage(req, res) {
    Image.findById(req.params.id, (err, image) => {
        if (image) {
            res.contentType(image.contentType)
            res.send(image.data);
        } else {
            res.send('error')
        }

    })
}

module.exports = { getActiveProduct, getAllProduct, getProductById, addProduct, updateProduct, activateProduct, deleteProduct, getHeroSectionProduct, addProductToHeroSection, returnProductImage, addImageToProductGAllery, deleteImageFromProductGallery, returnImageInProductGallery }