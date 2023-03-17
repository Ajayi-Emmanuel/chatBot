const botroute = require("express").Router();

botroute.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})




module.exports = botroute 