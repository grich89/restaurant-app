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

var reservationsReference = database.ref('reservations');

function getReservations() {

	// empty the reservation list
	$('.reservation-list').empty();

	reservationsReference.on('child_added', snapshot => {

		// retrieve the day, name, and key from firebase
		var resDay = snapshot.val().day;
		var resName = snapshot.val().name;
		var resId = snapshot.key;

		// add the values to the handlebars template
		var source = $('#reservation-template').html();
		var template = Handlebars.compile(source);
		var context = {
			name: resName, 
			day: resDay,
			id: resId
		};
		var reservationItem = template(context);

		// append the new reservation to the list
		$('.reservation-list').prepend(reservationItem);

	});
}

// get the existing reservations on page load
getReservations();

// add new reservations on submission of #makeReservation form
$('#makeReservation').on('submit', function(e) {
	e.preventDefault();

	var reservationName = $('#reservation-name').val();
	var reservationDay = $('#reservation-day').val();

	reservationData.name = reservationName;
	reservationData.day = reservationDay;

	if (reservationName === "" || !reservationDay) {

		// show error if fields aren't filled out
		$('.error').fadeIn();

	} else {

		// push reservationData to database
  		reservationsReference.push(reservationData);

  		// get the new reservation
  		getReservations();

  		// hide error message
		$('.error').fadeOut();

	}
});

// remove existing reservations by clicking on any span.remove
$('.existing-reservations table').on('click', '.remove', function() {
	
	// retrieve the reservation id from .existing-reservations
	var resId = $(this).parent().parent().attr('id');

	// remove the firebase entry with the matching id
	reservationsReference.child(resId).remove();

	// update the reservation list
	getReservations();

});

// create a new google map with a marker
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 10,
		scrollwheel: false
	}); 
	var marker = new google.maps.Marker({
	    position: {lat: 40.8054491, lng: -73.9654415},
	    map: map,
	    title: 'Monks Café'
	});
}