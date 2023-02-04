exports.generateDiffcultyLevel = function (currentLevel){ //prepare view data
    const difficultyLevels = [
        {
            key: 1,
            label: "Very easy",
            selected: false
        },
        {
            key: 2,
            label: "Easy",
            selected: false
        },
        {
            key: 3,
            label: "Medium (Standard 3x3)",
            selected: false
        },
        {
            key: 4,
            label: "Intermediate",
            selected: false
        },
        {
            key: 5,
            label: "Expert",
            selected: false
        },
        {
            key: 6,
            label: "Hardcore",
            selected: false
        }
    ]

    const result = difficultyLevels.map(x => x.key == currentLevel ? {...x, selected: true} : x)
    return result
}

exports.isCubeOwner = (user, cube) => {
    let isOwner = false
    if(user){
        if(user._id == cube.owner._id){
            isOwner = true
        }
    }
   return isOwner
}