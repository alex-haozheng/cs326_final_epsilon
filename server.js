'use strict';
// const express = require('express');
import express from 'express';
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 8080;

const datastore = {};
const JSONfile = 'storage.json';




async function search() {
  let berk = await berk();
  let hamp = await hamp();
  let woo = await woo();
  let frank = await frank();

}

async function berk() {

}

async function hamp() {

}

async function woo() {

}

async function frank() {

}

// ['search', int, true, false, true]
app.get('/search', async (req, res) => {
  const o = datastore.food
  
});

app.get('/unique/view', (req, res) => {
  res.send(datastore["uniques"]);
});

// req: {"username": "user1", "password": "pass1"}
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
