var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://yash2:dJzRTVJM1fuHiiEP@cluster0.qask7.mongodb.net/UserDB?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("Connected to mongo db")
    }
})