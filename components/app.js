var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";
var pageBody = $("body");
var form = document.getElementById("searchForm");
var button = document.getElementById("searchButton");
var category = document.getElementById("businessSearch");
var newLocation = document.getElementById("locationSearch");
var modal = document.querySelector(".modal");
var errorText = document.querySelector(".error-text");
form.addEventListener("submit", function(event){
  event.preventDefault();
  getSearch();
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
      postData(data);
    },
    error: function (error) {
      console.log(error);
      // getErrorImage();
      errorText.classList.remove("hide");
    },
  })
  // console.log(data);
  // console.log(myCategory, myLocation);
  hideLanding();
}

function postData (data) {
  var tBody = document.querySelector(".tbody");
  var resultTable = document.getElementById("resultTable");

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
      console.log(result.data.image_original_url);
      modal.style.backgroundImage = "url(" + result.data.image_original_url + ")";
    },
    error: function(error){
      console.log(error);
      errorText.classList.remove("hide");
    },
  })
}

// function getErrorImage(){
//   $.ajax({
//     url: "https://api.giphy.com/v1/gifs/random?api_key=" + gKey + "&tag=Uh Oh&rating=G",
//     method: "GET",
//     success: function (result) {
//       console.log(result.data.image_original_url);
//       errorText.style.backgroundImage = "url(" + result.data.image_original_url + ")";
//     },
//     error: function (error) {
//       console.log(error);
//       errorText.classList.remove("hide");
//     },
//   })
// }

// Loading Modal

$(document).on({
  ajaxStart: function () {
    pageBody.addClass("loading");
    getImage();
  },
  ajaxStop: function () {
    pageBody.removeClass("loading");
  },
});
