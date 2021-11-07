'use strict';

async function register() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;
    let response = await fetch('/register',{
        method: 'POST',
        body: JSON.stringify({"username": u, "password": p})
    })
    if (response.ok) {
        alert("Account has been created successfully.");
    }
    else {
        alert("An error has occured.");
    }
}

function initialize() {
    document.getElementById("signup").addEventListener("click", register);
}

window.onload = initialize;