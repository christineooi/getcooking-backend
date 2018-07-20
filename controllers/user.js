const pg = require('pg');
const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
client.connect();

function saveRecipe(req, res, next) {
    console.log("In user.saveRecipe");
    console.log("req.body",req.body);
    const queryObj = {
    text: "insert into recipes(recipe_image_url, recipe_title, recipe_source_url, recipe_publisher, user_id) VALUES ($1, $2, $3, $4, $5)", 
    values: [req.body.image, req.body.title, req.body.source, req.body.publisher, req.body.userid]
    }
    client.query(queryObj)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Inserted one recipe'
          });
      })
      .catch(function (err) {
        return next(err);
      });

}

function removeRecipe(req, res, next) {
    console.log("In user.removeRecipe");
}

module.exports = {
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe
};