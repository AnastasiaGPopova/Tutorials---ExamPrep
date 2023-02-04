const Tutorial = require('../models/Tutorial.js')

exports.isTutorialOwner = (user, course) => {
    let isOwner = false
    if(user){
        if(user._id == course.owner._id){
            isOwner = true
        }
    }
   return isOwner
}


exports.isEnrolled = async (userId, courseId) => {
    let isEnrolled = false
    const tutorial = await Tutorial.findById(courseId)
    const enrolledUser = tutorial.usersEnrolled.find(x=> x == userId )

    if(enrolledUser){
        isEnrolled = true
    }
    return isEnrolled
}