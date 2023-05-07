const router = require('express').Router();

const shopController = require('../controller/shopController');
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', shopController.getShops)
router.get('/:id', Auth, shopController.getShopById)
router.get('/search', shopController.searchShops)
router.put('/:id', Auth, checkRole('admin'), shopController.editShop)
router.delete('/:id', Auth, checkRole('superadmin'), shopController.deleteShop)
router.post('/create', Auth, checkRole('user'), shopController.createShop)

module.exports = router
