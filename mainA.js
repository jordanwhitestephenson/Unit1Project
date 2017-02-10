$("#MainButton").click(function() {
    $('html, body').animate({
        scrollTop: $('.AroundYou').offset().top
    }, 3000);
});
$("#BarkFinder").click(function() {
    $('html, body').animate({
        scrollTop: $('.AroundYou').offset().top
    }, 1000);
});
$("#JoinUs").click(function() {
    $('html, body').animate({
        scrollTop: $('#signUp').offset().top
    }, 3000);
});

// <!---FORMS-->

$('#submit').on('click', function() {
  var name = $(".InputNameFirst").val();
  var email = $(".InputEmailFirst").val();
  var message = $('.InputMessageFirst').val();
  let personalEmail = 'jordanwhitestephenson@gmail.com';
  var subject = "BarkFinder Feedback";

    if (name < 5) {
        alert("please enter your name \n")

    }

    if (message < 5) {
        alert("please enter your a message\n")
        valid = false;
    }

    if (email < 5) {
        alert("please enter your email!")
    }

    else{
      console.log("HWY YOU KNOW AWORK");
      var emailBody = "Hello, my name is " + name + "My email address is :  " + email + "I would like to give you feedback of :  " + message;
      window.location = 'mailto:' + personalEmail + '?subject=' + subject + '&body=' + emailBody;

    }
});






//<!---GOOGLEMAPS--->
//
$(function getMyLocation() {
    navigator.geolocation.getCurrentPosition(displayLocation);
});

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latLng = new google.maps.LatLng(latitude, longitude);

    // initMap(latLng); //whats calling the map to change to the lat/long
    var div = document.getElementById('get_location');
    div.innerHTML = "You are at Latitude" + latitude + "," + longitude;

    initMap(latLng);

    function initMap() {
        map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: latLng,
            zoom: 10,
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: latLng,
            radius: 10000,
            name: 'dog park',
        }, callback);
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {
                var realDogPark = results[i].name.includes('Dog Park');
                var openSpace = results[i].name.includes('Open Space');
                if (realDogPark || openSpace) {
                    createMarker(results[i]);
                }
                // console.log(results[i]);
            }
            var arrayofParks = [];
            // console.log(arrayofParks);
            for (var k = 0; k < results.length; k++) {
                var rating = results[k].rating;
                var parkname = results[k].name;
                var address = results[k].vicinity;
                var objectLat = results[k].geometry.location.lat;
                var objectLong = results[k].geometry.location.lat;
                var firstphoto = results[k].photos[0].getUrl({
                    'maxWidth': 120,
                    'maxHeight': 100
                });
                var $section = $(`<section  data-id= ${results[k].place_id} >`);


                $('.dogparkinfo').append($section);

                var $firstphoto = $('<img src =' + firstphoto + '>');
                $section.append($firstphoto);
                var $parkname = $('<h3>' + parkname + '</h3>');
                $section.append($parkname);
                var $address = $('<p>' + address + '</p>');
                $section.append($address);
                var $rating = $('<p> Rating: ' + rating + '</p>');
                $section.append($rating);

                var request = {
                    placeId: results[k].place_id,
                };
                var infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);

                $section.click('click', function() {
                    var dialog = document.getElementById('window');
                    dialog.show();
                    document.getElementById('exit').onclick = function() {
                        dialog.close();
                    };
                });
                service.getDetails(request, function(place, status) {
                    var sectionAtt = $("section[data-id]");
                    // console.log(place);
                    // for (var r = 0; r < place.reviews.length; r++){

                    for (var p = 0; p < sectionAtt.length; p++) {

                        if (sectionAtt[p].dataset.id === place.place_id) {
                            var $headline = $('<section>');
                            $(sectionAtt[p]).append($headline);

                            var placeReviews = place.reviews[0].text;


                            var $reviews = $('<p class = "review"> REVIEW FROM YOUR LOCAL BARKER :  ' + placeReviews + '</p>');
                            $(sectionAtt[p]).append($reviews);

                        }
                    }
                    // }

                });
            }

        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var dogIcon = 'boneicon.png';
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: dogIcon,
            animation: google.maps.Animation.DROP
        });
        var locationimage = 'locationmarker.png';
        var myLocationMarker = new google.maps.Marker({
            map: map,
            position: latLng,
            title: "You Are Here!",
            icon: locationimage
        });
        google.maps.event.addListener(myLocationMarker, 'click', function() {
            infowindow.setContent('YOU ARE HERRREEE');
            infowindow.open(map, this);
        });
        google.maps.event.addListener(marker, 'click', function() {
            var localName = place.name;
            var localAddress = place.vicinity;
            var allInfo = '<h4>' + localName + '</h4>' + localAddress;
            infowindow.setContent(allInfo);
            infowindow.open(map, this);
        });
    }
}

// ---<ROLLOVER>----
$(document).ready(function() {
    $('#gallery img').each(function() {
        var imgFile = $(this).attr('src');
        var preloadImage = new Image();
        var imgExt = /(\.\w{3,4}$)/;
        preloadImage.src = imgFile.replace(imgExt, '_h$1');

        $(this).hover(
            function() {
                $(this).attr('src', preloadImage.src);
            },
            function() {
                $(this).attr('src', imgFile);
            }
        ); // end hover
    }); // end each
}); // end ready
