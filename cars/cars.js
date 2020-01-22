const express = require("express");
const knex = require("knex");

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3",
    },
    useNullAsDefault: true,
};

const db = knex(knexConfiguration);

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get the Cars"});
        });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    db("cars")
    .where("id", "=", id)
    .first()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to get the Car" });
    });
});

router.post("/", (req, res) =>{
    // const carData = req.body;
    const carData = {id: 1, make:'test', model: 'test', mileage:5000, transmission: 'test', title: 'test'}
    db("cars")
    .insert(carData)
    .then(ids => {
        db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
            res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
        console.log("POST error", err);
        res.status(500).json({ message: "Failed to store data "});
    });
});

module.exports = router;