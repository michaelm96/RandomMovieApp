const { Favorite } = require('../models')

class FavoriteController {
    static readFavorite(req, res, next) {
        const UserId = req.userData.id
        Favorite.findAll({
            where: { UserId }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err);
            })
    }


    static createFavorite(req, res, next) {
        const { movieId, imageUrl, status, description, title, released_date } = req.body
        const UserId = req.userData.id
        Favorite.create({
            movieId,
            imageUrl,
            status,
            UserId,
            description,
            released_date,
            title
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err);
            })
    }
    static readFavoriteStatus(req, res, next) {
        const UserId = req.userData.id
        const { status }= req.params
        Favorite.findAll({
            where: { UserId, status },
            order: [["movieId", "ASC"]]
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err);
            })
    }
    static updateFavoriteStatus(req, res, next) {
        const { id } = req.params
        const { status } = req.body
        Favorite.update({
            status: status
        }, {
            where: { id },
            order: [['movieId', "ASC"]]
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static deleteFavorite(req, res, next) {
        const { id } = req.params

        Favorite.destroy({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json({ message: 'data succesfully deleted' })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = FavoriteController