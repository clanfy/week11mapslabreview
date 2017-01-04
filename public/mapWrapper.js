var mapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(container,
  {
    center: center,
    zoom: zoom
  }
  );
};

mapWrapper.prototype = {

  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords, 
      map: this.googleMap
    });
  }
};