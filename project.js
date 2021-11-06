'use strict';

/**
 * initialize event listener to search
 */
function initialize(){
    document.getElementById('search').addEventListener('onClick', search);


}

/**
 * send search info to server
 */
async function search(){
    
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

/**
 * request results from server and display resultss
 */
async function getResults() {
    let response = await fetch('/search',{
        method: 'GET',
    
    });
    if (response.ok) {
        let data = await response.json();

        for(let i = 0; i < JSON.parse(data).length; ++i){   //loop through each date and display its data
            for(let hall in JSON.parse(data)){              //loop through each hall
                helper(data[i], i, hall);
            }

        }
    } 
    else {
        alert("An error has occured.");
    }
}

/**
 * display results of search
 * @param {*} data the results array
 * @param {*} date what date is being displayed
 * @param {*} hall which hall card it is being displayed in
 */
function helper(data, date, hall){
        
        let dateDiv = document.createElement('div');
        dateDiv.classList.add("list-group-item");
        dateDiv.innerHtml = date;
        uniquePage.document.getElementById(hall).appendChild(newDiv);

        for(let meal in data[i][hall]){                     //create a div for each meal, append to date div
            let mealDiv = document.createElement('div');
            mealDiv.innerHTML = JSON.stringify(meal);
            dateDiv.appendChild(mealDiv);

            for(let item in meal){                              //create a div for each item, append to meal div
                let itemDiv = document.createElement('div');
                itemDiv.innerHTML = JSON.stringify(item);
                newDiv.appendChild(itemDiv);
            }
    
        }

    
};

window.onload = initialize();
