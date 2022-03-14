var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        // required: true
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    }
})

userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password'))
        return next()

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)