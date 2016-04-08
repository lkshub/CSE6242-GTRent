function initMap() {
  var myLatlng = new google.maps.LatLng(33.778016, -84.399205);
  var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 12,

      // The latitude and longitude to center the map (always required)
      center: myLatlng,

      // How you would like to style the map.
      scrollwheel: false,
      disableDoubleClickZoom: true,
      styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using out element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  var image = "https://edbd59990fda786c37199cbfa817ae14fa095ac6-www.googledrive.com/host/0B9FlSDA9hScbVzZjODVUQUFKZHc";

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title:"Georgia Institute of Technology",
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
  // map.addListener('click', function(e) {
  // var marker = new google.maps.Marker({
  //   position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
  //   map: map,
  //   draggable: true,
  //   animation: google.maps.Animation.DROP,
  //   icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  //   });
  // });

  //geocode function
  // geocode = function()
  // {
  //     var address = $('#address').val();
  //     geocoder.geocode( { 'address': address}, function(results, status) {
  //         if (status == google.maps.GeocoderStatus.OK)
  //         {
  //             map.setCenter(results[0].geometry.location);
  //             var marker = new google.maps.Marker({
  //                 map: map,
  //                 position: results[0].geometry.location
  //                 animation: google.maps.Animation.DROP,
  //                 icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  //             });
  //         }
  //         else
  //         {
  //             alert("Geocode was not successful for the following reason: " + status);
  //         }
  //     });
}