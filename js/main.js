function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.8054491, lng: -73.9654415},
		zoom: 20,
	}); 
}

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
console.log(reservationsReference);

$('#makeReservation').on('submit', function(e) {
	e.preventDefault();
	reservationData.day = $('#reservation-day').val();
	reservationData.name = $('#reservation-name').val();
	//console.log(reservationData);

	// push reservationData to database
  	reservationsReference.push(reservationData);
});

function getReservations() {
	reservationsReference.on('child_added', snapshot => {
		console.log('child_added');
	});
}