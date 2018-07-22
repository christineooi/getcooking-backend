const pg = require('pg');
const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
client.connect();

function saveRecipe(req, res, next) {
    const queryObj = {
    text: "insert into recipes(image_url, title, source_url, publisher, user_id) VALUES ($1, $2, $3, $4, $5)", 
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
        return (err);
      });

}

function getUserRecipes(req, res, next) {
    let userid =req.body.userid;
    let selectQuery = 'select * from recipes where user_id = $1';

    client.query(selectQuery, [userid])
    .then(function (data) {
      console.log(data);
      if (!data.rows) return res.status(404).json('No user recipes found.');
      res.send(data);
    })
    .catch(function (err) {
        return (err);
    });

}


function removeRecipe(req, res, next) {
    
    var recipeId = parseInt(req.params.recipeId);
    client.query('delete from recipes where recipe_id = $1', [recipeId])
    .then(function (result) {
    
    res.status(200)
        .json({
        status: 'success',
        message: `Deleted ${result.rowCount} recipe`
        });
    
    })
    .catch(function (err) {
    return next(err);
    });
      
    
}

module.exports = {
    saveRecipe: saveRecipe,
    getUserRecipes: getUserRecipes,
    removeRecipe: removeRecipe
};