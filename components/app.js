var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";
var pageBody = $("body");
var formContainer = document.getElementById("formContainer");
var form = document.getElementById("searchForm");
var button = document.getElementById("searchButton");
var category = document.getElementById("businessSearch");
var newLocation = document.getElementById("locationSearch");
var modalOverlay = document.querySelector(".modal-overlay");
var modalContent = document.querySelector(".modal-content");
var modal = document.querySelector(".modal");
var closeButton = document.querySelector('.close-button');
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
closeButton.addEventListener("click", function(){
  modalOverlay.classList.add("d-none");
})

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
    success: postData,
    error: handleError,
  })
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
    col3.textContent = data.businesses[i].location.address1 + " " + data.businesses[i].location.city + ", " + data.businesses[i].location.state + " " + data.businesses[i].location.zip_code;
    row.append(col1, col2, col3);
    tBody.append(row);
    resultTable.classList.remove("d-none");
    if (!data.businesses[i].display_phone){
      col2.textContent = "Not Listed";
    }
    if (!data.businesses[i].location.address1) {
      col3.textContent = " " + data.businesses[i].location.city + ", " + data.businesses[i].location.state + " " + data.businesses[i].location.zip_code;
    }
  }
  getImage();
}

function hideLanding (){
  if (event.target) {
    form.classList.add("d-none")
    var landingPage = document.getElementById("landingPage");
    landingPage.classList.remove("background-image");
    landingPage.classList.add("new-background-image");
    var headerTitle = document.querySelector(".header-title");
    headerTitle.classList.add("new-header-title");
  }
}

function handleError (error) {
  console.log(error);
  // errorText.textContent = "UH OH! Something Went Wrong!";
  errorText.classList.remove("hide");
  formContainer.classList.add("d-none");
}

// Image Search

function getImage(){
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=" + gKey + "&tag=funny sports motivational&rating=G",
    method: "GET",
    success: postGif,
    error: function(error){
      console.log(error);
      // errorText.textContent = "UH OH! Something Went Wrong!", error;
      // errorText.classList.remove("hide");
    },
  })
}

function postGif(result){
  console.log("Gif url", result.data.image_original_url);
  modalContent.style.backgroundImage = "url(" + result.data.image_original_url + ")";
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
    getLoadingModal();
  },
  ajaxStop: function () {
    pageBody.removeClass("loading");
  },
});

function getLoadingModal (){
  modal.style.backgroundImage = "url('https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif')";
}
