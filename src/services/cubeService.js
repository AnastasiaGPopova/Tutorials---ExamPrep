const Cube = require('../models/Cube')


exports.getOneCube = (cubId) => Cube.findById(cubId)
exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data, {runValidators: true})
exports.deleteCube = (cubeId) => Cube.findByIdAndDelete(cubeId, {runValidators: true})