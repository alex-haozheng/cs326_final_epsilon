'use strict';
let http = require('http');
let url = require('url');
let fs = require('fs');
const express = require('express');
// import express from 'express';
const app = express();
app.use(express.static('public'));

app.use(express.json()); // lets you handle JSON input

const port = 8080;

let datastore = {};
const JSONfile = './storage.json';

function reload(filename) {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  } else {
    return {
      unique: {},
      logins: {},
      profiles: {},
      food: {}
    };
  }
}

app.get('/search', async (req, res) => {
  datastore = reload(JSONfile);
  res.send(datastore.food);
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', (req, res) => {
  datastore = reload(JSONfile); //reload function causing the pages to function weird
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]) {
    datastore["logins"][username] = password;
    datastore["profiles"][username] = [];
  }
  fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

app.get('/unique/view', (req, res) => {
  datastore = reload(JSONfile);
  res.send(datastore["uniques"]);
});

app.get('/user/favorites/view/:key', (req, res) => {
  datastore = reload(JSONfile);
  let username = req.params.key;
  console.log(username);
  console.log(datastore);
  // if(datastore.profiles[username] === undefined) {
  //   //make response be not ok / display error message
  //   res.end('no user exists');
  // }
  res.send(datastore.profiles[username]);
  res.end();
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add', (req, res) => {
  datastore = reload(JSONfile);
  console.log(req.body);
  let username = req.body.username;
  let item = req.body.item;
  // if(datastore.profiles[username] === undefined) {
  //   //make response be not ok / display error message
  //   res.end('no user exists');
  // }
  datastore.profiles[username].push(item);
  console.log(datastore.profiles[username]);
  fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

// should work 100% :)
app.delete('/user/delete/:key', (req, res) => {
  datastore = reload(JSONfile);
  let user = req.params.key;
  delete datastore["logins"][user];
  delete datastore["profiles"][user];
  fs.writeFileSync(JSONfile, JSON.stringify(datastore));
  res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
