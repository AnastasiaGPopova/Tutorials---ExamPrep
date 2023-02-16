const Course = require('../models/Course')
const User = require('../models/User')
const courseService = require('../services/courseService')
const courseUtility = require('../utils/courseUtility')
const parser = require('../utils/parser')



exports.getCourseCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedCourse = async (req, res) => {

 const {title, description, imageUrl, duration} = req.body

    try{
        if(!title || !description || !imageUrl || !duration){
            throw new Error ("All fields are requiered!")
        }
        const newourse = await courseService.createNewCourse({title, description, imageUrl, duration, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentCourse = await courseService.getOneCourse(req.params.courseId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('usersEnrolled') 
                                       .populate('owner')         
                                       .lean()

     if(!currentCourse){
    return res.redirect('/')
      }

    isLogged = true
    const isOwner = courseUtility.isCourseOwner(req.user, currentCourse)
    const isAlreadyEnrolled= await courseUtility.isEnrolledAlready(req.user._id, req.params.courseId)
    console.log(isOwner)
    console.log(isAlreadyEnrolled)

    res.render('details', {currentCourse, isOwner, isAlreadyEnrolled})
} 

exports.enroll = async (req,res) =>{
    const currentCourse = await courseService.getOneCourse(req.params.courseId)
    const isOwner = courseUtility.isCourseOwner(req.user, currentCourse)

    if(isOwner){
        res.redirect('/')
    } else {
    currentCourse.usersEnrolled.push(req.user._id)
    await currentCourse.save()
    res.redirect(`/${req.params.courseId}/details`)
    }

}


exports.getEditPage = async (req,res) => {
    const currentCourse = await courseService.getOneCourse(req.params.courseId).populate('owner').lean()
    const isOwner = courseUtility.isCourseOwner(req.user, currentCourse)

    if(!isOwner){
        res.redirect('/')
    } else {
        res.render('edit', {currentCourse})
    }
}



exports.postEditedCourse = async (req,res) => {
    const {title, description, imageUrl, duration} = req.body

    try{
        if(!title || !description || !imageUrl || !duration){
            throw new Error ("All fields are requiered!")
        }
        const updatedCourse = await courseService.update(req.params.courseId,{title, description, imageUrl, duration} )//encoded body-to, which we receive, will create a new cube

        res.redirect(`/${req.params.courseId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render(`edit`, {errors})
    }
}


exports.getDeleteCourse= async (req, res) => {
    const course = await courseService.getOneCourse(req.params.courseId).populate('owner').lean()
    const isOwner = courseUtility.isCourseOwner(req.user, course)

    if(!isOwner){
        res.redirect('/')
    } else {
   const test = await courseService.deleteCourse(req.params.courseId)
   res.redirect('/')
    }
}


exports.getSearchPagewithResults = async (req, res) => {
    let isSearched = true
    const {item} = req.body

    const allMatches = await courseService.getSearchedbyType(item).lean()
    res.render('user-home', {allMatches, isSearched})
}