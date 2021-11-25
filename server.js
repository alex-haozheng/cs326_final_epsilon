'use strict';

const expressSession = require('express-session');  // for managing session state

const express = require('express');
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const { MongoClient } = require('mongodb');
const app = express();


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

const port = process.env.PORT || 8080;

const url = "mongodb+srv://alex:2HKRCoy6TImzUamS@menu.yeoac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const foods = await uDine.collection('food');
  const str = document.getElementById('mySearch').value;
  const halal = document.getElementById('halal').checked;
  const veg = document.getElementById('vegetarian').checked; 
  const wGrain = document.getElementById('wholeGrain').checked;
    // dont set if not true thus comparing boolean during search
  if(halal) {
    halal = 'Yes';
  }
  if (veg) {
    veg = 'Yes'; 
  }
  if (wGrain) {
    wGrain = 'Yes';
  }
  res.end(JSON.stringify(await foods.find({
      $and: [
        {$contains: {'name': str}},
        {'halal': halal},
        {'vegetarian': veg},
        {'whole-grain': wGrain}
      ]
    })
  ));
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', async (req, res) => {
  // send in {"username": "user1", "password": "pass1"}
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    const data = JSON.parse(body);
    await logins.insertOne(data);
  }); res.end();
});

app.get('/unique/view', async (req, res) => {
  // returns all food 
  console.log("BIE");
  try {
    await client.connect();
    const uDine = await client.db('UDine'); // if this creates delete
    const foods = await uDine.collection('food');
  
    let d8 = "11/23/2021"; // hardcoded for now
    console.log(await foods.find({date: d8}));
    res.end(JSON.stringify( await foods.find({date: d8}))); // if not .toArray()  
  } catch (err) {
    console.log('unique error');
    return;
  }
});

app.get('/user/favorites/view/:key', async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key; // how would i change this to express
  const result = await logins.findOne(
    {username: user}
  ); const arr = result.favorites;
  const fav = document.getElementById('adding').value;
  res.end(JSON.stringify(await logins.update(
    {username: user},
    {favorites: arr.push(fav)}
  ))); // should be pushing it to this arrray
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add/:key', async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key;
  const fav = (await logins.findOne(
    {username: user}
  )).favorites;
  res.end(JSON.stringify(fav)); 
});

// should work 100% :)
app.delete('/user/delete/:key', async (req, res) => {
  const uDine = await client.db('UDine'); // if this creates delete
  const logins = await uDine.collection('logins');
  const user = req.params.key;
  logins.remove(
    {username: user},
    {justOne: True}
  );
  res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
