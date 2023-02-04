const Cube = require('../models/Cube.js')


exports.getHomePage = (req, res) => {
    if(req.user) {
        res.render('user-home')
    } else {
        res.render('guest-home')
    }
}


// exports.getHomePage = async (req,res) => {

//     res.render('home')
//     // //console.log(req.query) //express is doing this for us
//     // const {search, from, to } = req.query

//     // let cubes = await Cube.find().lean()

//     // if(search) {
//     //     cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase())) //this will filter all cubes, that include the search key word
        
//     // }

//     // if(from) {
//     //     cubes = cubes.filter(cube => cube.difficultyLevel >= from)
//     // }

    
//     // if(to) {
//     //     cubes = cubes.filter(cube => cube.difficultyLevel <= to)
//     // }
//     // //we do this in separate "if-s" and not with "if-else", because we do not know what the user will use - Only Name, Only from or Only to. 
//     // //This way it will works only with name, or only with from, or with name + from etc


//     // res.render('home', {cubes, search, from, to})
// }

exports.getAboutPage = (req,res) => {
    res.render('about')
}

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}