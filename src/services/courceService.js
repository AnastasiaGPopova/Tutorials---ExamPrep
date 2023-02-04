const Tutorial = require('../models/Tutorial')

exports.getOneCourse = (couseId) => Tutorial.findById(couseId)
exports.update = (courseId, data) => Tutorial.findByIdAndUpdate(courseId, data, {runValidators: true})
exports.deleteCourse = (courseId) => Tutorial.findByIdAndDelete(courseId, {runValidators: true})
exports.isEnrolled = async (userId, courseId) => {
    let isEnrolled = false
    const tutorial = await Tutorial.findById(courseId)
   const enrolledUser =  tutorial.usersEnrolled.find(x => x == userId )
    if(enrolledUser){
        isEnrolled = true
    }
}