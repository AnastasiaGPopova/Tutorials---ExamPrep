const Cube = require('../models/Cube.js')
const Accessory = require('../models/Accessory.js')
const cubeService = require('../services/cubeService.js')
const cubeUtils = require('../utils/cubeUtils.js')



exports.getCubCreation = (req,res) => {
    res.render('create')
}

exports.postCreateCube = async (req, res) => {

    const { name, description, imageUrl , difficultyLevel } = req.body
    let cube = new Cube({name, description, imageUrl , difficultyLevel, owner: req.user._id} )//encoded body-to, which we receive, will create a new cube
    //save cube


    await cube.save()
    //redirect
    res.redirect('/')
}

exports.getDetails = async (req, res) => {

    let currentCube = await Cube.findById(req.params.cubeId)
                                .populate('accessories') //it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                .populate('owner')
                                .lean()

    if(!currentCube){
        return res.redirect('/404')
    }

    let isOwner = false
    let isLogged = false

    if(req.user){
      isLogged = true
      if(currentCube.owner._id == req.user._id){
        isOwner = true
      }
    } 

    res.render('cube/details', {currentCube, isOwner, isLogged})

}

exports.getAttachAccessory = async (req,res) => {
    const cube = await Cube.findById(req.params.cubeId).lean()
    const accessories = await Accessory.find({_id: {$nin: cube.accessories}}).lean()
    res.render('cube/attach', {cube, accessories})
}

exports.postAttachedAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId) //its NOT lean, its a document
    const accessoryId = req.body.accessory //accessory ID

    cube.accessories.push(accessoryId)


   await cube.save()
    res.redirect(`/cubes/${cube._id}/details`)

}

exports.getEditCubePage = async (req, res) => {
    const cube = await cubeService.getOneCube(req.params.cubeId).lean()
    const diffcultyLevels = cubeUtils.generateDiffcultyLevel(cube.difficultyLevel)

    if(!cubeUtils.isCubeOwner(req.user, cube)){
        res.redirect('/404')
    }


    res.render('cube/edit', {cube, diffcultyLevels})

}

exports.getDeletedCubePage = async (req, res) => {
    const cube = await cubeService.getOneCube(req.params.cubeId).lean()
    const diffcultyLevels = cubeUtils.generateDiffcultyLevel(cube.difficultyLevel)

    res.render('cube/delete', {cube, diffcultyLevels})

}

exports.postEditedCube = async (req,res) => {

    const { name, description, imageUrl , difficultyLevel } = req.body
    await cubeService.update(req.params.cubeId, { name, description, imageUrl , difficultyLevel })

    res.redirect(`/cubes/${req.params.cubeId}/details`)

}

exports.postDeleteCube = async (req, res) => {
   await cubeService.deleteCube(req.params.cubeId)
   res.redirect('/')
}