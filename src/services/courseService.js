const Course = require('../models/Course')

exports.getOneCourse = (courseId) => Course.findById(courseId)
exports.getAllCourses  = () => Course.find()
exports.getAllCoursesAscending = () => Course.find({}).sort({createdAt: 1})
exports.getAllCoursesByLikes = () => Course.find({}).sort({usersEnrolled: -1})
exports.update = (courseId, data) => Course.findByIdAndUpdate(courseId, data, {runValidators: true})
exports.deleteCourse = (courseId) => Course.findByIdAndDelete(courseId, {runValidators: true})
exports.getSearchedbyType = (item) => {
const regex = new RegExp(item, 'i') // i for case insensitive
return Course.find({title: {$regex: regex}})
}
exports.createNewCourse = (data) => Course.create(data)
