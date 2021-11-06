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
  
  "food":{
      "date1": {
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
  }
  
};

const JSONfile = 'storage.json';




async function search() {
  let berk = await berk();
  let hamp = await hamp();
  let woo = await woo();
  let frank = await frank();

}

// ['search', int, true, false, true]
app.get('/search', async (req, res) => {
  const o = JSON.parse(JSON.stringify())
  o = await search(datastore, arr);
  res.end(o);
});

// req: {"username": "user1", "password": "pass1"}
app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(!datastore["logins"][username]){
    datastore["logins"][username] = password;
    datstore["profiles"][username] = [];
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
