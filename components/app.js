// yKey
// gKey

var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";

var form = document.getElementById("searchForm");
var button = document.getElementById("searchButton");
var category = document.getElementById("businessSearch");
var newLocation = document.getElementById("locationSearch");
form.addEventListener("submit", function(event){
  event.preventDefault();
  getSearch();
  // updateSearch();
  event.target.reset();
});
form.addEventListener("keyup", function () {
  if (category.value && newLocation.value) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
});

// Search Functionality

function getSearch(){
  var myCategory = category.value;
  var myLocation = newLocation.value;
  $.ajax({
    url: baseURL + "businesses/search?limit=15&offset=0&term=" + myCategory + "&location=" + myLocation + "",
    method: "GET",
    headers: {
      "Authorization": "Bearer " + yKey,
    },
    success: function(data){
      var tBody = document.querySelector(".tbody");
      var resultTable = document.getElementById("resultTable");
      tBody.textContent = "";

      for (var i = 0; i < data.businesses.length; i++) {
        console.log(data.businesses[i].name);
        console.log(data.businesses[i].display_phone);
        console.log(data.businesses[i].location);
        var row = document.createElement("tr");
        var col1 = document.createElement("td");
        var col2 = document.createElement("td");
        var col3 = document.createElement("td");
        col1.textContent = data.businesses[i].name;
        col2.textContent = data.businesses[i].display_phone;
        col3.textContent = data.businesses[i].location.address1 + " " + data.businesses[i].location.city + ", " + data.businesses[i].location.country + " " + data.businesses[i].location.zip_code;
        row.append(col1, col2, col3);
        tBody.append(row);
        resultTable.classList.remove("hidden");
      }
    },
    error: function (error) {
      console.log(error);
    },
  })
  // console.log(data);
  // console.log(myCategory, myLocation);
  hideLanding();
}

function hideLanding (){
  if (event.target) {
    form.classList.add("hidden")
    var landingPage = document.getElementById("landingPage");
    landingPage.classList.remove("background-image");
    landingPage.classList.add("new-background-image");
    var headerTitle = document.querySelector(".header-title");
    headerTitle.classList.add("new-header-title");
    // console.log("it is hidden");
  }
}

// Image Search

function getImage(){
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=" + gKey + "&tag=Motivation&rating=G",
    method: "GET",
    success: function(result){
      console.log(result);
    },
    error: function(error){
      console.log(error);
    },
  })
}
