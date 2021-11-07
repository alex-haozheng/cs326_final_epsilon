'use strict';
const express = require('express');
// import express from 'express';
const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 8080;

const datastore = {
  "uniques":{
      "berkshire": {
          "breakfast": ["pancakes", "sausages", "eggs"],
          "lunch": ["pizza", "burgers", "french fries"],
          "dinner": ["fish", "spaghetti", "chicken pot pie"]
      },
      "franklin": {
          "breakfast": ["waffles", "sausages", "eggs"],
          "lunch": ["pasta", "burgers", "french fries"],
          "dinner": ["pork", "spaghetti", "chicken pot pie"]
      },
      "hampshire": {
          "breakfast": ["biscuits", "sausages", "eggs"],
          "lunch": ["soup", "burgers", "french fries"],
          "dinner": ["turkey", "spaghetti", "chicken pot pie"]
      },
      "worcester": {
          "breakfast": ["danish", "sausages", "eggs"],
          "lunch": ["ribs", "burgers", "french fries"],
          "dinner": ["fish", "spaghetti", "chicken pot pie"]
      }
  },

  "logins": {
      "user1": "pass1",
      "user2": "pass2",
      "user3": "pass3"
  },

  "profiles":{
      "user1": ["fav1", "fav2"],
      "user2": ["fav3", "fav4"],
      "user3": ["fav5", "fav6"] 
  },
  
  "food":[
      {
          "berkshire": {
              "breakfast": {
                  "name1": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": false    
                  }
              },
              "lunch": {
                  "name2": {
                      "Halal": false,
                      "Vegetarian": false,
                      "Gluten Free": false    
                  }
              },
              "dinner": {
                  "name3": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              }
          },
          "franklin": {
              "breakfast": {
                  "name1": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "lunch": {
                  "name2": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "dinner": {
                  "name3": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              }
          },
          "hampshire": {
              "breakfast": {
                  "name1": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "lunch": {
                  "name2": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "dinner": {
                  "name3": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              }
          },
          "worcester": {
              "breakfast": {
                  "name1": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "lunch": {
                  "name2": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              },
              "dinner": {
                  "name3": {
                      "Halal": true,
                      "Vegetarian": true,
                      "Gluten Free": true    
                  }
              }
          }
  
      }
    ]
  
};


const JSONfile = 'storage.json';




async function search(obj, req) {
  let keyword = req.body.keyword;
  let days = req.body.days;
  let halal = req.body.halal;
  let vegetarian = req.body.vegetarian;
  let glutenFree = req.body.glutenFree;
  let o = JSON.parse(JSON.stringify(obj));
  for(let i = 0; i <= days; ++i) {
    for (let hall in obj.food[i]) {
      for (let meal in hall) {
        for (let name in meal) {
          if (name.includes(keyword)) {
            let tags = o[hall][meal][name];
            if(halal) {
              if(!tags.halal) {
                delete o[hall][meal][name];
              }
            }
            if(vegetarian) {
              if(!tags.vegetarian) {
                delete o[hall][meal][name];
              }
            }
            if(glutenFree) {
              if(!tags.glutenFree) {
                delete o[hall][meal][name];
              }
            }
          } else {
            delete o[hall][meal][name];
          }
        }
      }
    }
  }
  return o;
}


app.get('/search', async (req, res) => {
  res.send(datastore["food"]);
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]){
    datastore["logins"][username] = password;
    datastore["profiles"][username] = [];
  }
  res.send(res.statusCode);
});

app.get('/unique/view', (req, res) => {
  res.send(datastore["uniques"]);
});

app.get('/user/favorites/view/:key', (req, res) => {
  let name = req.params.key;
  res.send(datastore.profiles[name]);
});

// req: {"username": "user1", "item": "chicken"}
app.post('/user/favorites/add', (req, res) => {
  let username = req.body.username;
  let item = req.body.item;
  datastore["profiles"][username].push(item);
  res.send(res.statusCode);
});

app.delete('/user/delete/:key', (req, res) => {
  let user = req.params.key;
  delete datastore["logins"][user];
  delete datastore["profiles"][user];
  res.send(res.statusCode);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
