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
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name']).replaceAll('"', '')} date: ${JSON.stringify(data[i]['date']).replaceAll('"', '')} meal: ${JSON.stringify(data[i]['meal']).replaceAll('"', '')}`;
                document.getElementById("berkshire").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("berkshire").appendChild(splitter);

            }
            if(data[i]['hall'] === "Hampshire"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name']).replaceAll('"', '')} date: ${JSON.stringify(data[i]['date']).replaceAll('"', '')} meal: ${JSON.stringify(data[i]['meal']).replaceAll('"', '')}`;
                document.getElementById("hampshire").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("hampshire").appendChild(splitter);
            }
            if(data[i]['hall'] === "Franklin"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name']).replaceAll('"', '')} date: ${JSON.stringify(data[i]['date']).replaceAll('"', '')} meal: ${JSON.stringify(data[i]['meal']).replaceAll('"', '')}`;
                document.getElementById("franklin").appendChild(newDiv);
                let splitter = document.createElement("span");
                splitter.innerHTML = "<br/>";
                document.getElementById("franklin").appendChild(splitter);
            }
            if(data[i]['hall'] === "Worcester"){
                let newDiv = document.createElement('div');
                newDiv.classList.add("item");
                newDiv.innerHTML = `item: ${JSON.stringify(data[i]['name']).replaceAll('"', '')} date: ${JSON.stringify(data[i]['date']).replaceAll('"', '')} meal: ${JSON.stringify(data[i]['meal']).replaceAll('"', '')}`;
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
    document.body.style.backgroundSize = "100% 610px";
    document.body.style.backgroundRepeat = "no-repeat";
	document.getElementById('title1').style.color = 'white';
	document.getElementById('title2').style.color = 'white';
}

function hampPic(){
    document.body.style.backgroundImage = "url('hampshire.png')";
    document.body.style.backgroundSize = "100% 610px";
    document.body.style.backgroundRepeat = "no-repeat";
	document.getElementById('title1').style.color = 'white';
	document.getElementById('title2').style.color = 'white';
}

function frankPic(){
    document.body.style.backgroundImage = "url('franklin.jpg')";
    document.body.style.backgroundSize = "100% 610px";
    document.body.style.backgroundRepeat = "no-repeat";
	document.getElementById('title1').style.color = 'white';
	document.getElementById('title2').style.color = 'white';
}

function wooPic(){
    document.body.style.backgroundImage = "url('worcester.jpg')";
    document.body.style.backgroundSize = "100% 610px";
    document.body.style.backgroundRepeat = "no-repeat";
	document.getElementById('title1').style.color = 'white';
	document.getElementById('title2').style.color = 'white';
}

function normBack(){
    document.body.style.background = "rgb(136,28,28)";
	document.getElementById('title1').style.color = 'black';
	document.getElementById('title2').style.color = 'black';
}


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

window.onload = initialize;