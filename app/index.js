const express = require("express");
const connectDb = require("./common/connectDb");
const app = express();
const { PORT, ACCESS_TOKEN } = require("./common/config");
const router = require("./router/index.router");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

connectDb();


app.get("/test-paypal", (req, res) => {
  res.sendFile(__dirname + "/services/Paypal.Services.html");
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
