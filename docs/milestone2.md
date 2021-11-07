# Server API
The script files for each html page need to communicate with the server to retrieve information from the storage JSON. The API does this with the following operations:

/register which allows for a new user to sign up

/login which allows for a user to login

/user is the profile page

/user/favorites/view returns the favorites array

/user/favorites/add adds new items to the favorites array 

/uniques/view returns unique menus of all 4 dining halls

/search a GET function that calls the dining API, filters based on days and filter functions, returns array of objects, each item in the array is a dining item, each object has "item name", "meal of the day", "date" and "dining hall"

# Contributions
Alan:Wrote all of login.js, fixed login.html and login.css, wrote all of profile.js, fixed profile.html and profile.css. Did all initial 
server testing via Postman of every endpoint.
server.js: added cors to the server to override the CORS google chrome security blocking of localhost sites, rewrote /search for 
express, wrote /register, wrote /unique/view, wrote /user/favorites/view/:key, wrote /user/favorites/add, wrote /user/delete/:key.

Ben: Implemented the front end code for project.js and unique.js. Helped to build the structure for searchResults and unique JSON objects for the storage. Helped to build the filter function used by the search feature. Tested and debugged these files. 

Alex: created and implemented the server using express, and implemented the storage to use to store items that help with persistent data being used when users exit off the website, created the heroku. fixed and solved issues and bugs that were throughout moments of this project

# Screenshots
Below is the search page after doing a READ get request to the api to return the search results object

![example image](/img/screenshotSearch.png)

Below is the unique items page after doing a READ get request to the api to return the unique items object

![example image](/img/screenshotUnique.png)


Below is the profile page after correctly doing a DELETE request to the api to delete a user from the database
![example image](/img/profileDeleteAccount.png)

Below is the profile page after correctly doing a UPDATE post request to the api to update an existing array in the database 
![example image](/img/profileAddFavorite.png)

Below is the profile page after correctly doing a READ get request to the api to return an existing array from the database
![example image](/img/profileGetFavorites.png)

Below is the login page after correctly doing a CREATE post request to the api to create a new user in the database
![example image](/img/loginRegister.png)
