'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
const expressSession = require('express-session');  // for managing session state

const express = require('express');
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const port = 8080;
// import express from 'express';
const app = express();
app.use(require('body-parser').urlencoded());

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
let users = {};

// Returns true iff the user exists.
function findUser(username) {
  if (!users[username]) {
    return false;
  } else {
    return true;
  }
}

// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
function validatePassword(name, pwd) {
  if (!findUser(name)) {
    return false;
  }
  if (users[name] !== pwd) {
    return false;
  }
  return true;
}

// Add a user to the "database".
// Return true if added, false otherwise (because it was already there).
// TODO
function addUser(name, pwd) {
  // TODO
  if(!findUser(name)){
    users[name] = pwd;
    return true;
  }else{
    return false;
  } 
}

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

app.get('/',
  checkLoggedIn,
  (req, res) => {
    res.send("hello world");
});

// Handle post data from the login.html form.
app.post('/login',
 passport.authenticate('local' , {     // use username/password authentication
     'successRedirect' : '/private',   // when we login, go to /private 
     'failureRedirect' : '/login'      // otherwise, back to login
 }));

// Handle the URL /login (just output the login.html file).
app.get('/login',
  (req, res) => res.sendFile('/public/login.html',
      { 'root' : __dirname }));

// Handle logging out (takes us back to the login page).
// app.get('/logout', (req, res) => {
//   req.logout(); // Logs us out!
//   res.redirect('/login'); // back to login
// });


// Add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
// TODO
app.post('/register',
	 (req, res) => {
	     const username = req.body['username'];
	     const password = req.body['password'];
	     // TODO
	     // Check if we successfully added the user.
		 if(addUser(username, password) === true){
       console.log(username);
       console.log(password);

       console.log(users);
       console.log('added user');
			 res.redirect('/login');
		 }else{
      console.log(users);

       console('did not add user')
			 res.redirect('/register');
		 }
	     // If so, redirect to '/login'
	     // If not, redirect to '/register'.
	 });

// Register URL
app.get('/register',
  (req, res) => res.sendFile('/public/register.html',
         { 'root' : __dirname }));

// Private data
app.get('/private',
// IF we are logged in...
// TODO
// Go to the user's page ('/private/' + req.user)
  (req, res) => {
    checkLoggedIn(req, res, () => res.redirect('/private/' + req.user))
    // TODO
});

// A dummy page for the user.
app.get('/private/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.writeHead(200, {"Content-Type" : "text/html"});
      res.write('<H1>HELLO ' + req.params.userID + "</H1>");
      res.write('<br/><a href="/logout">click here to logout</a>');
      res.end();
    } else {
      res.redirect('/private/');
    }
});



app.get('/search', async (req, res) => {
  // datastore = reload(JSONfile);
  res.send(datastore.food);
});

// req: {"username": "user1", "password": "pass1"}
// app.post('/register', (req, res) => {
//   // datastore = reload(JSONfile); //reload function causing the pages to function weird
//   let username = req.body.username;
//   let password = req.body.password;
// 	if(!findUser(username)){
// 		users[username] = password;
// 	}


//   // if(!datastore["logins"][username]) {
//   //   datastore["logins"][username] = password;
//   //   datastore["profiles"][username] = [];
//   // }
//   // fs.writeFileSync(JSONfile, JSON.stringify(datastore));
//   res.end();
// });

app.get('/unique/view', (req, res) => {
  // datastore = reload(JSONfile);
  res.send(datastore["uniques"]);
});

app.get('/user/favorites/view/:key', (req, res) => {
  // datastore = reload(JSONfile);
  let username = req.params.key;
  // if(datastore.profiles[username] === undefined) {
  //   //make response be not ok / display error message
  //   res.end('no user exists');
  // }
  res.send(datastore.profiles[username]);
  res.end();
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add', (req, res) => {
  // datastore = reload(JSONfile);
  let username = req.body.username;
  let item = req.body.item;
  // if(datastore.profiles[username] === undefined) {
  //   //make response be not ok / display error message
  //   res.end('no user exists');
  // }
  datastore.profiles[username].push(item);
  // fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

// should work 100% :)
app.delete('/user/delete/:key', (req, res) => {
  // datastore = reload(JSONfile);
  let user = req.params.key;
  delete datastore["logins"][user];
  delete datastore["profiles"][user];
  // fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
