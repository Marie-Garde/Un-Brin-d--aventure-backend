const express = require("express");
const router = express.Router();
const { db } = require("../conf.js");

// Display all purchase
router.get("/all", (req, res) => {
  db.query("SELECT * from purchase", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Display all purchase for one customer
router.get("/customer/:id", (req, res) => {
  db.query(
    "SELECT * from purchase WHERE customer_id_customer=?",
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
    "SELECT * from purchase WHERE id_purchase=?",
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

// Delete all purchases for a customer
router.delete("/all/:id", (req, res) => {
  console.log(req)
  db.query(
    "DELETE FROM purchase WHERE customer_id_customer=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Delete one purchase for a customer
router.delete("/:id", (req, res) => {
  console.log(req)
  db.query(
    "DELETE FROM purchase WHERE id_purchase=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Post a new purchase for a customer
router.post("/:id", (req, res) => {
  const { type, date, quantity, comment } = req.body;
  db.query(
    "INSERT INTO purchase(date_purchase, type_purchase, quantity_purchase, comment_purchase, customer_id_customer) VALUES(?, ?, ?, ?, ?)",
    [date, type, quantity, comment, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error posting data");
      } else {
        res.status(201).send("Successfully saved");
      }
    }
  );
});

module.exports = router;
