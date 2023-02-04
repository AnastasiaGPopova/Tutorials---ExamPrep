//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const coursController = require('./controllers/coursController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------

router.get('/', homeController.getHomePage)



//----------------How to access the cube create page action----------------------
// app.get('/create', (req, res) => {
//     res.render('create')
// })

// app.get('/create', cubeController.getCubCreation)
//---------------------------------------

//Login and Register
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)



router.get('/404', homeController.getErrorPage404)

//Courses

router.get('/course/create', isAuthenticated, coursController.getCourseCreation)
router.post('/course/create', isAuthenticated, coursController.postCreateCourse)

router.get('/course/:courseId/details', coursController.getDetails)

//Edit Page
router.get('/course/:courseId/edit', isAuthenticated, coursController.getEditCoursePage)
router.post('/course/:courseId/edit', isAuthenticated,coursController.postEditedCourse)

//Delete Course
router.post('/course/:courseId/delete', coursController.postDeleteCourse)

//Enroll Course
router.get('/course/:courseId/enroll', coursController.postEnrollCourse)

// // router.get('/cubes/:cubeId/details', coursController.getDetails)
// //Edit page
// router.get('/cubes/:cubeId/edit', coursController.getEditCubePage)
// router.post('/cubes/:cubeId/edit', coursController.postEditedCube)

// //Delete Page
// router.get('/cubes/:cubeId/delete', coursController.getDeletedCubePage)
// router.post('/cubes/:cubeId/delete', coursController.postDeleteCube)

router.get('/logout', authController.logout)


// router.get('/cubes/:cubeId/attach', coursController.getAttachAccessory)
// router.post('/cubes/:cubeId/attach', coursController.postAttachedAccessory)


module.exports = router