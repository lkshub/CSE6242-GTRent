// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var map;
var markers=[];
var infowindows=[];
var queryResult=[];
var mapCenter;
var mapZoom=12;
var blueicon = {
        url:'./images/room_blue_36x36.png',
      }
var redicon = {
  url:'./images/room_red_48x48.png',
}
var testQueryRes=[{"commutingStyle":"driving","drivingTime":1200,"name":"Walton River","address":"2550 Akers Mill Rd SE","lat":33.778016,"lon":-84.399205,"webSite": "www.www.com","zipCode":"30339","floorPlans":[{ "bed":1,"bath":1.0,"price":950,"sqft":800},{ "bed":1,"bath":1.0,"price":1000,"sqft":900 }],"propertyType":"Apartment","crimeScore":90,"foodScore":90,"gasScore":90,"entertainmentScore":90,"cluster":1},{"commutingStyle":"driving","commutingTime":"20min","name":"Walton River2","address":"2550 Akers Mill Rd SE","lat":33.778016,"lon":-84.5,"webSite": "www.www.com","zipCode":"30339","floorPlans":[{ "bed":1,"bath":1.0,"price":950,"sqft":800},{ "bed":1,"bath":1.0,"price":1000,"sqft":900 }],"propertyType":"Apartment","crimeScore":90,"foodScore":90,"gasScore":90,"entertainmentScore":90,"cluster":1}];
function initAutocomplete() {
  var myLatlng = new google.maps.LatLng(33.778016, -84.399205);
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatlng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    //scrollwheel: false,
    //scaleControl: false,
    disableDoubleClickZoom: true,
    styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]

  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function clearMarker(){
  setMapOnAll(null);
  markers=[];
}
var getFilters = function(){
    if ($("#Driving").hasClass('choosed')){
      commutingStyle = "driving";
    }
    else{
      if ($("#Walking").hasClass('choosed')){
        commutingStyle = "walking";
      }
      else{
        commutingStyle = "transit";
      }
    }

    var commutingTime = new Array([$("#sliderMin").text(), $("#sliderMax").text()])
    // alert(commutingTime);

    $("#bed-show").text($("#bed").val())
    $("#bath-show").text($("#bath").val())
    var floorPlan = new Array([$("#bed").val(), $("#bath").val()])
    // alert(floorPlan);

    $("#priceMin-show").text($("#rental-payment-min").val());
    $("#priceMax-show").text($("#rental-payment-max").val());
    var priceRange = new Array([$("#rental-payment-min").val(), $("#rental-payment-max").val()])
    // alert(priceRange);

    var types = new Array()
    if ($("#Apartment").is(':checked')){
      types.push(true);
    }
    else{
      types.push(false);
    }
    if ($("#House").is(':checked')){
      types.push(true);
    }
    else{
      types.push(false);
    }
    if ($("#Condo").is(':checked')){
      types.push(true);
    }
    else{
      types.push(false);
    }
    if ($("#Townhouse").is(':checked')){
      types.push(true);
    }
    else{
      types.push(false);
    }
    //$("#propertyType-show").text(types[0] + " " + types[1] + " " + types[2] + " " + types[3]);
    var propertyType = types;
    // alert(propertyType);

    var life = new Array()
    if ($("#Food").is(':checked')){
      life.push(true);
    }
    else{
      life.push(false);
    }
    if ($("#Gas").is(':checked')){
      life.push(true);
    }
    else{
      life.push(false);
    }
    if ($("#Entertainment").is(':checked')){
      life.push(true);
    }
    else{
      life.push(false);
    }
    //$('#lifeConvenience-show').text(life[0] + " " + life[1] + " " + life[2] + " " + life[3]);
    var lifeCon = life;
    // alert(lifeCon);

    var filter={
      "commutingStyle":commutingStyle,
      "commutingTimeMin":commutingTime[0][0],
      "commutingTimeMax":commutingTime[0][1],
      "bed":floorPlan[0][0],
      "bath":floorPlan[0][1],
      "priceMin":parseInt(priceRange[0][0]),
      "priceMax":parseInt(priceRange[0][1]),
      "Apartment":propertyType[0],
      "House":propertyType[1],
      "Condo":propertyType[2],
      "Townhouse":propertyType[3],
      "Food":lifeCon[0],
      "Gas":lifeCon[1],
      "Entertainment":lifeCon[2]
    };

    return filter;
  }

  var addContent = function(content,dataArray){
    var latsum=0;
    var lonsum=0;
    dataArray.forEach(function(data,index){
      latsum=latsum+data["lat"];
      lonsum=lonsum+data["lon"];
      //console.log(data);
      var infowindow = new google.maps.InfoWindow({
        content: data["name"],
      });
      infowindows.push(infowindow);
      var location  = new google.maps.LatLng(data["lat"],data["lon"]);
      var marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        icon:blueicon
      })
      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });
      marker.addListener('mouseout', function() {
        infowindow.close(map,marker);
      });
      markers.push( marker);
      var id="content-"+(index+1).toString();
      var thisArticle = $('<article>').attr({"id":id,"onmouseenter":"focusOn(this)","onmouseleave":"focusOut(this)","onclick":"showDetailWin(this)"});
      var name = $('<h3>').text(data["name"]);
      var address = $('<p>').text(data["address"]+", "+data["zipCode"]);
      var priceTable=$("<table>");
      data["floorPlans"].forEach(function(plan){
        var list = $("<tr>");
        $('<th>').text(plan["bed"]+" Bedrooms").appendTo(list);
        $('<th>').text(plan["bath"]+" Bath").appendTo(list);
        $('<th>').text("$"+plan["price"].toString()).appendTo(list);
        $('<th>').text(plan["sqft"].toString()+" Sqft").appendTo(list);
        list.appendTo(priceTable);
      })
      priceTable.appendTo(thisArticle);
      var link = $("<a>").text("Listing on Zillow.com");
      link.attr("herf",data["webSite"]);
      var website = $("<p>").append(link);
      thisArticle.append(website);
      thisArticle.prepend(address);
      thisArticle.prepend(name);
      content.append(thisArticle);
    })
    mapCenter = new google.maps.LatLng(latsum/dataArray.length,lonsum/dataArray.length);
  }

  var searchForDetail = function(filter){ //The input is a json file
    console.log("create post is working!") // sanity check
      $.ajax({
          url : "/gtrent", // the endpoint
          type : "GET", // http method
	  dataType: "json",
          data : filter, // data sent with the post request

          // handle a successful response
          success : function(json) {
              //$('#post-text').val(''); // remove the value from the input
              console.log(json); // log the returned json to the console
              console.log("success"); // another sanity check
              return ;
          },
          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              //$('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
              //    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log("failed"); // provide a bit more info about the error to the console
        }
    });
  }
  var hideContent=function(){

    $("#content").animate({
      height:'20px',
      opacity: 1,
    },500)
    //$("#content").css({"overflow":"hidden"});
    $('#content').addClass('hidden2');
  }

  var showContent = function(){
    $("#content").animate({
          height:'500px',
          width:"300px",
          opacity: 1,
        },800)
    //$("#content").css({"overflow":"scroll"});
    $("#content").removeClass('hidden2')
  }

