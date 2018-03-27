// Initialize Firebase
var config = {
    apiKey: "AIzaSyDlijh5u5tcgxDIfnCTlwNCWM_aVcrGFSY",
    authDomain: "reservation-site-1ad6d.firebaseapp.com",
    databaseURL: "https://reservation-site-1ad6d.firebaseio.com",
    projectId: "reservation-site-1ad6d",
    storageBucket: "reservation-site-1ad6d.appspot.com",
    messagingSenderId: "528554113247"
};
firebase.initializeApp(config);

var reservationData = {};

var database = firebase.database();

/*$('#reservation-date').on('click', function() {
	console.log(reservationData);
});*/

var reservationsReference = database.ref('reservations');

$('#makeReservation').on('submit', function(e) {
	e.preventDefault();
	reservationData.day = $('#reservation-day').val();
	reservationData.name = $('#reservation-name').val();
	//console.log(reservationData);

	// push reservationData to database
  	reservationsReference.push(reservationData);

  	// get the new reservation
  	getReservations();
});

function getReservations() {

	// empty the reservation list
	$('.reservation-list').empty();

	reservationsReference.on('child_added', snapshot => {

		// retrieve the day and name from firebase
		var resDay = snapshot.val().day;
		var resName = snapshot.val().name;

		// add the values to the handlebars template
		var source = $('#reservation-template').html();
		var template = Handlebars.compile(source);
		var context = {
			name: resName, 
			day: resDay
		};
		var reservationItem = template(context);

		// append the new reservation to the list
		$('.reservation-list').prepend(reservationItem);

	});
}

// get the existing reservations on page load
getReservations();

// create a new google map
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 10,
		scrollwheel: false
	}); 
}