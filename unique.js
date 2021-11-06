

async function getFavorites() {
    let u = document.getElementById("username").value;
    let response = await fetch('/unique/view',{
        method: 'GET',
        body: u
    })

    if (response.ok) {

    } 
    else {
        alert("An error has occured.");
    }
}

