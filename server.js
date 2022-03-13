var express = require("express")
var app = express();

app.get('/',(req,res)=>{
    console.log("web browser opened")
    res.send("welcome")
})

app.listen(3000)