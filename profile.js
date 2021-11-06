'use strict';

async function getFavorites() {
    let u = document.getElementById("username").value;
    let response = await fetch('//user/favorites/view',{
        method: 'POST',
        body: u
    })

    if (response.ok) {
        for(let i = 0; i <response.length; i++){
            document.getElementById("favoriteList").value.append("\n" + response[i]);
        }   
    } 
    else {
        alert("An error has occured.");
    }
}

async function addFavorite() {
    let u = document.getElementById("username").value;
    let a = document.getElementById("adding").value;
    let response = await fetch('//user/favorites/add',{
        method: 'POST',
        body: JSON.stringify([u,a])
    })

    if (response.ok) {

        document.getElementById("favoriteList").value.append("\n" + a);
    } 
    else {
        alert("An error has occured.");
    }
}

async function deleteAccount() {
    let u = document.getElementById("username").value;
    let response = await fetch('/user/delete',{
        method: 'DELETE',
        body: u
    })

    if (response.ok) {

      alert("The account has been deleted");
      //send back to login page
    } 
    else {
        alert("An error has occured.");
    }
}


function initialize() {
    getFavorites();
    document.getElementById("search").addEventListener("click", getFavorites);
    document.getElementById("delete").addEventListener("click", deleteAccount);
}

window.onload = initialize;