const botroute = require("express").Router();

botroute.get('/', (req, res) => {
    res.render("index.ejs")
})
botroute.post('/message', (req, res) => {
    const {message} = req.body;
    console.log(message)
})


module.exports = botroute 