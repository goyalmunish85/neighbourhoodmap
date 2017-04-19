var map; //variable for map...
var i;  //variable for initialize the loops
var styles = [{   //styles used in map
	featureType: 'water',
	stylers: [{
		color: '#19cad8'
	}]
}, {
	featureType: 'water',
	elementType: 'labels.text.stroke',
	stylers: [{
		lightness: 100
	}]
}, {
	featureType: 'water',
	elementType: 'labels.text.fill',
	stylers: [{
		lightness: -100
	}]
}, {
	featureType: 'administrative',
	elementType: 'labels.text.stroke',
	stylers: [{
		color: '#ffffff'
	}, {
		weight: 6
	}]
}, {
	featureType: 'administrative',
	elementType: 'labels.text.fill',
	stylers: [{
		color: '#1279e8'
	}]
}, {
	featureType: 'transit.station',
	stylers: [{
		weight: 9
	}, {
		hue: '#e85123'
	}]
}, {
	featureType: 'poi',
	elementType: 'geometry',
	stylers: [{
		visibility: 'on'
	}, {
		color: '#f0e4d6'
	}]
}, {
	featureType: 'road.highway',
	elementType: 'geometry.stroke',
	stylers: [{
		color: '#d8d5d2'
	}, {
		lightness: -40
	}]
}, {
	featureType: 'road.highway',
	elementType: 'geometry.fill',
	stylers: [{
		color: '#e2dfdc'
	}, {
		lightness: -25
	}]
}];
/*Initalize the map here to display in the center set location and zoom = 4 */
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {      //display the map of centre coordinates
			lat: 30.340449,
			lng: 76.413802
		},
		zoom: 14,    //map zoom
		styles: styles,
		mapTypeControl: false
	});
	ko.applyBindings(new mapViewModel());
};
//error() function if map is not loaded by onerror
function error() {
	document.getElementById('map').innerHTML = "Map Not Found: Error 404";
};
var Venues = []; //array for location Venues....
venueMarkers = [{ //model...
	venueName: 'Gopal Sweets', //title of the location of marker
	venueId: '4e6378501495676d562c0c60', //this is for summary and rating
	venueCords: {
		lat: 30.330944,
		lng: 76.389443
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Subway', //title of the location of marker
	venueId: '4e3ea1a2d4c058f9dc148383', //this is for summary and rating
	venueCords: {
		lat: 30.347604,
		lng: 76.440747
	} //location of marker to be set in longitude and latitude
}, {
	venueName: '22 No. Phatak', //title of the location of marker
	venueId: '4e171c5ec65be9c55e8b6c76', //this is for summary and rating
	venueCords: {
		lat: 30.342099,
		lng: 76.379622
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'KFC', //title of the location of marker
	venueId: '4ef74302f9ab2e6681df337d', //this is for summary and rating
	venueCords: {
		lat: 30.335362,
		lng: 76.385067
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Dominos Pizza', //title of the location of marker
	venueId: '4f93fe90e4b01b89901862cd', //this is for summary and rating
	venueCords: {
		lat: 30.33543,
		lng: 76.383384
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Cafe Coffee Day', //title of the location of marker
	venueId: '4c20d1478082d13a133cf82a', //this is for summary and rating
	venueCords: {
		lat: 30.337755,
		lng: 76.394101
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'SRS Cinemas', //title of the location of marker
	venueId: '4ca73b2a931bb60c17e29ae2', //this is for summary and rating
	venueCords: {
		lat: 30.338003,
		lng: 76.394012
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Omaxe Mall', //title of the location of marker
	venueId: '4d4bf896855b548127a5e28f', //this is for summary and rating
	venueCords: {
		lat: 30.337402,
		lng: 76.394202
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Red Dragon', //title of the location of marker
	venueId: '4cf11efc8333224b9e4b088e', //this is for summary and rating
	venueCords: {
		lat: 30.342575,
		lng: 76.378477
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Hotel Eqbal Inn', //title of the location of marker
	venueId: '4cb08910562d224b00181788', //this is for summary and rating
	venueCords: {
		lat: 30.332589,
		lng: 76.418002
	} //location of marker to be set in longitude and latitude
}, {
	venueName: 'Barista Lavazza', //title of the location of marker
	venueId: '52614fd511d2d3e9a66e64af', //this is for summary and rating
	venueCords: {
		lat: 30.345452,
		lng: 76.377854
	} //location of marker to be set in longitude and latitude
}];
//viewmodel starts here
var mapViewModel = function() {
	var vShow = true;
	var vSelected = false;
	var mapInfoWindow = new google.maps.InfoWindow();
	for (i = 0; i < venueMarkers.length; i++) {
		var venueCords = venueMarkers[i].venueCords;
		venueName = venueMarkers[i].venueName;
		var marker = new google.maps.Marker({
			position: venueCords,
			map: map,
			title: venueName,
			animation: google.maps.Animation.DROP,
			venue: venueMarkers[i].venueId,
			show: ko.observable(vShow),
			selected: ko.observable(vSelected)
		});
		Venues.push(marker);
		marker.addListener('click', function() {
			DROP(this);
		});
		marker.addListener('click', function() {
			markerInfoWindow(this, mapInfoWindow);
		});
	};
	// call when clicks on show venue button
	document.getElementById('show').addEventListener('click', showVenues);
	// call when clicks on hide venue button
	document.getElementById('hide').addEventListener('click', hideVenues);
	//function for list of locations in search and get the info
	this.DropMarker = function(dMarker) {
		dMarker.setAnimation(google.maps.Animation.DROP);
		setTimeout(function() {
			dMarker.setAnimation(null);
		}, 1500);
		markerInfoWindow(dMarker, mapInfoWindow);
	};
	//function for search bar
	this.search = ko.observable('');
	this.applyFilter = function(sMarker) {
		for (var i = 0; i < Venues.length; i++) {
			Venues[i].show(sMarker);
			Venues[i].setVisible(sMarker);
		}
	};
	this.filterList = function(sMarker) {
		var searchText = this.search();
		mapInfoWindow.close(); //close all the infowindow which are previously opened window
		if (searchText.length) {
			for (i = 0; i < Venues.length; i++) {
				if (Venues[i].title.toUpperCase().indexOf(searchText.toUpperCase())) {
					Venues[i].show(false);
					Venues[i].setMap(null);
				} else {
					Venues[i].show(true);
					Venues[i].setMap(map);
				}
			}
		}
		//if nothing is searched in search bar
		else {
			for (i = 0; i < Venues.length; i++) {
				Venues[i].show(sMarker);
				Venues[i].setVisible(sMarker);
				Venues[i].setMap(map);
			}
		}
		mapInfoWindow.close(); //close all the infowindow which are previously opened window
	};
	function DROP(vMarker) {
		vMarker.setAnimation(google.maps.Animation.DROP);
		setTimeout(function() {
			vMarker.setAnimation(null);
		}, 1500);
		markerInfoWindow(vMarker, mapInfoWindow);
	};
	//this function for insert the marker info.
	function markerInfoWindow(iMarker, infoWindow) {
		if (infoWindow.iMarker != iMarker) {
			infoWindow.iMarker = iMarker;
			infoWindow.setContent('<div>' + '<h5>' + iMarker.title + '</h5>' + '<hr>' + iMarker.rating + '<br>' + iMarker.likes + '</div>');
			infoWindow.open(map, iMarker);
			infoWindow.addListener('closeclick', function() {
				infoWindow.iMarker = null;
			});
		}
	};
	function showVenues() {
		var mapBounds = new google.maps.LatLngBounds();
		// Extend the boundaries of the map for each marker and display the marker
		for (i = 0; i < Venues.length; i++) {
			Venues[i].setMap(map);
			mapBounds.extend(Venues[i].position);
		}
		map.fitBounds(mapBounds);
	}
	// This function will loop through the listings and hide them all.
	function hideVenues() {
		for (i = 0; i < Venues.length; i++) {
			Venues[i].setMap(null);
		}
	};
	Venues.forEach(function(vMarker) {
		$.ajax({
			method: 'GET',
			dataType: 'json',
			//url from api.foursquare.com with client id and client secret
			url: 'https://api.foursquare.com/v2/venues/' + vMarker.venue + '?client_id=UPLX1J0GIDWCC24XXWNYTX1SO0HDJHGQ2LZV2UIIEPJPHOFT&client_secret=ZRU0MX124G554UMVTZ0EDOKTV0PNUOQ0PEPKSQECYMYTXY4D&v=20170305',
			//if any error occur in fetching vdata
			error: function(err) {
				alert("FourSquare Id not Found currently");
			},
			//if vdata is successfully fetch than function will execute
			success: function(vdata) {
				var venueInfo = vdata.response.venue;
				if (venueInfo.hasOwnProperty('rating') != undefined && venueInfo.hasOwnProperty('rating')) {
					vMarker.rating = "Rating: " + venueInfo.rating + "/10"; //rating of the maker
				} else {
					vMarker.rating = "Rating: Not Found"; //If the likes of vMarker are not found and undefined from the api.foursquare.com
				}
				if (venueInfo.hasOwnProperty('likes') != undefined && venueInfo.hasOwnProperty('likes')) {
					vMarker.likes = venueInfo.likes.summary; //likes on the maker
				} else {
					vMarker.likes = "0 likes"; //If the likes of maker are not found and undefined from the api.foursquare.com
			    }
			}
		});
	});
};