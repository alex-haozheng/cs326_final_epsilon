'use strict';
// const express = require('express');

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import express from 'express';
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 8080;

const datastore = {};
const JSONfile = 'storage.json';

function reload(filename) {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  } else {
    return {"wordScore": [], "gameScore": []};
  }
}


async function search(obj, arr) {
  let ret = JSON.parse(JSON.stringify(obj));

  for(let i = 0; i <= arr[1]; ++i) {
    for (let hall in obj.food[i]) {
      for (let meal in hall) {
        let keys = Object.keys(meal);
        let 
      }
    }
  }
}

// ['search', int, true, false, true]
app.get('/search', async (req, res) => {
  const o = datastore.food
  
});



// req: ['user', 'pass']
app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]){
    datastore["logins"][username] = password;
  }
  res.send(res.statusCode);
});

// req 'user1'
app.get('/user/favorites/view/:key', (req, res) => {
  let name = req.params.key;
  res.send(datastore.profiles[name]);
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add', (req, res) => {
  let username = req.body.username;
  let item = req.body.item;
  datastore["profiles"][username] = item;
  res.send(res.statusCode);
});

app.delete('/user/delete', (req, res) => {
  // TODO: PARSE OUT KEY AND VALUE FROM req.body INTO k and v
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    delete datastore.logins[body];
  });
  res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
