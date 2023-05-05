const router = require('express').Router();

const userController = require('../controller/userController');
const Auth = require('../middleware/auth')

router.get('/', Auth, userController.getUsers)
router.post('/register', Auth, userController.createUser)
router.post('/login', Auth, userController.login)
router.get('/:id', Auth, userController.getUserById)
router.put('/:id', Auth, userController.editUser)
router.delete('/:id', Auth, userController.deleteUser)

module.exports = router