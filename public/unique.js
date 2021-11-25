'use strict';

async function getUnique() {
    let response = await fetch('/unique/view',{
        method: 'GET'
    });
    if (response.ok) {
        let out = await response.json();
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
        //out will be today's menu, this makes arrays for each meal at each dining hall
        for(let item in out){
            if(item[hall] === "Berkshire"){
                if(item[meal] === "Breakfast"){
                    bbreakfast.push(item[name]);
                }
                if(item[meal] === "Lunch"){
                    blunch.push(item[name]);
                }
                if(item[meal] === "Dinner"){
                    bdinner.push(item[name]);
                }
            }
            if(item[hall] === "Hampshire"){
                if(item[meal] === "Breakfast"){
                    hbreakfast.push(item[name]);
                }
                if(item[meal] === "Lunch"){
                    hlunch.push(item[name]);
                }
                if(item[meal] === "Dinner"){
                    hdinner.push(item[name]);
                }
            }
            if(item[hall] === "Franklin"){
                if(item[meal] === "Breakfast"){
                    fbreakfast.push(item[name]);
                }
                if(item[meal] === "Lunch"){
                    flunch.push(item[name]);
                }
                if(item[meal] === "Dinner"){
                    fdinner.push(item[name]);
                }
            }
            if(item[hall] === "Worcester"){
                if(item[meal] === "Breakfast"){
                    wbreakfast.push(item[name]);
                }
                if(item[meal] === "Lunch"){
                    wlunch.push(item[name]);
                }
                if(item[meal] === "Dinner"){
                    wdinner.push(item[name]);
                }
            }
        }

        // these all create new filtered array versions for each meal where each item is unique for that meal to that dining hall
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
            newDiv.innerHTML = JSON.stringify(fbbreakfast[i]);
            document.getElementById("bbreakfast").append(newDiv);
        }

        for(let i = 0; i < fblunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fblunch[i]);
            document.getElementById("blunch").append(newDiv);
        }

        for(let i = 0; i < fbdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fbdinner[i]);
            document.getElementById("bdinner").append(newDiv);
        }

        for(let i = 0; i < fhbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fhbreakfast[i]);
            document.getElementById("hbreakfast").append(newDiv);
        }

        for(let i = 0; i < fhlunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fhlunch[i]);
            document.getElementById("hlunch").append(newDiv);
        }

        for(let i = 0; i < fhdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fhdinner[i]);
            document.getElementById("hdinner").append(newDiv);
        }

        for(let i = 0; i < ffbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(ffbreakfast[i]);
            document.getElementById("fbreakfast").append(newDiv);
        }

        for(let i = 0; i < fflunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fflunch[i]);
            document.getElementById("flunch").append(newDiv);
        }

        for(let i = 0; i < ffdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(ffdinner[i]);
            document.getElementById("fdinner").append(newDiv);
        }

        for(let i = 0; i < fwbreakfast.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fwbreakfast[i]);
            document.getElementById("wbreakfast").append(newDiv);
        }

        for(let i = 0; i < fwlunch.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fwlunch[i]);
            document.getElementById("wlunch").append(newDiv);
        }

        for(let i = 0; i < fwdinner.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(fwdinner[i]);
            document.getElementById("wdinner").append(newDiv);
        }

    } 
    else {
        alert("An error has occured.");
    }
}



window.onload = getUnique();
