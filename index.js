const { db, port } = require("./conf.js");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
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

////////////////////////////
/////// CLIENT TABLE ///////
////////////////////////////

// Display all clients
app.get("/api/client", (req, res) => {
  db.query("SELECT * from clients", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// Display one client with param id
app.get("/api/client/:id", (req, res) => {
  db.query(
    "SELECT * from clients WHERE id_client=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Get a client with optional parameters researchs
app.get(
  "/api/client/name/:name?/firstname/:firstname?/city/:city?/email/:email?",
  (req, res) => {
    let name = req.params.name || "";
    let firstname = req.params.firstname || "";
    let city = req.params.city || "";
    let email = req.params.email || "";

    db.query(
      "SELECT * from clients WHERE `name_client` LIKE ? && `firstname_client` LIKE ? && `city_client` LIKE ? && `email_client` LIKE ?",
      [
        "%" + name + "%",
        "%" + firstname + "%",
        "%" + city + "%",
        "%" + email + "%",
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving data");
        } else {
          res.status(200).json(results);
        }
      }
    );
  }
);

// Post a new client
app.post("/api/client", (req, res) => {
  const { name, firstname, birthdate, address, city, email, phone, comment } =
    req.body;
  db.query(
    "INSERT INTO clients(name_client, firstname_client, birthdate_client, address_client, city_client, email_client, phone_clients, comment_client) VALUES(?, ?, ?, ?, ?, ?, ?)",
    [name, firstname, birthdate, address, city, email, phone, comment],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        res.status(201).send("Successfully saved");
      }
    }
  );
});

////////////////////////////
////// PURCHASE TABLE //////
////////////////////////////

// Display all purchase
app.get("/achats", (req, res) => {
  db.query("SELECT * from achats", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Display all purchase for one client
app.get("/api/client/:id/achats", (req, res) => {
  db.query(
    "SELECT * from achats WHERE client_id_client=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Delete a purchase for a client
app.delete("/api/client/achats/:id_purchase", (req, res) => {
  db.query(
    "DELETE FROM achats WHERE id_achat=?",
    [req.params.id_purchase],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        console.log("deleted");
        res.status(200).json(results);
      }
    }
  );
});

// Post a new purchase for a client
app.post("/api/client/:id/achats", (req, res) => {
  const { type, date, quantity, comment } = req.body;
  console.log(req.body);
  db.query(
    "INSERT INTO achats(type_achat, date_achat, quantity_achat, comment_achat, client_id_client) VALUES(?, ?, ?, ?, ?)",
    [type, date, quantity, comment, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        res.status(201).send("Successfully saved");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
