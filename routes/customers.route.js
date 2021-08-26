const express = require("express");
const router = express.Router();
const { db } = require("../conf.js");

// Display all customers
router.get("/all", (req, res) => {
  db.query("SELECT * from customers", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// Display one customer with param id
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * from customers WHERE id_customer=?",
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

// Get a customer with optional parameters researchs
router.get(
  "/name/:name?/firstname/:firstname?/city/:city?/email/:email?",
  (req, res) => {
    let name = req.params.name || "";
    let firstname = req.params.firstname || "";
    let city = req.params.city || "";
    let email = req.params.email || "";

    db.query(
      "SELECT * from customers WHERE `name_customer` LIKE ? && `firstname_customer` LIKE ? && `city_customer` LIKE ? && `email_customer` LIKE ?",
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

// Post a new customer
router.post("/new", (req, res) => {
  const { name, firstname, birthdate, address, city, email, phone, comment } =
    req.body;
  db.query(
    "INSERT INTO customers(name_customer, firstname_customer, birthdate_customer, address_customer, city_customer, email_customer, phone_customer, comment_customer) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [name, firstname, birthdate, address, city, email, phone, comment],
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

// update an existing customer
router.put("/update", (req, res) => {
  const {
    id,
    name,
    firstname,
    birthdate,
    address,
    city,
    email,
    phone,
    comment,
  } = req.body;
  const formatedString = (str) => {
    return str.replace(/'/g, "''");
  };
  db.query(
    `UPDATE customers SET name_customer='${name}', firstname_customer='${firstname}', birthdate_customer='${birthdate}', address_customer='${formatedString(
      address
    )}', city_customer='${formatedString(
      city
    )}', email_customer='${email}', phone_customer='${phone}', comment_customer='${formatedString(
      comment
    )}'`,
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

// delete an existing customer
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE from customers WHERE id_customer=?",
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

module.exports = router;
