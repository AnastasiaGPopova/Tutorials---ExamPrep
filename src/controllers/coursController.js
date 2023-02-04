const Tutorial = require('../models/Tutorial.js')
const courceService = require('../services/courceService.js')
const courseUtils = require('../utils/courseUtils.js')



exports.getCourseCreation = (req,res) => {
    res.render('create')
}

exports.postCreateCourse = async (req, res) => {

    const { title, description, imageUrl , duration } = req.body
    let tutorial = new Tutorial({title, description, imageUrl , duration, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
    //save tutorial
    console.log(tutorial)
    await tutorial.save()
    //redirect
    res.redirect('/')
}

exports.getDetails = async (req, res) => {

    const isEnrolled = await courseUtils.isEnrolled(req.user._id, req.params.courseId)

    let currentCourse = await Tutorial.findById(req.params.courseId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                .populate('owner')
                                .lean()

    if(!currentCourse){
        return res.redirect('/404')
    }

    let isOwner = false
    let isLogged = false

    if(req.user){
      isLogged = true

      if(currentCourse.owner._id == req.user._id){
        isOwner = true
      }
    } 

    res.render('details', {currentCourse, isOwner, isEnrolled})

}



exports.getEditCoursePage = async (req, res) => {

    const tutorial = await courceService.getOneCourse(req.params.courseId).lean()

    if(!courseUtils.isTutorialOwner(req.user, tutorial)){
        res.redirect('/404')
    }


    res.render('edit', {tutorial})

}

exports.getDeletedCubePage = async (req, res) => {
    const tutorial = await courceService.getOneCube(req.params.courseId).lean()
    if(!courseUtils.isTutorialOwner(req.user, tutorial)){
        res.redirect('/404')
    }

    res.render('edit', {tutorial})
}

exports.postEditedCourse = async (req,res) => {

    const { title, description, imageUrl , duration } = req.body
    await courceService.update(req.params.courseId, { title, description, imageUrl , duration, owner: req.user._id })

    res.redirect(`/course/${req.params.courseId}/details`)

}

exports.postDeleteCourse = async (req, res) => {
    if(!courseUtils.isTutorialOwner(req.user, tutorial)){
        res.redirect('/404')
    }
   await courceService.deleteCourse(req.params.courseId)
   res.redirect('/')
}

exports.postEnrollCourse = async (req, res) => {
    const enrolledUser = req.user._id
    console.log(enrolledUser)
    const tutorial = await courceService.getOneCourse(req.params.courseId)
    tutorial.usersEnrolled.push(enrolledUser)
    await tutorial.save()
 
    res.redirect(`/course/${req.params.courseId}/details`)
}