const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadImages')

const productControllers = require('../controllers/products');

router.get('/activeProducts/:lang', (req, res) => productControllers.getActiveProduct(req, res));

router.get('/allProducts', (req, res) => productControllers.getAllProduct(req, res));

router.get('/getHeroSecProducts/:lang', (req, res) => productControllers.getHeroSectionProduct(req, res));

router.get('/productById/:lang/:id', (req, res) => productControllers.getProductById(req, res));

// router.post('/addProduct', upload.fields([{ name: 'productImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res) => productControllers.addProduct(req, res));
router.post('/addProduct', (req, res) => productControllers.addProduct(req, res));

// router.patch('/updateProduct', upload.fields([{ name: 'productImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res) => productControllers.updateProduct(req, res));
router.patch('/updateProduct', (req, res) => productControllers.updateProduct(req, res));

router.patch('/activateProduct/:id', (req, res) => productControllers.activateProduct(req, res));

router.patch('/addHeroSecProduct/:id', (req, res) => productControllers.addProductToHeroSection(req, res));

router.delete('/deleteProduct/:id', (req, res) => productControllers.deleteProduct(req, res));

module.exports = router;