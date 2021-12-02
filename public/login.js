'use strict';

async function login() {
    let response = await fetch('/login',{
        method: 'POST',
        body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value}),
        headers: {'Content-Type': 'application/json' }
    })

    if (response.ok) {
        alert("Successful login");
    } 
    else {
        alert("An error has occured.");
    }
}
 

function initialize() {
    document.getElementById("login").addEventListener("click", login);
}

window.onload = initialize;