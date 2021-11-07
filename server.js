'use strict';

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
const express = require('express');
// import express from 'express';
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 8080;

const datastore = {};
const JSONfile = './storage.json';

function reload(filename) {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  } else {
    return {
      'unique': {},
      'logins': {},
      'profiles': {},
      'food': {}
    };
  }
}

app.get('/search', async (req, res) => {
  datastore = reload(JSONfile);
  res.send(datastore["food"]);
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', (req, res) => {
  datastore = reload(JSONfile);
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]){
    datastore["logins"][username] = password;
    datastore["profiles"][username] = [];
  }
  res.send(res.statusCode);
});

app.get('/unique/view', (req, res) => {
  datastore = reload(JSONfile);
  res.send(datastore["uniques"]);
});

app.get('/user/favorites/view/:key', (req, res) => {
  datastore = reload(JSONfile);
  let name = req.params.key;
  res.send(datastore.profiles[name]);
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add', (req, res) => {
  datastore = reload(JSONfile);
  let username = req.body.username;
  let item = req.body.item;
  datastore["profiles"][username].push(item);
  res.send(res.statusCode);
});

app.delete('/user/delete/:key', (req, res) => {
  datastore = reload(JSONfile);
  let user = req.params.key;
  delete datastore["logins"][user];
  delete datastore["profiles"][user];
  res.send(res.statusCode);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
