const knex = require("./knex");

function createListing(listing) {
    return knex("Listings").insert(listing);
};

function getAllListings() {
    return knex("Listings").select("*")
};

function deleteListing(id) {
    return knex("Listings").where("id", id).del();
};

function updateListing(id, listing) {
    return knex("Listings").where("id", id).update(listing)
}

module.exports = {
    createListing,
    getAllListings,
    deleteListing,
    updateListing
}

