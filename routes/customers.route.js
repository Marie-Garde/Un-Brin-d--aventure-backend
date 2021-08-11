const express = require("express");
const router = express.Router();
const { db } = require("../conf.js");

// Display all clients
router.get("/all", (req, res) => {
  db.query("SELECT * from clients", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// Display one client with param id
router.get("/:id", (req, res) => {
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
router.get(
  "/name/:name?/firstname/:firstname?/city/:city?/email/:email?",
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
router.post("/new", (req, res) => {
  const { name, firstname, birthdate, address, city, email, phone, comment } =
    req.body;
  db.query(
    "INSERT INTO clients(name_client, firstname_client, birthdate_client, address_client, city_client, email_client, phone_client, comment_client) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
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

module.exports = router;
