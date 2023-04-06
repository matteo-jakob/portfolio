const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(express.static("../client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// =================== Routing ===================
app.get("/", (req, res) => {
  res.render("index.html");
});

// ===================== Port =====================
app.listen(port, function () {
  console.log("Started on port " + port);
});
