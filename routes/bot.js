const botroute = require("express").Router();

botroute.get('/', (req, res) => {
    res.render("index.html")
})




module.exports = botroute 