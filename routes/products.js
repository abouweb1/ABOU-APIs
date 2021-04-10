const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');

const { upload } = require('../middleware/uploadImages')

const productControllers = require('../controllers/products');

router.get('/activeProducts/:lang', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.getActiveProduct(req, res));

router.get('/allProducts', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.getAllProduct(req, res));

router.get('/getHeroSecProducts/:lang', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.getHeroSectionProduct(req, res));

router.get('/productById/:lang/:id', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.getProductById(req, res));

router.post('/addImageProductGallery', basicAuth({ users: { 'admin': 'admin@2021' } }), upload.array('images'), (req, res) => productControllers.addImageToProductGAllery(req, res));

// router.post('/addProduct', upload.fields([{ name: 'productImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res) => productControllers.addProduct(req, res));
router.post('/addProduct', basicAuth({ users: { 'admin': 'admin@2021' } }), upload.single("productImage"), (req, res) => productControllers.addProduct(req, res));

// router.post('/addProduct', (req, res) => productControllers.addProduct(req, res));

// router.patch('/updateProduct', upload.fields([{ name: 'productImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res) => productControllers.updateProduct(req, res));
router.patch('/updateProduct', basicAuth({ users: { 'admin': 'admin@2021' } }), upload.single("productImage"), (req, res) => productControllers.updateProduct(req, res));

router.patch('/activateProduct/:id', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.activateProduct(req, res));

router.patch('/addHeroSecProduct/:id', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.addProductToHeroSection(req, res));

router.delete('/deleteProduct/:id', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.deleteProduct(req, res));

router.delete('/deleteImageProductGallery/:imageId/:productId', basicAuth({ users: { 'admin': 'admin@2021' } }), (req, res) => productControllers.deleteImageFromProductGallery(req, res));


router.get('/product-image/:id', (req, res) => productControllers.returnProductImage(req, res));
router.get('/gallery-product-image/:id', (req, res) => productControllers.returnImageInProductGallery(req, res));

module.exports = router;