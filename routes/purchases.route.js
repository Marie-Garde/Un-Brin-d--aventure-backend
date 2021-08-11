const express = require("express");
const router = express.Router();
const { db } = require("../conf.js");

// Display all purchase
router.get("/all", (req, res) => {
  db.query("SELECT * from achats", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Display all purchase for one client
router.get("/customer/:id", (req, res) => {
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

// get purchase by id
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * from achats WHERE id_achat=?",
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
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM achats WHERE id_achat=?",
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

// Post a new purchase for a client
router.post("/:id", (req, res) => {
  const { type, date, quantity, comment } = req.body;
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

module.exports = router;
