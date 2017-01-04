var app = function(){
  populateLists();
};

var selectChanged = function(){
  console.log("select changed");
};

var populateLists = function(){
  var url = 'http://restcountries.eu/rest/v1';
  makeRequest(url, requestComplete);
};

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
  var countries = JSON.parse(jsonString);
  var country = countries[0];
  populateList(countries);
};



var populateList = function(countries){
  var select = document.querySelector('#countries');

  countries.forEach(function(country, index){

    country.index = index;

    var option = document.createElement('option');
    option.value = index.toString();
    option.text = country.name;
    select.appendChild(option);
  });

  select.style.display = 'block';

  select.addEventListener('change', function(event){
    var index = this.value;
    var country = countries[index];
    console.log(country);
    updateDisplay(country);
  });
};

var updateDisplay = function(country){
  var pTag = document.querySelectorAll('#countriesinfo p');
  pTag[0].innerText = country.name;
  pTag[1].innerText = country.population;
  pTag[2].innerText = country.capital;
  var coords = {lat: country.latlng[0], lng: country.latlng[1]};
  initMap(coords);
};

var initMap = function(coords){
  var container = document.getElementById('map');
  var map = new google.maps.Map(container, {center: coords, zoom: 3});
  var marker = new google.maps.Marker({
    position: coords, 
    map: map, 
  });
};



window.onload = app;