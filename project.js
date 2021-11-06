'use strict';

function initialize(){
    document.getElementById('search').addEventListener('onClick', search);


}

function search(){
    
    let searchItem = [];
    searchItem.push(document.getElementById('mySearch').value);
    if(document.getElementById('halal').checked){
        searchItem.push('true');
    }else{
        searchItem.push('false');
    }

    if(document.getElementById('vegetarian').checked){
        searchItem.push('true');
    }else{
        searchItem.push('false');
    }

    if(document.getElementById('gluten free').checked){
        searchItem.push('true');
    }else{
        searchItem.push('false');
    }

    let response = await fetch('/search',{
        method: 'POST',
        body: searchItem
    })

    if (response.ok) {
        alert("sent");
    } 
    else {
        alert("An error has occured.");
    }
}

async function getResults() {
    let response = await fetch('/search',{
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
    for(let i in data[hall][time]){
        let newDiv = document.createElement('div');
        newDiv.innerHTML = JSON.stringify(data[hall][time][i]);
        uniquePage.document.getElementById(JSON.stringify(JSON.stringify(hall[0]) + time)).appendChild(newDiv);    
    };

};

window.onload = initialize();
