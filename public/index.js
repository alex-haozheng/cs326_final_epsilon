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
    let copy = JSON.parse(JSON.stringify(data));
    console.log('copy');
    // console.log(copy[0]);
    let keyword = document.getElementById("mySearch").value;
    let days = 1;
    let halal = document.getElementById("halal").checked;
    let vegetarian = document.getElementById("vegetarian").checked;
    let glutenFree = document.getElementById("gluten").checked;
    console.log('halal: ' + halal + ', veg: ' + vegetarian + ', glu: ' + glutenFree);
    const res = {};
    for(let date = 0; date < copy.length; ++date){
        console.log(copy[date]);
        recurse(copy[date]);
    }

    function recurse(obj) {
        //console.log("obj: " + obj);
        for (let key in obj) {            //iterate through layer
            console.log(Object.keys(obj));
            if((Object.keys(obj[key]).length > 0) && !(typeof Object.values(obj[key])[0] === 'boolean')){   //checks if the key is item
                recurse(obj[key]);                                                                          //if not recurse until find an item
            }else{                                                                                          //if item, check the tags 
                if(halal) {                         //checked halal
                    console.log('checked hal');
                    if(!obj[key].hasOwnProperty("halal")) {                 //food is/not halal
                      console.log("not halal");
                      obj[key] = null;
                      continue;
                    }
                }
                if(vegetarian) {
                    if(!obj[key].hasOwnProperty("vegetarian")) {
                      console.log("not veg");
                      obj[key] = null;
                      continue;

                    }
                }
                if(glutenFree) {
                    if(!obj[key].hasOwnProperty("gluten free")) {
                      console.log("not glu");
                      obj[key] = null;
                      continue;

                    }
                }
            }

        }

    }
    console.log(copy);
    return copy;
}


/**
 * request results from server and display resultss
 */
async function getResults() {
    let data = await search();
    console.log(data);
    let copy = filter(data);
    console.log(typeof(copy));
    for(let i = 0; i < copy.length; ++i){   //loop through each date and display its data
        console.log(copy[i]);

            display(copy[i], i, "berkshire");
            display(copy[i], i, "hampshire");
            display(copy[i], i, "franklin");
            display(copy[i], i, "worcester");
    }
    
}


/**
 * display results of search
 * @param {*} data the results array
 * @param {*} date what date is being displayed
 * @param {*} hall which hall card it is being displayed in
 */
function display(data, date, hall){
        // console.log(date);
        // console.log(data);
        let dateDiv = document.createElement('div');
      //  dateDiv.classList.add("list-group-item");
        dateDiv.innerText = date;
        console.log("doc id" + document.getElementById(hall));
        document.getElementById(hall).appendChild(dateDiv);

        for(let meal in data[hall]){                     //create a div for each meal, append to date div
            let mealDiv = document.createElement('div');
            mealDiv.innerHTML = meal;
            dateDiv.appendChild(mealDiv);

            for(let item in data[hall][meal]){                              //create a div for each item, append to meal div
                if(data[hall][meal][item] !== null){
                    let itemDiv = document.createElement('div');
                    itemDiv.innerHTML = item;
                    mealDiv.appendChild(itemDiv);
    
                }
            }
    
        }

    
};

window.onload = initialize;
function initialize(){
    document.getElementById("search").addEventListener("click", getResults)
}
