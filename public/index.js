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
        const data = await response.json();
        console.log(data);
        document.getElementById("berkshire").innerHTML = '';
        document.getElementById("hampshire").innerHTML = '';
        document.getElementById("franklin").innerHTML = '';
        document.getElementById("worcester").innerHTML = '';
        for (let i = 0; i < data.length; i++){
            if(data[i]['hall'] === "Berkshire"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name'])} date: ${JSON.stringify(data[i]['date'])} meal: ${JSON.stringify(data[i]['meal'])}`;
                document.getElementById("berkshire").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("berkshire").appendChild(splitter);

            }
            if(data[i]['hall'] === "Hampshire"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name'])} date: ${JSON.stringify(data[i]['date'])} meal: ${JSON.stringify(data[i]['meal'])}`;
                document.getElementById("hampshire").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("hampshire").appendChild(splitter);
            }
            if(data[i]['hall'] === "Franklin"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name'])} date: ${JSON.stringify(data[i]['date'])} meal: ${JSON.stringify(data[i]['meal'])}`;
                document.getElementById("franklin").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("franklin").appendChild(splitter);
            }
            if(data[i]['hall'] === "Worcester"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name'])} date: ${JSON.stringify(data[i]['date'])} meal: ${JSON.stringify(data[i]['meal'])}`;
                document.getElementById("worcester").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("worcester").appendChild(splitter);
            }
        }
    } 
    else {
        alert("An error has occured.");
    }
    
}

function berkPic(){
    document.body.style.backgroundImage = "url('berkshire.jpg')";
    document.body.style.backgroundSize = "cover";
}

function hampPic(){
    document.body.style.backgroundImage = "url('hampshire.png')";
    document.body.style.backgroundSize = "cover";
}

function frankPic(){
    document.body.style.backgroundImage = "url('franklin.jpg')";
    document.body.style.backgroundSize = "cover";
}

function wooPic(){
    document.body.style.backgroundImage = "url('worcester.jpg')";
    document.body.style.backgroundSize = "cover";
}

function normBack(){
    document.body.style.background = "rgb(136,28,28)";
}

window.onload = initialize;
function initialize(){
    document.getElementById("search").addEventListener("click", search);
    document.getElementById("berktitle").addEventListener("mouseover", berkPic);
    document.getElementById("berktitle").addEventListener("mouseout", normBack);
    document.getElementById("hamptitle").addEventListener("mouseover", hampPic);
    document.getElementById("hamptitle").addEventListener("mouseout", normBack);
    document.getElementById("franktitle").addEventListener("mouseover", frankPic);
    document.getElementById("franktitle").addEventListener("mouseout", normBack);
    document.getElementById("wootitle").addEventListener("mouseover", wooPic);
    document.getElementById("wootitle").addEventListener("mouseout", normBack);

}
