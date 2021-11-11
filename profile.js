'use strict';

async function getFavorites() {
    let response = await fetch('http://localhost:8080/user/favorites/view/' + document.getElementById("username").value,{
        method: 'GET'
    });

    if (response.ok) {
        let arr = await response.json(); // array of favorites
        for(let i = 0; i <arr.length; i++){
            document.getElementById('favoriteList').innerHTML = '';
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(arr[i]);
            document.getElementById("favoriteList").append(newDiv);
        }   
    } 
    else {
        alert("An error has occured.");
    }
}

async function addFavorite() {
    let response = await fetch('http://localhost:8080/user/favorites/add',{
        method: 'POST',
        body: JSON.stringify({"username": JSON.stringify(document.getElementById("username").value), "item": JSON.stringify(document.getElementById("adding").value)}),
    })

    if (response.ok) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = JSON.stringify(document.getElementById("adding").value);
        document.getElementById("favoriteList").append(newDiv);
    } 
    else {
        alert("An error has occured.");
    }
}

async function deleteAccount() {
    let response = await fetch('http://localhost:8080/user/delete/' + document.getElementById("username").value,{
        method: 'DELETE'
    })

    if (response.ok) {
      alert("The account has been deleted");
    } 
    else {
        alert("An error has occured.");
    }
}


function initialize() {
    document.getElementById("search").addEventListener("click", addFavorite);
    document.getElementById("delete").addEventListener("click", deleteAccount);
    document.getElementById("getFav").addEventListener("click", getFavorites);
}

window.onload = initialize;
