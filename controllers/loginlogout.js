const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let config = null;
config = process.env.NODE_ENV !== 'production' ? (require('../config')) : null;

client.connect();

function loginUser(req, res, next) {
    let email =req.body.email;
    let password = req.body.password;
    console.log(email,password);
    let selectQuery = 'select * from users where email = $1';

    client.query(selectQuery, [email])
    .then(function (data) {
      console.log(data.rows);
      if (!data.rows) return res.status(404).json('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, data.rows[0].password);
      console.log(passwordIsValid)
      if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });
      const user ={
        userid: data.rows[0].user_id,
        firstname: data.rows[0].first_name,
        lastname:data.rows[0].last_name,
        email:data.rows[0].email
      }

      var token = jwt.sign({ id: data.rows[0].user_id }, process.env.PASSPORT_SECRET || config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ auth: true, token: token ,user:user});
    })
  .catch(function (err) {
    return next(err);
  });
}

function logoutUser(req, res, next) {
    res.status(200).json({ auth: false, token: null });
  }
  
  module.exports = {
      loginUser: loginUser,
      logoutUser: logoutUser
  }