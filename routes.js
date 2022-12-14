const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

const router = require('express').Router()

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// post related routes
router.get('/create-post',userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post',userController.mustBeLoggedIn,  postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/post/:id/edit',userController.mustBeLoggedIn, postController.viewEditScreen)
router.post('/post/:id/edit',userController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeLoggedIn, postController.delete)




module.exports = router;