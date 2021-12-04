'use strict';

// For loading environment variables.
require('dotenv').config();

const expressSession = require('express-session');  // for managing session state

const express = require('express');
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const { MongoClient } = require('mongodb');
const app = express();
app.use(require('body-parser').urlencoded());
const minicrypt = require('./miniCrypt');

const mc = new minicrypt();


const port = process.env.PORT || 8080;

let secrets;
let url;
if (!process.env.URL) {
  secrets = require('./secrets.json');
  url = secrets.url;
} else {
	url = process.env.URL;
}

const client = new MongoClient(url);

app.use(express.static('public'));

const session = {
  secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
  saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
  async (username, password, done) => {
  if (!findUser(username)) {
      // no such user
      return done(null, false, { 'message' : 'Wrong username' });
  }
  if (!validatePassword(username, password)) {
      // invalid password
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, { 'message' : 'Wrong password' });
  }
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, username);
});


// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

app.use(express.static('public'));
app.use(express.json()); // lets you handle JSON input
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

let users = {};

// Returns true iff the user exists.
function findUser(arr, name) {
  let b = false;
  arr.forEach((e) => {
    if (e.username === name) {
      b = true;
    }
  });
  return b;
}

// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
function validatePassword(name, pwd) {
  if (!findUser(name)) {
    return false;
  }
  if (!mc.check(pwd, users[name][0], users[name][1])) {
    return false;
  }
  return true;
}

// Add a user to the "database".
// Return true if added, false otherwise (because it was already there).
// TODO
async function addUser(name, pwd) {
    await client.connect();
    const uDine = client.db('UDine'); // if this creates delete
    const logins = uDine.collection('logins');
    const arr = await logins.find().toArray();
    // chceks if user is in 

    if(!findUser(arr, name)){
      const [salt, hash] = mc.hash(pwd);

      await logins.insertOne({
        username: name,
        password: [salt, hash],
        favorites: []
      }); return true;
    } else { 
      return false;
    }
}

app.post('/register',
   async (req, res) => {
    const {username, password, favorites} = req.body;
    if (await addUser(username, password)) {
      res.redirect('/login');
    }else{
      res.redirect('/register');
    }
});
// Routes

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
  // If we are authenticated, run the next route.
    next();
  } else {
  // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

// Handle post data from the login.html form.
app.post('/login',
 passport.authenticate('local' , {     // use username/password authentication
     'successRedirect' : '/profile',   // when we login, go to /private 
     'failureRedirect' : '/login'      // otherwise, back to login
 }));

// Handle the URL /login (just output the login.html file).
app.get('/login',
  (req, res) => res.sendFile('/public/login.html',
      { 'root' : __dirname }));

// Register URL
app.get('/register',
  (req, res) => res.sendFile('/public/register.html',
         { 'root' : __dirname }));

// Private data
app.get('/profile',
// IF we are logged in...
// TODO
// Go to the user's page ('/private/' + req.user)
  (req, res) => {
    checkLoggedIn(req, res, () => res.redirect('/profile/' + req.user));
});

// A dummy page for the user.
app.get('/profile/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.writeHead(200, {"Content-Type" : "text/html"});
      res.write('<H1>HELLO ' + req.params.userID + "</H1>");
      res.write('<br/><a href="/index.html">click here to go back to the search page</a>');
      res.end();
    } else {
      res.redirect('/profile/');
    }
});

async function searcher(str, halal, veg, wGrain) {
  await client.connect();
  const uDine = client.db('UDine');
  const foods = uDine.collection('food');
  const obj = await foods.find({
    'name': {$regex: str},
    "halal": {'$in': halal},
    "vegetarian": {'$in': veg},
    "whole-grain": {'$in': wGrain}
  }).toArray();
  return obj;
}

app.post('/search', async (req, res) => {
    let str = req.body.keyword;
    let halal = req.body.halal;
    let veg = req.body.vegetarian;
    let wGrain = req.body.wholeGrain;
    if(halal) {
      halal = ['Yes'];
    } else {
      halal = ['No', 'Yes'];
    }
    if (veg) {
      veg = ['Yes']; 
    } else {
      veg = ['No', 'Yes'];
    }
    if (wGrain) {
      wGrain = ['Yes'];
    } else {
      wGrain = ['No', 'Yes'];
    }
    res.end(JSON.stringify(await searcher(str, halal, veg, wGrain)));
});

app.get('/unique/view', async (req, res) => {
  // returns all food 
  try {
    await client.connect();
    const uDine = await client.db('UDine'); // if this creates delete
    const foods = await uDine.collection('food');
    console.log(foods);
    let d8 = "11/23/2021"; // hardcoded for now
    console.log(await foods.find({date: d8}));
    res.end(JSON.stringify( await foods.find({date: d8}))); // if not .toArray()  
  } catch (err) {
    console.log('unique error');
    return;
  }
});

app.get('/user/favorites/view/:key', checkLoggedIn, async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key; // how would i change this to express
  const result = await logins.findOne(
    {username: user}
  ); const arr = result.favorites;
  const fav = document.getElementById('adding').value;
  res.end(JSON.stringify(await logins.updateOne(
    {username: user},
    {favorites: arr.push(fav)}
  ))); // should be pushing it to this arrray
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add/:key', checkLoggedIn, async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key;
  const fav = (await logins.findOne(
    {username: user}
  )).favorites;
  res.end(JSON.stringify(fav)); 
});

// should work 100% :)
app.delete('/user/delete/:key', checkLoggedIn, async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key;
  logins.removeOne(
    {username: user}
  );
  res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
