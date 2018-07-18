const pg = require('pg');
const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
client.connect();

function saveRecipe(req, res, next) {
    console.log("In user.saveRecipe");
}

function deleteRecipe(req, res, next) {
    console.log("In user.deleteRecipe");
}

module.exports = {
    saveRecipe: saveRecipe,
    deleteRecipe: deleteRecipe
};