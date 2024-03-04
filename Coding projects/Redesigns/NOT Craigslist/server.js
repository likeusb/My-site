const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const bodyparser = require('body-parser');
const db = require("./db/pain");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/test", (req, res) => {
    res.status(200).json({ success: true })
})

app.get("/Listings", async (req, res) => {
    const Listings = await db.getAllListings();
    res.status(200).json({ Listings });
})

app.listen(1337, () => console.log("start"));

