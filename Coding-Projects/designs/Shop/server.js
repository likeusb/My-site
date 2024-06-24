const express = require("express");
const app = express();
const db = require("./db/shop");
const port = 1337;
const { getProductsCount } = require('./db/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/products/count', async (req, res) => {
    try {
        const count = await getProductsCount(); // Use the imported function directly
        res.json({ count });
    } catch (error) {
        console.error('Error fetching products count:', error);
        res.status(500).json({ error: "Failed to fetch product count" });
    }
});

app.post("/products", async (req, res) => {
    const results = await db.createProduct(req.body);
    res.status(201).json(results);
});

app.get("/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const offset = (page - 1) * limit;

    try {
        const products = await db.getProducts(limit, offset);
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.patch("/products/:id", async (req, res) => {
    const id = await db.updateProduct(req.params.id, req.body);
    res.status(200).json({ id });
});

app.delete("/products/:id", async (req, res) => {
    await db.deleteProduct(req.params.id);
    res.status(200).json({ success: true });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));