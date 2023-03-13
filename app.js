const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;



app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

//routes
const botRoute = require("./routes/bot") 

app.use(express.json())
app.set('view engine', 'ejs')
app.use('/bot', botRoute)


const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});