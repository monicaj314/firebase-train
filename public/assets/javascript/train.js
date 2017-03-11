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
	var name;
	var destination;
	var launchTime;
	var frequency;
	var currentTime = moment();
	
	$('#firstLaunch').timepicker({
    dateFormat: '',
    timeFormat: 'H:i',
    step: 1,
    scrollDefault: "12:00"
});
//click event sets varialbles to input values
	$("#submitButton").on("click", function(event) {
		event.preventDefault();
		name = $("#rocketName").val().trim();
		destination = $("#rocketDestination").val().trim();
		launchTime = $("#firstLaunch").val().trim();
		frequency = $("#rocketFrequency").val().trim();

//input values at time of submission are pushed to database

		database.ref().push({
			name: name,
			destination: destination,
			launchTime: launchTime,
			frequency: frequency
		});
	});
	database.ref().on("child_added", function(snapshot, lastKey){
		var caughtValue = snapshot.val();
		var name = snapshot.val().name;
		var destination = snapshot.val().destination;
		var launchTime = snapshot.val().launchTime;
		var currentTime = moment();
		console.log("launchTime", launchTime)
		var frequency = snapshot.val().frequency;
		console.log("frequency", frequency)
    	var convertedTime = moment(launchTime, "HH:mm");
		console.log("convertedTime", convertedTime);
		var minuteDiff = currentTime.diff(convertedTime);
		console.log("minuteDiff", minuteDiff);
		var elapsedMinutes = moment.duration(minuteDiff).asMinutes();
		var timeSinceLastTrain = elapsedMinutes % frequency;
		console.log("timeSinceLastTrain", timeSinceLastTrain);
		var minutesAway = frequency - timeSinceLastTrain;
		var actualMinutesAway = minutesAway.toFixed(0);
		console.log("minutesAway", minutesAway);
	    var nextTrain = currentTime.add(minutesAway, "minutes");
	    console.log("nextTrain", nextTrain);
	    var nextTrainTime = nextTrain.format("HH:mm")

		var addRow = "<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainTime + "</td><td>" + actualMinutesAway + "</td></tr>";
	    $("#all-rockets").append(addRow);

	});
});
