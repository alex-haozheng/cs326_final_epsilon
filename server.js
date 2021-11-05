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
      loginPage.document.getElementById("signup").addEventListener("click", () => {
          if(!datastore["logins"][loginPage.document.getElementByID("username").value]){
              datastore["logins"][loginPage.document.getElementByID("username").value] = loginPage.document.getElementByID("password").value;
              fs.writeFileSync(filename, JSON.stringify(datastore));
              res.end(JSON.stringify(response.statusCode));
          }
          else {
              alert("This username is already taken!");
              res.end("This username is already taken!");
          }
            
      }) 
}

function login(req, res){

}

function profile(req, res){
  
}

//example request: {"username": "user1", "password": "pass1"}
function getFav(req, res){
  let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
        let item = JSON.parse(body);
        if(datastore["logins"][item["username"]] && JSON.stringify(datastore["logins"][item["username"]]) === JSON.stringify(item["password"])){
          response.end(JSON.stringify(datastore["profiles"][item["username"]]));
        }
        else {

        }
        
    });
  }

//example request: {"username": "user1", "password": "pass1", "item": "Chicken Souklavia Bowl"}
function addFav(req, res){
  //need code to verify user is user first
  //need something to load in username as a variable after verifying identity
  let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
        let item = JSON.parse(body);
        datastore["profiles"][item["username"]].push(item["item"]);
        fs.writeFileSync(filename, JSON.stringify(datastore));
        response.end(JSON.stringify(response.statusCode));
    });
}

//TODO: add the rest of the dining halls, make it clear any divs before updating
function getUnique(req, res){
  const data = datastore["uniques"];
  for(let i = 0; i < data["berkshire"]["breakfast"].length; ++i){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = JSON.stringify(data["berkshire"]["breakfast"][i]);
    uniquePage.document.getElementById("bbreakfast").appendChild(newDiv);
  }
  for(let i = 0; i < data["berkshire"]["lunch"].length; ++i){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = JSON.stringify(data["berkshire"]["lunch"][i]);
    uniquePage.document.getElementById("blunch").appendChild(newDiv);
  }
  for(let i = 0; i < data["berkshire"]["dinner"].length; ++i){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = JSON.stringify(data["berkshire"]["dinner"][i]);
    uniquePage.document.getElementById("bdinner").appendChild(newDiv);
  }

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
