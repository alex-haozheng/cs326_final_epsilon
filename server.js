'use strict';
const express = require('express');
// import express from 'express';
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 3000;

const datastore = {
  "uniques": {},
  "logins": {},
  "profiles": {},
  "searchResults": {}
};

// req: ['user', 'pass']
app.post('/register', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    const arr = JSON.parse(body);
    let acct = datastore.logins;
    if(!acct.includes(arr[0]))
      acct[arr[0]] = arr[1];
    else
      alert('account already exists');
  });
  res.end();
});

// req 'user1'
app.get('/user/favorites/view', (req, res) => {
  res.send(datastore.profiles[req]);
});

// ['user', 'fav1']
app.post('/user/favorites/add', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    const o = JSON.parse(body);
    let fav = datastore.profiles[o[0]];
    if(!fav.includes(o[1]))
      fav.push(o[1]);
  });
  res.end();
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
