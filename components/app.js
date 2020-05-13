// yKey
// gKey

// var corsURL = "https://cors-anywhere.herokuapp.com/"
var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";
var urlParameter = "businesses/search?limit=50&offset=330&term=restaurants&location=LA"
// var settings = {
//   url: baseURL+urlParameter,
//   method: "GET",
//   headers: {
//   "Authorization": "Bearer " + yKey,
//   },
//   success: logResult,
//   error: logError,
// }
// console.log(baseURL+urlParameter);

function getSearch(category, location){
  $.ajax({
    url: baseURL + "businesses/search?limit=50&offset=330&term=" + category + "&location=" + location + "",
    method: "GET",
    headers: {
      "Authorization": "Bearer " + yKey,
    },
    success: logResult,
    error: logError,
  })
}

// function getSearch (){
//   $.ajax(settings);
// }

function logResult(result){
  console.log("Success!", result);
}

function logError(error){
  console.log("UH OH!", error);
}
