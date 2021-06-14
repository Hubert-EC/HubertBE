const express = require("express");
const connectDb = require("./common/connectDb");
const app = express();
//const { PORT} = require("./common/config");
const router = require("./router/index.router");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

connectDb();

app.use("/", (req, res) => res.send("Hubert"));

app.get('/', (req, res) => {
  res.send("Hubert");
});

app.get("/test-paypal", (req, res) => {
  res.sendFile(__dirname + "/services/Paypal.Services.html");
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listen on port ${port}`));
