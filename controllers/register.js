const pg = require('pg');
const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
client.connect();

function registerUser(req, res, next) {
    
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const insertUserQueryObj=  {
          text: 'insert into users(first_name, last_name, email, password) values ($1, $2, $3, $4)',
          values: [req.body.firstname, req.body.lastname, req.body.email, hash]
        }
        client.query(insertUserQueryObj)
          .then(function () {
            res.status(200)
              .json({
                status: 'success',
                message: 'Registered a User'
              });
          })
          .catch(function (err) {
            return next(err);
          });
    });
  }

  module.exports = {
    registerUser: registerUser
};

