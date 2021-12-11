# Team Epsilon
## UDine
## Fall 2021

# Overview
Why UDine? You dine because UMASS Dining is a world class college dining experience with a diverse selection of menu items from all around the globe. A world class dining experience requires a world class website, and that is what UDine seeks to provide  current, former, and prospective students of UMASS Amherst. Unlike the official UMASS dining website, UDine allows students to more easily decide where and what they want to eat. Searching a specific menu items will show where that item can be found on campus. Users can filter out items that are not "vegetarian," "whole grain," or "halal." Additionally, users can also find the unique daily items for each of the four dining halls in order to more easily isolate the "daily specials" from regularly recurring menu items. Finally, users can create a profile and add their favorite items to a list, to quickly access these later. We hope that this website will enable our users to have a more unique dining experience in which they can fully appreciate the range of options that UMASS dining has to offer. 

# Team Members
## Alex Zheng
sazzle2
## Alan Tang
altang23
## Ben Daggett
bdaggett8888

# User Interface
## index.html
This page allows users to search for menu items based on keyword and filter out certain types of foods. It displays a list of items that match the keyword for each dining hall, displaying their title, date and meal of the day.
![example image](/img/final/index.jpg)

## unique.html
This page displays the daily unique items for each dining hall, so each breakfast will have breakfast items unique to that hall, etc. 
![example image](/img/final/unique.jpg)

## login.html
This page allows users to login and access their profile or to go to the registration page
![example image](/img/final/login.jpg)

## register.html
This page allows users to create a profile
![example image](/img/final/register.jpg)

## profile.html
This page allows users to add and view favorites
![example image](/img/final/profile.jpg)

# Server API
The script files for each html page need to communicate with the server to retrieve information from the databse. The API does this with the following operations:

/register - POST: takes request as a {username, password, favorites} to make a new username and password in the “logins” object within the database

/register - GET: access the register.html file 

/login - POST: checks that uername and password is authenticated using passport authenticate. Redirects to login if authenticate fails and profile if authenticate works

/login - GET: access the login.html file

/profile - GET: redirects to the user profile

/user/favorites/view/ GET - gets the favorites for the currently logged in user

/user/favorites/add POST - takes a request as a string and adds it to the string array in their favorites 

user/delete/ - DELETE: deletes the user who is currently logged in from the database and sending back to login page

/unique/view - GET: takes request and returns the daily unique items object

/search a POST function that calls the dining API, filters based on days and filter functions, returns array of objects, each item in the array is a dining item, each object has "item name", "meal of the day", "date" and "dining hall"

# Database
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

# URL Routes/Mappings
- *https://umassdining.herokuapp.com/index.html* 
  - this is the main page where users can search for items
  - this page is accessed when the user clicks the search button on unique.html or the user profile page
- *https://umassdining.herokuapp.com/unique.html*
  - this page display daily unique items
  - this page is accessed when the user clicks the unique button on index.html or the user profile page
- *https://umassdining.herokuapp.com/login.html*
  - this page is where the user logs into their profile
  - this page is accessed when the user clicks the profile button on unique.html and when the user successfully registers a profile
- *https://umassdining.herokuapp.com/register.html*
  - this page is where the user creates a profile
  - this page is accessed when the user clicks the register button on login.html or when they register incorrectly
- *https://umassdining.herokuapp.com/profile.html*
  - this is the profile page where users access their favorites
  - this page is accessed when the user successfully logs in

# Authentication/Authorization
User passwords are hashed with minicrypt and the passwords and usernames are authenticated using passport. The user profile page and favorites list can only be accessed with authentication. 

# Division of Labor
## Alan
  - Large portion of html and css for each page
  - sliding text CSS animation
  - Background change functionality
  - Search function in index.js
  - getFavorites, addFavorite, and deleteAccount functions in profile.js
  - getUnique function for unique.js
  - Initial API endpoints predatabase and preMongoDB
  - Helped to restructure new profile endpoint calls for user functions in new miniCrypt authentication structure
  - Finalized the working of user/favorites/view endpoint
  - general bugfixing and cleaning
  
## Alex
  - good portion of html and css for each page
  - text color change functionality
  - search backend functionality in server.js
  - worked login and all profile functionality including html changes
  - ^ this includes newly made buttons as well as smoother login process
  - created and initialized mongoDB and all mongoDB searches
  - handled all endpoints (some were fixed)
  - general bugfixing and cleaning
  
## Ben
  - layout of dining hall cards in unique.html, index.html, unique.css, index.css
  - created logo for the site and added to each html page
  - filter, getResults, display helper, initialize in index.js
  - getUnique, display helper in unique.js
  - set up passport and minicrypt in server.js, integrated them into the /login and /register endpoints
  - worked on authentication communication with database
  - worked on generating user profile html page
  - edited login.html, register.html to work with authentication and send post requests from user input
  - fixed and maintained dependencies in package.json and package-lock.json
  - maintaining heroku and fixing any deployment problems
  
# Conclusion
Ultimately this project was very educational in terms of teaching about the process of developing something more than a simple "toy" program. It also helped introduce us to the nuts and bolts of web development the reality of the situation in regards to modern web development tools. We would have liked more timely learning of the connection between databases and node.js servers, specifically surrounding the due date for HW10 and milestone 3. Generally, we learned a lot about the full stack process.
