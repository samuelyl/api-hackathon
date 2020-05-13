// yKey
// gKey

var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";
// var urlParameter = "businesses/search?limit=50&offset=330&term=restaurants&location=LA";

var form = document.getElementById("searchForm");
var button = document.getElementById("searchButton");
form.addEventListener("submit", handleForm);
button.addEventListener("click", getSearch);

// Form handler

function handleForm(event){
  event.preventDefault();
  event.target.reset();
}

// Search Functionality

function getSearch(){
  var category = document.getElementById("businessSearch").value;
  var location = document.getElementById("locationSearch").value;
  // $.ajax({
  //   url: baseURL + "businesses/search?limit=20&offset=0&term=" + category + "&location=" + location + "",
  //   method: "GET",
  //   headers: {
  //     "Authorization": "Bearer " + yKey,
  //   },
  //   success: logResult,
  //   error: logError,
  // })
  // console.log(category, location);
  if(event.target) {
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
    success: logResult,
    error: logError,
  })
}

function logResult(result){
  console.log("Success!", result);
}

function logError(error){
  console.log("UH OH!", error);
}


// Update Search

function updateSearch(){

}
