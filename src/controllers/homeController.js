//const Post = require('../models/Post.js')
const User = require('../models/User')
const { all } = require('../routes')
const courseService = require('../services/courseService')


exports.getHomePage = async (req, res) => {
        if(req.user){
        const allCoursesAscending = await courseService.getAllCoursesAscending().lean()
                let isSearched = false
                res.render('user-home', {allCoursesAscending, isSearched})
        } else {
                const allCoursesByLikes = await courseService.getAllCoursesByLikes().lean()
                res.render('guest-home', {allCoursesByLikes})
        }
}

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}