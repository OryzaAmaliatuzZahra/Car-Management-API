const router = require('express').Router();
const productController = require('../controller/productController');
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


router.get('/', productController.getProducts)
router.get('/search', productController.searchProduct)
router.get('/:id', Auth, productController.getProductById)
router.put('/:id', Auth, productController.editProduct)
router.delete('/:id', Auth, checkRole('superadmin'), productController.deleteProduct)
router.post('/create', Auth, productController.createProduct)

module.exports = router