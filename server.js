const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
   useNewUrlParser: true,
   useFindAndModify: false 
});

//check if db connection exists
mongoose.connection.once("open", () => {
  console.log("Database connection established");
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// // If deployed, use the deployed databse. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb: //localhost/mongoHeadlines"

// // Connect to the Mongo DB
// mongoose.connect(MONGODB_URI);