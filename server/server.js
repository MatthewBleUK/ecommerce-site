require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

const database = require("./database");

app.get("/api/products", (req, res) => {
    database.query("SELECT * FROM products", (error, results) => {
        if (error) {
            return res.status(500).json({ error: "An error occurred" });
        }

        res.json(results);
    });
});

app.get("/categories", (req, res) => {
    database.query("SELECT * FROM categories", (error, results) => {
        if (error) {
            return res.status(500).json({ error: "An error occurred" });
        }

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
