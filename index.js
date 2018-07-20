const express = require('express');
const app = express();
var cors = require('cors');

const loginlogout = require("./controllers/loginlogout");
const register = require("./controllers/register");
const user = require("./controllers/user");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const passport = require('passport');
require('./controllers/passport')(passport);  
app.use(passport.initialize());  

app.post('/login', loginlogout.loginUser);
app.get('/logout', loginlogout.logoutUser);
app.post('/register', register.registerUser);

app.post('/saverecipe', passport.authenticate('jwt', { session: false }), user.saveRecipe);
app.post('/getuserrecipes', passport.authenticate('jwt', { session: false }), user.getUserRecipes);
app.delete('/removerecipe', passport.authenticate('jwt', { session: false }), user.removeRecipe);

app.get('/test', (req, res) => res.send('<h1><marquee>Welcome to Get Cooking!</marquee></h1>'));

app.listen(port, function() {
    console.log("Listening on " + port);
});