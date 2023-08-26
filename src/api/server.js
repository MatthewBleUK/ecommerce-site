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

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;

    database.query(
        "SELECT * FROM products WHERE uri = ? LIMIT 1",
        [productId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: "An error occurred" });
            }

            res.json(results);
        }
    );
});

// Returns 3 products from that category
app.get("/api/products/related/:id", (req, res) => {
    const category = req.params.id;

    database.query(
        "SELECT * FROM products WHERE category = ? LIMIT 4;",
        [category],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: "An error occurred" });
            }

            res.json(results);
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
