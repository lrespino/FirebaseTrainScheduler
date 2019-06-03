firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var train = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#train-input").val().trim();
  email = $("#destination-input").val().trim();
  age = $("#firstTrain-input").val().trim();
  comment = $("#frequency-input").val().trim();

  // Code for the push
  dataRef.ref().push({

    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().email);
  console.log(childSnapshot.val().age);
  console.log(childSnapshot.val().comment);
  console.log(childSnapshot.val().joinDate);

  // full list of items to the well
//   $("#full-member-list").append("<div class='well'><span class='member-name'> " +
//     childSnapshot.val().name +
//     " </span><span class='member-email'> " + childSnapshot.val().email +
//     " </span><span class='member-age'> " + childSnapshot.val().age +
//     " </span><span class='member-comment'> " + childSnapshot.val().comment +
//     " </span></div>");

  // Handle the errors
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//   // Change the HTML to reflect
//   $("#name-display").text(snapshot.val().name);
//   $("#email-display").text(snapshot.val().email);
//   $("#age-display").text(snapshot.val().age);
//   $("#comment-display").text(snapshot.val().comment);
// });
