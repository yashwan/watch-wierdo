const express = require("express");
const route = require("./routes/v1/index")
const {errorHandler} = require("./middleware/error")
const logger = require("./middleware/logger")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(logger)
app.use('/v1', route)
app.use(errorHandler)
module.exports = app;