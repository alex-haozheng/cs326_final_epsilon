'use strict';

//getFavorites works
async function getFavorites() {
    let response = await fetch('/user/favorites/view',{
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
        alert("An error has occured. :((((");
    }
}
//test comment
async function addFavorite() {
    let response = await fetch('/user/favorites/add/', {
        method: 'POST',
		body: JSON.stringify({item: document.getElementById('adding').value}),
		headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
		console.log('it went well');
        getFavorites();
    }
    else {
        alert("An error has occured. :(");
    }
}

async function logOut() {
    let response = await fetch('/user/logout/', {
        method: 'POST'
    });
    if (response.ok) {
		window.location.href = 'login.html';
    	alert("you've logged out");
    } 
    else {
        alert("ur stuck forever loser");
    }
}

async function deleteAccount() {
    let response = await fetch('/user/delete/', {
        method: 'DELETE'
    });

    if (response.ok) {
		window.location.href = 'login.html';
    	alert("The account has been deleted");
    } 
    else {
        alert("An error has occured.");
    }
}

window.addEventListener('load', () => {
  document.getElementById("search").addEventListener("click", addFavorite);
  document.getElementById("delete").addEventListener("click", deleteAccount);
  document.getElementById("logout").addEventListener("click", logOut);
  getFavorites();
});
