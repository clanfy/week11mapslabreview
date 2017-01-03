var app = function(){

populateLists();



select.onchange = selectChanged;

};

var selectChanged = function(){
  console.log("select changed");
};

var populateLists = function(){
  var url = 'http://restcountries.eu/rest/v1';
  makeRequest(url, requestComplete);
};

/*
  1. create a new XMLHttpRequest object
  2. set the type of request we want with the url we want to call
  3. set the callback we want it to use when it has completed the call
  4. send the request 
*/

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  console.log("Whoot!");
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  // console.log("json string", jsonString);
  var countries = JSON.parse(jsonString);
  // console.log("countries", countries);
  var country = countries[0];
  // console.log("country", country);
  populateList(countries);
};



var populateList = function(countries){
  var select = document.querySelector('#countries');

  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  });
};


window.onload = app;