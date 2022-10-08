const userController = require('./controllers/userController')
const router = require('express').Router()


router.get('/', userController.home)
router.post('/register', userController.register)




module.exports = router;