const axios = require ('axios')

class MovieController{
    static readPopular(req,res,next){
        let randomPage = Math.ceil(Math.random() * 500);
        axios({
            method:'GET',
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${randomPage}`
        })
        .then(result => {
            // res.status(200).json(result.data)
            if (!result) {
                next({ name: 'Data not found' })
            } else {
                res.status(200).json(result.data)
            }
        })
        .catch(err => {
            next({name: err.message})
        })
    }
    static readById(req,res,next){
        const { string,page } = req.params
        axios({
            method:'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${string}&page=${page}&include_adult=false`
        })
        .then(result => {
            // res.status(200).json(result.data)
            if (!result) {
                next({ name: 'Data not found' })
            } else {
                res.status(200).json(result.data)
            }
        })
        .catch(err => {
            next({name: err.message})
        })
    }
}

module.exports = MovieController