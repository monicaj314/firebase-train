$(document).ready(function(){
//setting up firebase connection
	var config = {
	    apiKey: "AIzaSyCsx-LQN62Q7aN3bpuSdqOxo56TUOPgd-Q",
	    authDomain: "moon-train.firebaseapp.com",
	    databaseURL: "https://moon-train.firebaseio.com",
	    storageBucket: "moon-train.appspot.com",
		messagingSenderId: "583298448705"
	};
	firebase.initializeApp(config);
//global variables
	var database = firebase.database();
	var name = "";
	var destination = "";
	var launchTime = "";
	var frequency = "";
	    // First Time (pushed back 1 year to make sure it comes before current time)
    var launchTimeConverted = moment(launchTime, "k:mm").subtract(1, "years");
    console.log(launchTimeConverted);
    $('#firstLaunch').datetimepicker({
    dateFormat: '',
    timeFormat: 'hh:mm tt'
});
//click event sets varialbles to input values
	$("#submitButton").on("click", function(event) {
		event.preventDefault();
		name = $("#rocketName").val().trim();
		destination = $("#rocketDestination").val().trim();
		launchTime = $("#firstLaunch").val().trim();
		frequency = $("#rocketFrequency").val().trim();
//input values at time of submissioin are pushed to database

		database.ref().push({
			name: name,
			destination: destination,
			launchTime: launchTime,
			frequency: frequency
		});
	});

	database.ref().on("value", function(snapshot){
		var caughtValue = snapshot.val();
//organize input values into an array 
		var caughtArrays = Object.keys(caughtValue);
//grab the last captured value to add a new record in the UI
		var lastIndex = caughtArrays.length - 1;
		var lastValue = caughtArrays[lastIndex];
		var lastObj = caughtValue[lastValue];
		var addRow = "<tr><td>" + lastObj.name + "</td><td>" + lastObj.destination + "</td><td>" + lastObj.frequency + "</td><td>" + lastObj.launchTime + "</td></tr>";
	    $("#all-rockets").append(addRow);
	});


});