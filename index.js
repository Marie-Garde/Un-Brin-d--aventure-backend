const { port } = require("./conf.js");
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db-config");

app.use(cors());
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Un brin d'Aventure backend !");
});

app.use("/api/customers", require("./routes/customers.route"));
app.use("/api/purchases", require("./routes/purchases.route"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
