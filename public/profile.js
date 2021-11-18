'use strict';

async function getFavorites() {
    let response = await fetch('http://localhost:8080/user/favorites/view/' + document.getElementById("username").value,{
        method: 'GET'
    });
    if (response.ok) {
        let arr = await response.json(); // array of favorites
        document.getElementById('favoriteList').innerHTML = '';
        for(let i = 0; i < arr.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(arr[i]);
            document.getElementById("favoriteList").append(newDiv);
        }
    }
    else {
        alert("An error has occured.");
    }
}
//test comment
async function addFavorite() {
    let g = JSON.stringify({username: document.getElementById("username").value, item: document.getElementById("adding").value});
    let response = await fetch('http://localhost:8080/user/favorites/add', {
        method: 'POST',
        body: g,
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        getFavorites();
    }
    else {
        alert("An error has occured.");
    }
}

async function deleteAccount() {
    let response = await fetch('http://localhost:8080/user/delete/' + document.getElementById("username").value, {
        method: 'DELETE'
    });

    if (response.ok) {
      alert("The account has been deleted");
    } 
    else {
        alert("An error has occured.");
    }
}



window.addEventListener('load', () => {
  document.getElementById("search").addEventListener("click", addFavorite);
  document.getElementById("delete").addEventListener("click", deleteAccount);
  document.getElementById("getFav").addEventListener("click", getFavorites);
});
