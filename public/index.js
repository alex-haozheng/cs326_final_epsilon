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
//do later
// function filter(data) {
//   let copy = JSON.parse(JSON.stringify(data));
//   console.log(copy);
//   let keyword = document.getElementById("mySearch").value;
//   let days = 1;
//   let halal = document.getElementById("halal").checked;
//   let vegetarian = document.getElementById("vegetarian").checked;
//   let glutenFree = document.getElementById("gluten").checked;
//   for(let i = 0; i <= days; ++i) {
//     console.log(copy[i]);
//     for (let hall in copy[i]) {

//       for (let meal in hall) {
//         for (let name in meal) {
//           //console.log(hall);
//           console.log(copy[i][hall]);  
//           if (name.includes(keyword) && keyword !== '') {
//             console.log(keyword);
//             if(halal) {                         //checked halal
//               console.log('checked hal');
//               if(!name.hasOwnProperty("halal")) {                 //food is/not halal
//                 console.log("not halal");
//                 delete copy[hall][meal][name];
//               }
//             }
//             if(vegetarian) {
//               if(!name.hasOwnProperty("vegetarian")) {
//                 console.log("not veg");

//                 delete copy[hall][meal][name];
//               }
//             }
//             if(glutenFree) {
//               if(!name.hasOwnProperty("gluten free")) {
//                 console.log("not glu");

//                 delete copy[hall][meal][name];
//               }
//             }
//           } else {
//             console.log(name);
//             console.log(copy[i][hall]);
//           //  delete name;
//           }
//         }
//       }
//     }
//   }
//   return copy;
// }
/**
 * request results from server and display resultss
 */
async function getResults() {
    let data = await search();
    console.log(data);
    let copy = data;
    console.log(copy);
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
        // console.log(date);
        // console.log(data);
        let dateDiv = document.createElement('div');
      //  dateDiv.classList.add("list-group-item");
        dateDiv.innerText = date;
        document.getElementById(hall).appendChild(dateDiv);

        for(let meal in data[hall]){                     //create a div for each meal, append to date div
            let mealDiv = document.createElement('div');
            mealDiv.innerHTML = meal;
            dateDiv.appendChild(mealDiv);

            for(let item in data[hall][meal]){                              //create a div for each item, append to meal div
                let itemDiv = document.createElement('div');
                itemDiv.innerHTML = item;
                mealDiv.appendChild(itemDiv);
            }
    
        }

    
};

window.onload = initialize;
function initialize(){
    document.getElementById("search").addEventListener("click", getResults)
}
