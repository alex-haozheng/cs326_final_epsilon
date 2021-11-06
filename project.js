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
    const data;
    let response = await fetch('/search',{
        method: 'POST',
        body: {
            "keyword": document.getElementById("search").value,
            "days": document.getElementById("count").value,
            "halal": document.getElementById("halal").checked,
            "vegetarian": document.getElementById("vegetarian").checked,
            "glutenFree": document.getElementById("gluten").checked
        }

    })

    if (response.ok) {
        data = response.json();
        alert("sent");
    } 
    else {
        alert("An error has occured.");
    }
    return data;
}

/**
 * request results from server and display resultss
 */
function getResults() {
    let data = await response.json();

    for(let i = 0; i < JSON.parse(data).length; ++i){   //loop through each date and display its data
        for(let hall in JSON.parse(data)){              //loop through each hall
            display(data[i], i, hall);
        }
    }
    
}

/**
 * display results of search
 * @param {*} data the results array
 * @param {*} date what date is being displayed
 * @param {*} hall which hall card it is being displayed in
 */
function display(data, date, hall){
        
        let dateDiv = document.createElement('div');
        dateDiv.classList.add("list-group-item");
        dateDiv.innerHtml = date;
        uniquePage.document.getElementById(hall).appendChild(newDiv);

        for(let meal in data[i][hall]){                     //create a div for each meal, append to date div
            let mealDiv = document.createElement('div');
            mealDiv.innerHTML = meal;
            dateDiv.appendChild(mealDiv);

            for(let item in meal){                              //create a div for each item, append to meal div
                let itemDiv = document.createElement('div');
                itemDiv.innerHTML = item;
                newDiv.appendChild(itemDiv);
            }
    
        }

    
};

window.onload = initialize();