$("#hideContent").click(function(){
      if (! $("#content").hasClass('hidden2')){
        hideContent()
      }
      else{
        showContent();
      }
    });

$('#apply').click(function(){
  if ($('#content').hasClass('hidden2')){
    showContent();
  }
  $("#filter").animate({
      width:'0px',
      opacity: 0,

  },800)
  $("#filterTag img").removeClass('clicked')

  queryResult = searchForDetail(getFilters());
  clearMarker();
  $("#content").children("article").remove();
  // var filter  = getFilters();
  addContent($("#content"),queryResult);
  setMapOnAll(map);
  map.panTo(mapCenter);
})
var focusOn=function(element){
  console.log("over");
  $(element).parent("div").css("opacity","0.8");
  $("#detailWin").css("opacity","0.5");
  $(element).addClass("focused");
  var id=parseInt(element.id.split("-")[1]);
  markers[id-1].setIcon(redicon);
  infowindows[id-1].open(map,markers[id-1]);
  map.panTo(markers[id-1].position);
}
var focusOut=function(element){
  console.log("out");
  $(element).parent("div").css("opacity","1");
  $("#detailWin").css("opacity","1");
  $(element).removeClass("focused");
  var id=parseInt(element.id.split("-")[1]);
  markers[id-1].setIcon(blueicon);
  infowindows[id-1].close(map,markers[id-1]);
}

