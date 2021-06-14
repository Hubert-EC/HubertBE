require("dotenv").config();
const express = require("express");
const connectDb = require("./app/common/connectDb");
const app = express();
const { PORT} = require("./app/common/config");
const router = require("./app/router/index.router");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

connectDb();

app.get('/', (req, res) => {
  res.send("Hubert");
});

app.get("/test-paypal", (req, res) => {
  res.sendFile(__dirname + "/app/services/Paypal.Services.html");
});

app.listen(PORT || 8080, () => console.log(`Listen on port ${8080}`));
