'use strict';
import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync, fstat} from 'fs';
import { MongoClient } from 'mongodb'

let http = require('http');
let url = require('url');
let fs = require('fs');
const expressSession = require('express-session');  // for managing session state

const express = require('express');
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

// import express from 'express';
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

const port = 8080;

let datastore = {
  "uniques":{
     "berkshire": {
         "breakfast": ["pancakes", "sausages", "eggs"],
         "lunch": ["pizza", "burgers", "french fries"],
         "dinner": ["fish", "spaghetti", "chicken pot pie"]
     },
     "franklin": {
         "breakfast": ["waffles", "sausages", "eggs"],
         "lunch": ["pasta", "burgers", "french fries"],
         "dinner": ["pork", "spaghetti", "chicken pot pie"]
     },
     "hampshire": {
         "breakfast": ["biscuits", "sausages", "eggs"],
         "lunch": ["soup", "burgers", "french fries"],
         "dinner": ["turkey", "spaghetti", "chicken pot pie"]
     },
     "worcester": {
         "breakfast": ["danish", "sausages", "eggs"],
         "lunch": ["ribs", "burgers", "french fries"],
         "dinner": ["fish", "spaghetti", "chicken pot pie"]
     }
  },

  "logins": {
      "user1": "pass1",
      "user2": "pass2",
      "user3": "pass3"
  },

  "profiles":{
      "user1": ["fav1", "fav2"],
      "user2": ["fav3", "fav4"],
      "user3": ["fav5", "fav6"] 
  },
  "food":[
      {
        "berkshire": {
            "breakfast": {
                "waffles": {
                    "halal": true,
                    "vegetarian": true
                },
                "sausages": {
                },
                "eggs": {
                    "halal": true
                }
            },
            "lunch": {
                "pasta": {
                    "halal": true,
                    "vegetarian": true
                },
                "burgers": {
                },
                "french fries": {
                    "vegetarian": true
                }
              },
              "dinner": {
                "pasta": {
                    "halal": true,
                    "vegetarian": true
                },
                "spaghetti": {
                    "vegetarian": true,
                    "gluten free": true
                },
                "chicken pot pie": {
                    "halal": true
                }
              }
          },
          "franklin": {
          },
          "hampshire": {
          },
          "worcester": {
          }
  
      }
    ]
};

app.get('/search', async (req, res) => {
  // datastore = reload(JSONfile);
  res.send(datastore.food);
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', (req, res) => {
  // datastore = reload(JSONfile); //reload function causing the pages to function weird
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]) {
    datastore["logins"][username] = password;
    datastore["profiles"][username] = [];
  }
  // fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

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
app.post('/user/favorites/add/:key', (req, res) => {
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
