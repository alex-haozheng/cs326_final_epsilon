'use strict';

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
// let http = require('http');
// let url = require('url');
// let fs = require('fs');

let box = {};
const JSONfile = './storage.json';

function reload(filename) {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  } else {
    return {
      'uniques': {},
      'logins': {},
      'profiles': {}
    };
  }
}

// Using POST can be tricky with vanilla Node.js, so here is a snippet to get you started.
function wordScore(req, res) {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
      box.wordScore.push(JSON.parse(body));
      // The request has been fully processed, and you can use / parse the body variable.
      fs.writeFileSync(JSONfile, JSON.stringify(box)); // dont need to parse/ stringify ?
    });
    res.end(JSON.stringify(res.statusCode));
}

// GET function
function highestWordScores(req, res) {
  // box = reload(JSONfile);
  if(box.wordScore.length > 10) {
    box.wordScore.sort((a, b) => (a.score > b.score) ? 1 : -1);
    let arr = JSON.parse(JSON.stringify(box.wordScore));
    res.end(JSON.stringify(arr.splice(0, 10)));
  } else {
    res.end(JSON.stringify(box.wordScore));
  }
}

// POST
function gameScore(req, res) {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    box.gameScore.push(JSON.parse(body));
    // The request has been fully processed, and you can use / parse the body variable.
    fs.writeFileSync(JSONfile, JSON.stringify(box)); // dont need to parse/ stringify ?
  });
  res.end(JSON.stringify(res.statusCode));
}

// GET function (req is never referenced / used)
function highestGameScores(req, res) {
  // box = reload(JSONfile);
  if(box.gameScore.length > 10) { // wait is this box.wordScore??
    box.gameScore.sort((a, b) => (a.score > b.score) ? 1 : -1);
    let arr = JSON.parse(JSON.stringify(box.gameScore));
    res.end(JSON.stringify(arr.splice(0, 10))); 
  } else {
    res.end(JSON.stringify(box.gameScore));
  }
}

let server = http.createServer();
server.on('request', async (request, response) => {
  box = reload(JSONfile);
  if (request.url.startsWith("/register")) {
    register(request, response);
  }
  else if (request.url.startsWith("/login")) {
    login(request, response);
  }
  else if (request.url.startsWith("/user")) {
    profile(request, response);
  }
  else if (request.url.startsWith("/user/favorites/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/user/favorites/add")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/unique/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/berkshire/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/hampshire/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/worcester/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/franklin/view")) {
    highestGameScores(request, response);
  }
  else if (request.url.startsWith("/search")) {
    highestGameScores(request, response);
  }
  else {
    response.write("no command found.");
  }
  response.end();
});
server.listen(8080);


