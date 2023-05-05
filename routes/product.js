const router = require('express').Router();
const productController = require('../controller/productController');
const Auth = require('../middleware/auth');


router.get('/', Auth, productController.getProducts)
router.get('/search', Auth, productController.searchProduct)
router.get('/:id', Auth, productController.getProductById)
router.put('/:id', Auth, productController.editProduct)
router.delete('/:id', Auth, productController.deleteProduct)
router.post('/create', Auth, productController.createProduct)

module.exports = router