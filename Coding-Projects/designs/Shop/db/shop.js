const knex = require("./knex");

function createProduct(product) {
    return knex("products").insert(product);
}

function getProducts() {
    return knex("products").select("*");
}

function deleteProduct(id) {
    return knex("products").where("id", id).delete();
}

function updateProduct(id, product) {
    return knex("products").where("id", id).update(product);
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
};

function getProductsCount() {
    return knex('products').count({ count: '*' }).then(rows => rows[0].count);
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductsCount // Add this line to export the new function
};