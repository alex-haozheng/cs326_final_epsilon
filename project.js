'use strict';

/**
 * send search info to server
 */
async function search(){
    let response = await fetch('http://localhost:8080/search',{
        method: 'GET'
    })

    if (response.ok) {
        const data = response.json();
        return data;
    } 
    else {
        alert("An error has occured.");
    }
    
}

function filter(data) {
  let keyword = document.getElementById("mySearch").value;
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
async function getResults() {
    let data = await search();
    
   // filter(data);
    console.log(typeof(data));
    for(let i = 0; i < data.length; ++i){   //loop through each date and display its data
            display(data[i], i, "berkshire");
            display(data[i], i, "hampshire");
            display(data[i], i, "franklin");
            display(data[i], i, "worcester");

    }
    
}

/**
 * display results of search
 * @param {*} data the results array
 * @param {*} date what date is being displayed
 * @param {*} hall which hall card it is being displayed in
 */
function display(data, date, hall){
        console.log(hall);
        let dateDiv = document.createElement('div');
        dateDiv.classList.add("list-group-item");
        dateDiv.innerHtml = date;
        document.getElementById(hall).appendChild(dateDiv);

        for(let meal in data[hall]){                     //create a div for each meal, append to date div
            let mealDiv = document.createElement('div');
            mealDiv.innerHTML = meal;
            dateDiv.appendChild(mealDiv);

            for(let item in data[hall][meal]){                              //create a div for each item, append to meal div
                let itemDiv = document.createElement('div');
                itemDiv.innerHTML = item;
                dateDiv.appendChild(itemDiv);
            }
    
        }

    
};

window.onload = initialize;
function initialize(){
    document.getElementById("searchBtn").addEventListener("click", getResults)
}
