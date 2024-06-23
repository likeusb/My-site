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