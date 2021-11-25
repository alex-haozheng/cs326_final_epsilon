# Database Outline:
## Total Database is UDine with 2 collections: food and logins

## food example 
{"_id":{"$oid":"619dc15117abe6dbd84d594f"}, // this is the mongoDB autocreated id

"name":"Chicken Congee", // this is the name of the dish

"hall":"Franklin", // this is the dining hall the item is at

"meal":"Lunch"," // this is the meal of the day 

date":"11/21/2021", //this is the date that this item is available

"halal":"No", //this indicates with a "yes" or no if the item is halal

"vegetarian":"No", //this indicates with a "yes" or no if the item is vegetarian

"whole-grain":"No"} //this indicates with a "yes" or no if the item is whole grain




## logins example
{"_id":{"$oid":"619db4ffd539918eb6b1a169"}, // this is the mongoDB autocreated id

"username":"user1", //this is the username of the user

"password":"pass1", // this is the associated password of the user

"favorites":["Chocolate Chip Pancakes","Semolina Cake"]} // favorites are stored as arrays of strings



# Division of Labor:

## Alan: 
made a get unique function (unfinished) , all of routing in html, started getUnique search, fixed href of favicons, added some buttons, made register/ login page, set up search function to work with the database

## Alex: 
set up mongoDB and connected the endpoints in server to requried database collections, worked on setting up register passwords, search, and getunique functions to work with the database 
## Ben: 
heroku deployment, fixed several bugs related to incorrect package-log dependencies, set up passport requirements, edited the login.html and register.html to work with passport, changed some localhost issues in server.js

