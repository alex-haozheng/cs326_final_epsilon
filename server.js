
const express = require('express');
// import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('its over!'));
app.listen(process.env.PORT || () => console.log(`Example app listening at http://localhost:${port}`));
// 'use strict';
// let http = require('http');
// let url = require('url');
// let fs = require('fs');
// const express = require('express');
//  import express from 'express';
// const app = express();
// app.use(express.static('public'));

// app.use(express.json()); // lets you handle JSON input

// const port = 8080;

// let datastore = {
//   "uniques":{
//      "berkshire": {
//          "breakfast": ["pancakes", "sausages", "eggs"],
//          "lunch": ["pizza", "burgers", "french fries"],
//          "dinner": ["fish", "spaghetti", "chicken pot pie"]
//      },
//      "franklin": {
//          "breakfast": ["waffles", "sausages", "eggs"],
//          "lunch": ["pasta", "burgers", "french fries"],
//          "dinner": ["pork", "spaghetti", "chicken pot pie"]
//      },
//      "hampshire": {
//          "breakfast": ["biscuits", "sausages", "eggs"],
//          "lunch": ["soup", "burgers", "french fries"],
//          "dinner": ["turkey", "spaghetti", "chicken pot pie"]
//      },
//      "worcester": {
//          "breakfast": ["danish", "sausages", "eggs"],
//          "lunch": ["ribs", "burgers", "french fries"],
//          "dinner": ["fish", "spaghetti", "chicken pot pie"]
//      }
//   },

//   "logins": {
//       "user1": "pass1",
//       "user2": "pass2",
//       "user3": "pass3"
//   },

//   "profiles":{
//       "user1": ["fav1", "fav2"],
//       "user2": ["fav3", "fav4"],
//       "user3": ["fav5", "fav6"] 
//   },
//   "food":[
//       {
//         "berkshire": {
//             "breakfast": {
//                 "waffles": {
//                     "halal": true,
//                     "vegetarian": true
//                 },
//                 "sausages": {
//                 },
//                 "eggs": {
//                     "halal": true
//                 }
//             },
//             "lunch": {
//                 "pasta": {
//                     "halal": true,
//                     "vegetarian": true
//                 },
//                 "burgers": {
//                 },
//                 "french fries": {
//                     "vegetarian": true
//                 }
//               },
//               "dinner": {
//                 "pasta": {
//                     "halal": true,
//                     "vegetarian": true
//                 },
//                 "spaghetti": {
//                     "vegetarian": true,
//                     "gluten free": true
//                 },
//                 "chicken pot pie": {
//                     "halal": true
//                 }
//               }
//           },
//           "franklin": {
//           },
//           "hampshire": {
//           },
//           "worcester": {
//           }
  
//       }
//     ]
// };
// // const JSONfile = './storage.json';

// // function reload(filename) {
// //   if (fs.existsSync(filename)) {
// //     return JSON.parse(fs.readFileSync(filename));
// //   } else {
// //     return {
// //       unique: {},
// //       logins: {},
// //       profiles: {},
// //       food: {}
// //     };
// //   }
// // }

// app.get('/search', async (req, res) => {
//   // datastore = reload(JSONfile);
//   res.send(datastore.food);
// });

// // req: {"username": "user1", "password": "pass1"}
// app.post('/register', (req, res) => {
//   // datastore = reload(JSONfile); //reload function causing the pages to function weird
//   let username = req.body.username;
//   let password = req.body.password;
//   if(!datastore["logins"][username]) {
//     datastore["logins"][username] = password;
//     datastore["profiles"][username] = [];
//   }
//   fs.writeFileSync(JSONfile, JSON.stringify(datastore));
//   res.end();
// });

// app.get('/unique/view', (req, res) => {
//   // datastore = reload(JSONfile);
//   res.send(datastore["uniques"]);
// });

// app.get('/user/favorites/view/:key', (req, res) => {
//   // datastore = reload(JSONfile);
//   let username = req.params.key;
//   // if(datastore.profiles[username] === undefined) {
//   //   //make response be not ok / display error message
//   //   res.end('no user exists');
//   // }
//   res.send(datastore.profiles[username]);
//   res.end();
// });

// // req: {"username": "user1", "item": "chicken"}
// app.post('/user/favorites/add', (req, res) => {
//   // datastore = reload(JSONfile);
//   let username = req.body.username;
//   let item = req.body.item;
//   // if(datastore.profiles[username] === undefined) {
//   //   //make response be not ok / display error message
//   //   res.end('no user exists');
//   // }
//   datastore.profiles[username].push(item);
//   fs.writeFileSync(JSONfile, JSON.stringify(datastore));
//   res.end();
// });

// // should work 100% :)
// app.delete('/user/delete/:key', (req, res) => {
//   // datastore = reload(JSONfile);
//   let user = req.params.key;
//   delete datastore["logins"][user];
//   delete datastore["profiles"][user];
//   fs.writeFileSync(JSONfile, JSON.stringify(datastore));
//   res.end();
// });

// app.listen(process.ENV.PORT || port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
