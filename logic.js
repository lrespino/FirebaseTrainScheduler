
// src="https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js" 
// src="https://www.gstatic.com/firebasejs/6.0.4/firebase-app.js"
// src="https://www.gstatic.com/firebasejs/6.0.4/firebase-database.js"
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC-3XU-e8HRsJP_Tm-O8v682Z3XeB7kIVM",
    authDomain: "trainscheduler-b15f3.firebaseapp.com",
    databaseURL: "https://trainscheduler-b15f3.firebaseio.com",
    projectId: "trainscheduler-b15f3",
    storageBucket: "trainscheduler-b15f3.appspot.com",
    messagingSenderId: "735632129303",
    appId: "1:735632129303:web:f4b6dab92f90cac2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 

var dataRef = firebase.database();

// Initial Values
var train = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();


  train = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  console.log(train)
  console.log(destination)
  console.log(firstTrain)
  console.log(frequency)
  
  // Code for the push
  dataRef.ref().push({

    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextTrainInfo: nextTrainInfo,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dateAdded);
 

  //full list of items to the well
  $("#train-output").append(
    "<div class='well'><span class='Train-line'> " + childSnapshot.val().train +
    " </span><span class='train-destination'> " + childSnapshot.val().destination +
    " </span><span class='train-firstTrain'> " + childSnapshot.val().firstTrain +
    " </span><span class='train-frequency'> " + childSnapshot.val().frequency +
    " </span><span class='train-frequency'> " + childSnapshot.val().trainInfo +
    " </span></div>");

    function nextTrainInfo(firstTrain, frequency) {
      var trainInfo = [];
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      trainInfo.push(tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
      var arrivalTime = moment(nextTrain).format("hh:mm");
  
      trainInfo.push(arrivalTime);
  
      return trainInfo;
  
  }
  


 // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#train-train").text(snapshot.val().train);
  $("#train-destination").text(snapshot.val().destination);
  $("#train-firstTrain").text(snapshot.val().firstTrain);
  $("#train-frequency").text(snapshot.val().dateAdded);
});
