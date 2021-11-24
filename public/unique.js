'use strict';

async function getUnique() {
    let response = await fetch('/unique/view',{
        method: 'GET'
    });
    if (response.ok) {
        let out = await response.json();

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
