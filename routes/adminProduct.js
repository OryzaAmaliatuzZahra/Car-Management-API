const router = require('express').Router();

const adminProduct = require('../controller/adminProduct');
// const Auth = require('../middleware/auth');

router.get('/', adminProduct.getProduct);
router.get('/create', adminProduct.createProduct);
router.get('/edit', adminProduct.editProduct);
router.get('/delete', adminProduct.deleteProduct)

module.exports = router