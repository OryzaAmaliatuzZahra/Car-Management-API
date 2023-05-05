const router = require('express').Router();

const shopController = require('../controller/shopController');
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', Auth, shopController.getShops)
router.get('/search', Auth, shopController.searchShops)
router.get('/:id', Auth, shopController.getShopById)
router.put('/:id', Auth, shopController.editShop)
router.delete('/:id', Auth, shopController.deleteShop)
router.post('/create', Auth, checkRole('admin'), shopController.createShop)

module.exports = router
