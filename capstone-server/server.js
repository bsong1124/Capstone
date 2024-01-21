require("dotenv").config();
require("./config/db.connection.js");
const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const coinsRouter = require('./routes/coins.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(cors());
app.use(morgan("dev"));

// requests
app.use('/coins', coinsRouter)

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));