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
        method: 'GET'
    })

    if (response.ok) {
        data = response.json();
        alert("sent");
    } 
    else {
        alert("An error has occured.");
    }
    filter(data);
    return data;
}

function filter(data) {
  let keyword = document.getElementById("search").value;
  let days = document.getElementById("count").value;
  let halal = document.getElementById("halal").checked;
  let vegetarian = document.getElementById("vegetarian").checked;
  let glutenFree = document.getElementById("gluten").checked;
  for(let i = 0; i <= days; ++i) {
    for (let hall in data.food[i]) {
      for (let meal in hall) {
        for (let name in meal) {
          if (name.includes(keyword)) {
            let tags = data[hall][meal][name];
            if(halal) {
              if(!tags.halal) {
                delete data[hall][meal][name];
                continue;
              }
            }
            if(vegetarian) {
              if(!tags.vegetarian) {
                delete data[hall][meal][name];
                continue;
              }
            }
            if(glutenFree) {
              if(!tags.glutenFree) {
                delete data[hall][meal][name];
                continue;
              }
            }
          } else {
            delete data[hall][meal][name];
          }
        }
      }
    }
  }

}
/**
 * request results from server and display resultss
 */
function getResults() {
    let data = await response.json();
    filter(data);
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
