const Course = require('../models/Course')
exports.isCourseOwner = (user, course) => {
    let isOwner = false
    if(user){
        if(user._id == course.owner._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isEnrolledAlready= async (userId, courseId) => {
    let isEnrolledAlready = false
    const course = await Course.findById(courseId)
    //TO DO
    const enrolled = course.usersEnrolled.find(x=> x == userId )

    if(enrolled){
        isEnrolledAlready = true
    }
    return isEnrolledAlready
}