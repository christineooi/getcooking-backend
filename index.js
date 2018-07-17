const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'getcookingdb';
const client = new pg.Client(connectionString);
client.connect();

function getCategories(req, res, next) {
    console.log(process.env.DATABASE_URL);
      console.log("inside getCategories");
      client.query('select * from categories')
        .then(function (data) {
          console.log(data);
          res.status(200)
            .json({
              status: 'success',
              data: data.rows,
              message: 'Retrieved ALL categories'
            });
        })
        .catch(function (err) {
          return next(err);
        });
    }

const port = process.env.PORT || 3000;

app.get('/categories', getCategories);

app.get('/test', (req, res) => res.send('<h1><marquee>Welcome to Get Cooking!</marquee></h1>'));

app.listen(port, function() {
    console.log("Listening on " + port);
});