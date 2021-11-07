'use strict';

async function register() {
    let response = await fetch('http://localhost:8080/register',{
        method: 'POST',
        body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value})
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