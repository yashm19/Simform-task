var express = require("express")
var app = express();
var cors = require("cors")
var bodyParser = require('body-parser')

var auth = require('./auth')

// connection to remote db
require('./db/connection')
var User = require('./models/user')


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log("web browser opened")
    res.send("welcome")
})

//get all users
app.get('/users', async (req, res) => {
    try {
        let users = await User.find({}, '-password -__v')
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

//get all users
app.get('/profile/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        let user = await User.findById(req.params.id, '-password -__v')
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

app.use('/auth', auth)
app.listen(3000)