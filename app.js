const express = require("express");
const { connectToDb } = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// connectToDb();

app.use(express.urlencoded({extended: true}))

//routes
// const shortRoute = require("./routes/short")

app.use(express.json())
app.set('view engine', 'ejs')
// app.use('/', shortRoute)


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});