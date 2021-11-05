'use strict';
const filename = 'storage.json';

let datastore = {
    uniques: {},
    logins: {},
    profiles: {},
};

function getResults(){

}


function search(word){
    let results = getResults(word);
    results = filter1(bool1, results);
    results = filter2(bool2, results);
    results = filter3(bool3, results);
    results = filter4(bool4, results);
    return results;
}

function reload(filename) {
    if (fs.existsSync(filename)) {
        let someStr = fs.readFileSync(filename);
        datastore = JSON.parse(someStr);
    }
    else {
        let datastore = {
            uniques: {},
            logins: {},
            profiles: {},
        };
    }
}




let server = http.createServer();
server.on('request', async (request, response) => {
    reload(filename);
    if (request.url.startsWith("/register")) {
        register(request, response);
        return;
    }
    
    response.end();
});
server.listen(8080);


//example datastore that is already filled/partially filled
// {"todayUniques":{
//         "berkshire": {
//             "breakfast": ["pancakes", "sausages", "eggs"],
//             "lunch": ["pizza", "burgers", "french fries"],
//             "dinner": ["fish", "spaghetti", "chicken pot pie"]
//         },
//         "franklin": {
//             "breakfast": ["waffles", "sausages", "eggs"],
//             "lunch": ["pasta", "burgers", "french fries"],
//             "dinner": ["pork", "spaghetti", "chicken pot pie"]
//         },
//         "hampshire": {
//             "breakfast": ["biscuits", "sausages", "eggs"],
//             "lunch": ["soup", "burgers", "french fries"],
//             "dinner": ["turkey", "spaghetti", "chicken pot pie"]
//         },
//         "worcester": {
//             "breakfast": ["danish", "sausages", "eggs"],
//             "lunch": ["ribs", "burgers", "french fries"],
//             "dinner": ["fish", "spaghetti", "chicken pot pie"]
//         }
    
//     },

//     "logins": {
//         "user1": "pass1",
//         "user2": "pass2",
//         "user3": "pass3"
//     },

//     "profiles":{
//         "user1": ["fav1", "fav2"],
//         "user2": ["fav3", "fav4"],
//         "user3": ["fav5", "fav6"] 
//     }
// }
    

