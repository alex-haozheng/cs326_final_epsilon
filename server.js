'use strict';

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
// let http = require('http');
// let url = require('url');
// let fs = require('fs');

const projectPage = window.open('project.html');
const uniquePage = window.open('unique.html');
const profilePage = window.open('profile.html');
const loginPage = window.open('login.html');

let datastore = {};
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

function register(req, res){
    req.on('end', () => {
        loginPage.document.getElementById("signup").addEventListener("click", () => {
        datastore["logins"][loginPage.document.getElementByID("username").value] = loginPage.document.getElementByID("password").value;
        fs.writeFileSync(filename, JSON.stringify(datastore));
        res.end(JSON.stringify(response.statusCode));
        })
    }); 
}

function login(req, res){
    
}
function profile(req, res){
  
}
function getFav(req, res){

}
function addFav(req, res){

}

function getUnique(req, res){

}

function getBerk(req, res){

}
function getFrank(req, res){

}
function getHamp(req, res){
  
}
function getWoo(req, res){

}

function search(req, res){

}
let server = http.createServer();
server.on('request', async (request, response) => {
  datastore = reload(JSONfile);
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
    getFav(request, response);
  }
  else if (request.url.startsWith("/user/favorites/add")) {
    addFav(request, response);
  }
  else if (request.url.startsWith("/unique/view")) {
    getUnique(request, response);
  }
  else if (request.url.startsWith("/berkshire/view")) {
    getBerk(request, response);
  }
  else if (request.url.startsWith("/hampshire/view")) {
    getHamp(request, response);
  }
  else if (request.url.startsWith("/worcester/view")) {
    getWoo(request, response);
  }
  else if (request.url.startsWith("/franklin/view")) {
    getFrank(request, response);
  }
  else if (request.url.startsWith("/search")) {
    search(request, response);
  }
  else {
    response.write("no command found.");
  }
  response.end();
});
server.listen(8080);