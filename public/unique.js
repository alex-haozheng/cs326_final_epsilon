'use strict';

async function getUnique() {
    let response = await fetch('/unique/view',{
        method: 'GET'
    });
    if (response.ok) {
<<<<<<< HEAD
        let data = await response.json();
        // perhaps create multiple get functions for each dining hall specifically
        // this looks quite messy to look back on but if it works it works
        
=======
        let out = await response.json();
        console.log(out);
>>>>>>> main
        //create variables that will be arrays for each menu at each dining hall
        let bbreakfast = [];
        let blunch = [];
        let bdinner = [];
        let hbreakfast = [];
        let hlunch = []; 
        let hdinner = [];
        let fbreakfast = [];
        let flunch = [];
        let fdinner = [];
        let wbreakfast = [];
        let wlunch = [];
        let wdinner = [];
<<<<<<< HEAD
        //data will be today's menu, this makes arrays for each 'meal' at each dining hall
        for(let item in data){
            if(item['hall'] === "Berkshire"){
                if(item['meal'] === "Breakfast"){
                    bbreakfast.push(item['name']);
=======
        //out will be today's menu, this makes arrays for each 'meal' at each dining hall
        for(let i = 0; i < out.length; i++){
            if(out[i]['hall'] === "Berkshire"){
                if(out[i]['meal'] === "Breakfast"){
                    bbreakfast.push(out[i]['name']);
>>>>>>> main
                }
                if(out[i]['meal'] === "Lunch"){
                    blunch.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Dinner"){
                    bdinner.push(out[i]['name']);
                }
            }
            if(out[i]['hall'] === "Hampshire"){
                if(out[i]['meal'] === "Breakfast"){
                    hbreakfast.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Lunch"){
                    hlunch.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Dinner"){
                    hdinner.push(out[i]['name']);
                }
            }
            if(out[i]['hall'] === "Franklin"){
                if(out[i]['meal'] === "Breakfast"){
                    fbreakfast.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Lunch"){
                    flunch.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Dinner"){
                    fdinner.push(out[i]['name']);
                }
            }
            if(out[i]['hall'] === "Worcester"){
                if(out[i]['meal'] === "Breakfast"){
                    wbreakfast.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Lunch"){
                    wlunch.push(out[i]['name']);
                }
                if(out[i]['meal'] === "Dinner"){
                    wdinner.push(out[i]['name']);
                }
            }
        }

        // these all create new filtered array versions for each 'meal' where each item is unique for that 'meal' to that dining hall
        // for example, each item in fbbreakfast (filtered Berkshire breakfast) will have items no other breakfast has 
        let fbbreakfast = bbreakfast.filter(function(e){
            if (!hbreakfast.includes(e) && !fbreakfast.includes(e) && !wbreakfast.includes(e)){
                return e;
            }
        });

        let fblunch = blunch.filter(function(e){
            if (!hlunch.includes(e) && !flunch.includes(e) && !wlunch.includes(e)){
                return e;
            }
        });

        let fbdinner = bdinner.filter(function(e){
            if (!hdinner.includes(e) && !fdinner.includes(e) && !wdinner.includes(e)){
                return e;
            }
        });

        let fhbreakfast = hbreakfast.filter(function(e){
            if (!bbreakfast.includes(e) && !fbreakfast.includes(e) && !wbreakfast.includes(e)){
                return e;
            }
        });

        let fhlunch = hlunch.filter(function(e){
            if (!blunch.includes(e) && !flunch.includes(e) && !wlunch.includes(e)){
                return e;
            }
        });

        let fhdinner = hdinner.filter(function(e){
            if (!bdinner.includes(e) && !fdinner.includes(e) && !wdinner.includes(e)){
                return e;
            }
        });
        let ffbreakfast = fbreakfast.filter(function(e){
            if (!bbreakfast.includes(e) && !hbreakfast.includes(e) && !wbreakfast.includes(e)){
                return e;
            }
        });
        let fflunch = flunch.filter(function(e){
            if (!blunch.includes(e) && !hlunch.includes(e) && !wlunch.includes(e)){
                return e;
            }
        });
        let ffdinner = fdinner.filter(function(e){
            if (!bdinner.includes(e) && !hdinner.includes(e) && !wdinner.includes(e)){
                return e;
            }
        });
        let fwbreakfast = wbreakfast.filter(function(e){
            if (!bbreakfast.includes(e) && !hbreakfast.includes(e) && !fbreakfast.includes(e)){
                return e;
            }
        });
        let fwlunch = wlunch.filter(function(e){
            if (!blunch.includes(e) && !hlunch.includes(e) && !flunch.includes(e)){
                return e;
            }
        });
        let fwdinner = wdinner.filter(function(e){
            if (!bdinner.includes(e) && !hdinner.includes(e) && !fdinner.includes(e)){
                return e;
            }
        });

        // these all create divs and append on the html page each unique item to that section of the page
        for(let i = 0; i < fbbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fbbreakfast[i]).replaceAll('"', '');
            document.getElementById("bbreakfast").append(newDiv);
        }

        for(let i = 0; i < fblunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fblunch[i]).replaceAll('"', '');
            document.getElementById("blunch").append(newDiv);
        }

        for(let i = 0; i < fbdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fbdinner[i]).replaceAll('"', '');
            document.getElementById("bdinner").append(newDiv);
        }

        for(let i = 0; i < fhbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fhbreakfast[i]).replaceAll('"', '');
            document.getElementById("hbreakfast").append(newDiv);
        }

        for(let i = 0; i < fhlunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fhlunch[i]).replaceAll('"', '');
            document.getElementById("hlunch").append(newDiv);
        }

        for(let i = 0; i < fhdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fhdinner[i]).replaceAll('"', '');
            document.getElementById("hdinner").append(newDiv);
        }

        for(let i = 0; i < ffbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(ffbreakfast[i]).replaceAll('"', '');
            document.getElementById("fbreakfast").append(newDiv);
        }

        for(let i = 0; i < fflunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fflunch[i]).replaceAll('"', '');
            document.getElementById("flunch").append(newDiv);
        }

        for(let i = 0; i < ffdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(ffdinner[i]).replaceAll('"', '');
            document.getElementById("fdinner").append(newDiv);
        }

        for(let i = 0; i < fwbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fwbreakfast[i]).replaceAll('"', '');
            document.getElementById("wbreakfast").append(newDiv);
        }

        for(let i = 0; i < fwlunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fwlunch[i]).replaceAll('"', '');
            document.getElementById("wlunch").append(newDiv);
        }

        for(let i = 0; i < fwdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add("food");
            newDiv.innerHTML = JSON.stringify(fwdinner[i]).replaceAll('"', '');
            document.getElementById("wdinner").append(newDiv);
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


window.addEventListener('load', () => {
    document.getElementById("berktitle").addEventListener("mouseover", berkPic);
    document.getElementById("berktitle").addEventListener("mouseout", normBack);
    document.getElementById("hamptitle").addEventListener("mouseover", hampPic);
    document.getElementById("hamptitle").addEventListener("mouseout", normBack);
    document.getElementById("franktitle").addEventListener("mouseover", frankPic);
    document.getElementById("franktitle").addEventListener("mouseout", normBack);
    document.getElementById("wootitle").addEventListener("mouseover", wooPic);
    document.getElementById("wootitle").addEventListener("mouseout", normBack);
    getUnique();
  });
