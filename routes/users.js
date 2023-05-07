const router = require('express').Router();

const userController = require('../controller/userController');
const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


router.get('/', userController.getUsers)
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/:id', Auth, checkRole('admin'), userController.getUserById)
router.put('/:id', Auth, checkRole('user'), userController.editUser)
router.delete('/:id', Auth, checkRole('superadmin'), userController.deleteUser)

module.exports = router
