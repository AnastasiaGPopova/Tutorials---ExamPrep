//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const courseController = require('./controllers/courseController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
// router.get('/calalog', homeController.getCatalogPage)


//Login and Register

router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


//course creation
router.get('/create', isAuthenticated, courseController.getCourseCreationPage )
router.post('/create', isAuthenticated, courseController.postCreatedCourse)

//Details Page
router.get('/:courseId/details', isAuthenticated, courseController.getDetails)

 //enroll
router.get('/:courseId/enroll', isAuthenticated, courseController.enroll)

//Edit page
router.get('/:courseId/edit', isAuthenticated, courseController.getEditPage)
router.post('/:courseId/edit', isAuthenticated, courseController.postEditedCourse)

//Delete post
router.get('/:courseId/delete', isAuthenticated, courseController.getDeleteCourse)

//search
router.post('/search', isAuthenticated, courseController.getSearchPagewithResults)


router.get('/logout', isAuthenticated, authController.logout)
// router.get('*', homeController.getErrorPage404)
// router.get('/404', homeController.getErrorPage404)



module.exports = router