var showDetailWin=function(element){
  var id=parseInt(element.id.split("-")[1]);
  var data=testQueryRes[id-1];
  var thisWin = $('<div>').attr({"id":"detailWin"});
  thisWin.append('<div style="width:100%;height:20px;border-bottom: 1px solid lightgrey;"><img id="closeDetailWin" onclick=closeDetailWindow() title = "Close" data-toggle="tooltip" src="./images/closeWin.png" data-placement="left" style="position:absolute;height:20px;vertical-align:top;right:5px;cursor:pointer;"></div>')
  var header =$('<h2>').text(data["name"]);
  thisWin.append(header);
  var recommendDiv = $("<div>").css({"position":"absolute","top":"20px","right":"0px","border-left":" 1px solid lightgrey","width":"50%","height":"95%","overflow-y":"scroll"});
  recommendDiv.attr("id","recommendWin");
  recommendDiv.append('<div style="width:100%;height:20px;border-bottom: 1px solid lightgrey;"><p style="font-size:10px;text-align:center;">Similar properties as follows</p></div>')
  var recommendData=[];
  queryResult.forEach(function(querydata){
    if (data["cluster"]==querydata["cluster"]){
      recommendData.push(querydata);
    }
  })
  addContent(recommendDiv,recommendData);
  var address1 =$('<h3>').text(data["address"]);
  thisWin.append(address1);
  var address2 =$('<h3>').text(data["zipCode"]+", GA");
  thisWin.append(address2);
  thisWin.append(recommendDiv);
  DrivingTime = $("<p>").text("Driving Time: "+(data["drivingTime"]/60).toString()+"min");
  WalkingTime = $("<p>").text("Walking Time: "+(data["walkingTime"]/60).toString()+"min");
  TransitTime = $("<p>").text("Transit Time: "+(data["transitTime"]/60).toString()+"min");
  securityScore = $("<p>").text("Security Score(0-100): "+data["crimeScore"].toString());
  FoodScore = $("<p>").text("Food Score(0-100): "+data["foodScore"].toString());
  GasScore = $("<p>").text("Gas Score(0-100): "+data["gasScore"].toString());
  EntertainmentScore = $("<p>").text("Entertainment Score(0-100): "+data["entertainmentScore"].toString());
  thisWin.append(DrivingTime);
  thisWin.append(WalkingTime);
  thisWin.append(TransitTime);
  thisWin.append(securityScore);
  thisWin.append(FoodScore);
  thisWin.append(GasScore);
  thisWin.append(EntertainmentScore);
  $('#exploreContent').append(thisWin);
}

var closeDetailWindow=function(){
  $('#detailWin').remove();
}


//Sample filter variable sent to Django:
//{"commutingStyle":"driving",
 // "commutingTimeMin":"10min",
 // "commutingTimeMax":"50min",
//  "bed":1,
//  "bath":1.0,
//  "priceMin":0,
//  "priceMax":1000,
//  "Apartment":True,
//  "House":False,
//  "Condo":False,
//  "Townhouse":False,
//  "Food":True,
//  "Gas":False,
//  "Entertainment":True}


//Sample data variable return from Django:
//{"commutingStyle":"driving",
// "drivingTime":"20min",
// "walkingTime":"30min",
// "transitTime":"40min",
// "name":"Walton River",
// "address":"2550 Akers Mill Rd SE",
// "lat":30.0000,
// "lon":-80.0000,
// "webSite": "www.www.com",
// "zipCode":"30339",
// "floorPlans":[
//  { "bed":1,
//    "bath":1.0,
//    "price":950,
//    "sqft":800,
//  },
//  { "bed":1,
//    "bath":1.0,
//    "price":1000,
//    "sqft":900,
//  }
//  ]
//  "propertyType":"Apartment",
//  "crimeScore":90
//  "foodScore":90,
//  "gasScore":90,
//  "entertainmentScore":90,
//  "cluster":0}
