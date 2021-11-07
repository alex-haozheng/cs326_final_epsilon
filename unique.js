'use strict';

async function getUnique() {
    let response = await fetch('http://localhost:8080/unique/view',{
        method: 'GET',
    
    });
    if (response.ok) {
        let JSON = await response.json();

        helper(JSON, "berkshire", "breakfast");
        helper(JSON, "berkshire", "lunch");
        helper(JSON, "berkshire", "dinner");

        helper(JSON, "hampshire", "breakfast");
        helper(JSON, "hampshire", "lunch");
        helper(JSON, "hampshire", "dinner");

        helper(JSON, "franklin", "breakfast");
        helper(JSON, "franklin", "lunch");
        helper(JSON, "franklin", "dinner");

        helper(JSON, "worcester", "breakfast");
        helper(JSON, "worcester", "lunch");
        helper(JSON, "worcester", "dinner");
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
