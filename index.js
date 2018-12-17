const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/mydb";
const mongoDB = process.env.MONGODB_URI || url;
const db = mongoose.connection;
const port = process.env.PORT || 8000;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
	console.log('Express server listening on port ' + port);
})

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.use("/", routes);
