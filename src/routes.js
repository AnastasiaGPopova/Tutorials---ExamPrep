//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const cubeController = require('./controllers/cubeController')
const homeController = require('./controllers/homeController')
const asseccoryController = require('./controllers/accessoryController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------

router.get('/', homeController.getHomePage)
router.get('/about', homeController.getAboutPage)


//----------------How to access the cube create page action----------------------
// app.get('/create', (req, res) => {
//     res.render('create')
// })

// app.get('/create', cubeController.getCubCreation)
//---------------------------------------

router.get('/404', homeController.getErrorPage404)
router.get('/create', isAuthenticated, cubeController.getCubCreation)
router.post('/create', isAuthenticated, cubeController.postCreateCube)
router.get('/cubes/:cubeId/details', cubeController.getDetails)
//Edit page
router.get('/cubes/:cubeId/edit', cubeController.getEditCubePage)
router.post('/cubes/:cubeId/edit', cubeController.postEditedCube)

//Delete Page
router.get('/cubes/:cubeId/delete', cubeController.getDeletedCubePage)
router.post('/cubes/:cubeId/delete', cubeController.postDeleteCube)

router.get('/logout', authController.logout)


router.get('/cubes/:cubeId/attach', cubeController.getAttachAccessory)
router.post('/cubes/:cubeId/attach', cubeController.postAttachedAccessory)
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


router.use('/accessory', asseccoryController)




module.exports = router