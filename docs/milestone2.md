# Server API
The script files for each html page need to communicate with the server to retrieve information from the storage JSON. The API does this with the following operations:
endpoints

/register - POST: takes request as a username:password key-value pair to make a new username and password in the “logins” object within datastore(writefilesync)
Example: {“user1”:”pass1”}, will lead to datastore[“logins”][“user1”] = “pass1”

/user/favorites/view/:key GET - takes request as a string ‘username’ and returns the list of datastore.profile string array (readfilesync)

/user/favorites/add POST - takes a request as a string and adds it to datastore.profile string array(writefilesync)

user/delete/:key - DELETE: takes request of {username:password} and removes that key value pair from the datastore[“logins”] using delete() (writefilesync)

/unique/view - GET: takes request and returns the daily unique items object

/search a GET function that calls the dining API, filters based on days and filter functions, returns array of objects, each item in the array is a dining item, each object has "item name", "meal of the day", "date" and "dining hall"

# Contributions
Alan:Wrote all of login.js, fixed login.html and login.css, wrote all of profile.js, fixed profile.html and profile.css. Did all initial 
server testing via Postman of every endpoint.
server.js: added cors to the server to override the CORS google chrome security blocking of localhost sites, rewrote /search for 
express, wrote /register, wrote /unique/view, wrote /user/favorites/view/:key, wrote /user/favorites/add, wrote /user/delete/:key.

Ben: Implemented the front end code for project.js(search, getResults, display, initialize) and unique.js(getUnique and helper). Helped to build the structure for searchResults and unique JSON objects for the storage. Helped to build the filter function used by the search feature and integrate it into the the rest of the front end code. Tested and debugged these files. Contributed to markdown file

Alex: created and implemented the server using express, and implemented the storage to use to store items that help with persistent data being used when users exit off the website, created the heroku. Helped build filter. fixed and solved issues and bugs that were throughout moments of this project

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

# heroku link
https://protected-retreat-63927.herokuapp.com/