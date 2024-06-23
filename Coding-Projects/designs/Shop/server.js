const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/shop");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/products", async (req, res) => {
    const results = await db.createProduct(req.body);
    res.status(201).json(results);
});

app.get("/products", async (req, res) => {
    const products = await db.getProducts();
    res.status(200).json({ products });
});

app.patch("/products/:id", async (req, res) => {
    const id = await db.updateProduct(req.params.id, req.body);
    res.status(200).json({ id });
});

app.delete("/products/:id", async (req, res) => {
    await db.deleteProduct(req.params.id);
    res.status(200).json({ success: true });
});

app.listen(1337, () => console.log("Server is running on port 1337"));