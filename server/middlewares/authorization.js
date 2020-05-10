const { Favorite } = require('../models')

const authorization = (req,res,next) => {
    const { id } = req.params
    
    Favorite.findByPk(id)
    .then(movie =>{
        if(!movie){
            next({name: 'Movie not found'})
        }else if(movie.UserId !== req.userData.id){
            next({name : 'Forbidden Access'})
        }else{
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization