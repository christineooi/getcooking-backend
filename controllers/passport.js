var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
let config = null;
config = process.env.NODE_ENV !== 'production' ? (require('../config')) : null;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  client.connect(); 
  console.log("In passport") 
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET || config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {  
    console.log("JWT Payload",jwt_payload);  
    let selectQuery = 'select * from users where user_id = $1'
    client.query(selectQuery, [jwt_payload.id], function(err, user) {
      console.log(user.rows);
      if (err) {
        return done(err, false);
      }
      if (user) {
        console.log("Inside passport:",user);
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};