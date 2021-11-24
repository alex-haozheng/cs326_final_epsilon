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
        //out will be today's menu
        // for(let item in out){
        //     if(item[hall] === "Berkshire"){
        //         if(item[meal] === "Breakfast"){
        //             bbreakfast.push(item[name]);
        //         }
        //         if(item[meal] === "Lunch"){
        //             blunch.push(item[name]);
        //         }
        //         if(item[meal] === "Dinner"){
        //             bdinner.push(item[name]);
        //         }
        //     }
        //     if(item[hall] === "Hampshire"){
        //         if(item[meal] === "Breakfast"){
        //             hbreakfast.push(item[name]);
        //         }
        //         if(item[meal] === "Lunch"){
        //             hlunch.push(item[name]);
        //         }
        //         if(item[meal] === "Dinner"){
        //             hdinner.push(item[name]);
        //         }
        //     }
        //     if(item[hall] === "Franklin"){
        //         if(item[meal] === "Breakfast"){
        //             fbreakfast.push(item[name]);
        //         }
        //         if(item[meal] === "Lunch"){
        //             flunch.push(item[name]);
        //         }
        //         if(item[meal] === "Dinner"){
        //             fdinner.push(item[name]);
        //         }
        //     }
        //     if(item[hall] === "Worcester"){
        //         if(item[meal] === "Breakfast"){
        //             wbreakfast.push(item[name]);
        //         }
        //         if(item[meal] === "Lunch"){
        //             wlunch.push(item[name]);
        //         }
        //         if(item[meal] === "Dinner"){
        //             wdinner.push(item[name]);
        //         }
        //     }
        // }

        helper(out, "berkshire", "breakfast");
        helper(out, "berkshire", "lunch");
        helper(out, "berkshire", "dinner");

        helper(out, "hampshire", "breakfast");
        helper(out, "hampshire", "lunch");
        helper(out, "hampshire", "dinner");

        helper(out, "franklin", "breakfast");
        helper(out, "franklin", "lunch");
        helper(out, "franklin", "dinner");

        helper(out, "worcester", "breakfast");
        helper(out, "worcester", "lunch");
        helper(out, "worcester", "dinner");
    } 
    else {
        alert("An error has occured.");
    }
}

function helper(data, hall, time){
        for(let i = 0; i < data[hall][time].length; ++i){
            let newDiv = document.createElement('div');
            newDiv.innerHTML = JSON.stringify(data[hall][time][i]);
            document.getElementById(hall[0] + time).appendChild(newDiv);    
        }   

}

window.onload = getUnique();
