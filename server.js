'use strict';

// for loading environment variables
// require('dotenv').config();

const express = require('express');                 // express routing
const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const app = express();
const port = process.env.PORT || 8080;

const url = "mongodb+srv://alex:2HKRCoy6TImzUamS@menu.yeoac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// const parsed = parse(req.url, true);
await client.connect();

const uDine = await client.db('UDine'); // if this creates delete

const foods = await uDine.collection('food');
const logins = await uDine.collection('logins');

app.get('/search', async (req, res) => {
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
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    const data = JSON.parse(body);
    await logins.insertOne(data);
  }); res.end();
});

app.get('/unique/view', async (req, res) => {
  // returns all food 
  let d8 = "11/23/2021"; // hardcoded for now
  res.end(JSON.stringify( await foods.find({date: d8}))); // if not .toArray()  
});

app.get('/user/favorites/view/:key', async (req, res) => {
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
  const user = req.params.key;
  const fav = (await logins.findOne(
    {username: user}
  )).favorites;
  res.end(JSON.stringify(fav)); 
});

// should work 100% :)
app.delete('/user/delete/:key', async (req, res) => {
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