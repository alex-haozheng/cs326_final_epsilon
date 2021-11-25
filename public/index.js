'use strict';

/**
 * send search info to server
 */
async function search(){
    let g = JSON.stringify({keyword: document.getElementById("mySearch").value, halal: document.getElementById("halal").checked, vegetarian: document.getElementById("vegetarian").checked, wholeGrain: document.getElementById("wholeGrain").checked});
    let response = await fetch('/search',{
        method: 'POST',
        body: g,
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        console.log('hi');
        const data = await response.json();
        console.log(data);
        for (let e in data){
            if(e['hall'] === "Berkshire"){
                let newDiv = document.createElement('div');
                newDiv.innerHTML = 'item: ${JSON.stringify(e[name])} date: ${JSON.stringify(e[date])} meal: ${JSON.stringify(e[meal])}';
                document.getElementById("berkshire").appendChild(newDiv);
            }
            if(e['hall'] === "Hampshire"){
                let newDiv = document.createElement('div');
                newDiv.innerHTML = 'item: ${JSON.stringify(e[name])} date: ${JSON.stringify(e[date])} meal: ${JSON.stringify(e[meal])}';
                document.getElementById("hampshire").appendChild(newDiv);
            }
            if(e['hall'] === "Franklin"){
                let newDiv = document.createElement('div');
                newDiv.innerHTML = 'item: ${JSON.stringify(e[name])} date: ${JSON.stringify(e[date])} meal: ${JSON.stringify(e[meal])}';
                document.getElementById("franklin").appendChild(newDiv);
            }
            if(e['hall'] === "Worcester"){
                let newDiv = document.createElement('div');
                newDiv.innerHTML = 'item: ${JSON.stringify(e[name])} date: ${JSON.stringify(e[date])} meal: ${JSON.stringify(e[meal])}';
                document.getElementById("worcester").appendChild(newDiv);
            }
        }
    } 
    else {
        alert("An error has occured.");
    }
    
}


window.onload = initialize;
function initialize(){
    document.getElementById("search").addEventListener("click", search)
}
