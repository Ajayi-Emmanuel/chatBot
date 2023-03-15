const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");

const app = express();
const PORT = process.env.PORT;


const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

//routes
// const botRoute = require("./routes/bot") 

app.use(express.json())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }));
// app.set('view engine', 'ejs')
// app.use('/bot', botRoute)

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));



const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);


  socket.on("message", (data) => {
    // console.log(data)
    // if(data.message === '1') return
    socket.broadcast.emit('chat-message', data)
  });
}) ;
