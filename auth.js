var bcrypt = require('bcrypt-nodejs')
const express = require('express')
var jwt = require('jwt-simple')
var User = require('./models/user')
var router = express.Router()

router.post('/register', async (req, res) => {
    try {
        let userData = req.body
        let user = new User(userData)
        let data = await user.save()
        console.log(data)
        res.status(200).send({
            message: "Registration successfull"
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        let userData = req.body
        let user = await User.findOne({
            email: userData.email
        })
        if (!user) {
            res.sendStatus(401).send({
                message: 'email or password invalid'
            })
        }

        bcrypt.compare(userData.password, user.password, (err, isMatch) => {
            if (!isMatch) {
                res.sendStatus(401).send({
                    message: 'Invalid Credentials'
                })
            }
            console.log('user logged in')
            let payload = {
                sub: user._id
            }
            let token = jwt.encode(payload, '12345')
            res.status(200).send({
                token
            })
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router