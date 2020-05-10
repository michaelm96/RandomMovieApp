const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/generateToken')
const generator = require('generate-password');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const { first_name, last_name, email, password } = req.body

        User.create({
            first_name,
            last_name,
            email,
            password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        const error = { status: 400, message: 'Invalid email/password' }

        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw error
                } else {
                    const access_token = generateToken(user)
                    req.headers = access_token
                    res.status(201).json({ access_token })
                }
            })
            .catch(err => {
                next({ name: err.message })
            })
    }

    static googleLogin(req, res, next) {
        const { idToken } = req.body
        let randomPassword = generator.generate({
            length: 10,
            numbers: true
        });
        let thisEmail;
        let first_name;
        let last_name;
        client.verifyIdToken({
            idToken,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                thisEmail = payload['email'];
                first_name = payload['given_name']
                last_name = payload['family_name']
                const userid = payload['sub'];
                // console.log(payload);

                return User.findOne({
                    where: { email: thisEmail }
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        first_name,
                        last_name,
                        email: thisEmail,
                        password: randomPassword,
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = generateToken(user)
                req.headers = access_token
                res.status(201).json({ access_token })
            })
            .catch(err => {
                next({ name: err.message })
            })
    }
}

module.exports = UserController