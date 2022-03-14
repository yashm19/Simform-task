var express = require("express")
var app = express();
var cors = require("cors")
var bodyParser = require('body-parser')
var auth = require('./auth')
// connection to remote db
require('./db/connection')
var User = require('./models/user');
app.use(cors())
app.use(bodyParser.json())

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

//get one user
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

//edit one user
app.put('/profile/:id', async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) {
            res.sendStatus(500)
        } else {
            // console.log(user)
            user.password = req.body.password;
            user.save(function (err, user) {
                if (err) {
                    res.send("Error: ", err);
                } else {
                    res.send("password updated successfully!");
                }
            })
        }
    });
})

app.use('/auth', auth)
app.listen(3000)