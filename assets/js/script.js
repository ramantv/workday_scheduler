var workDayDetails = [];
const workdayStartHour = 9;
const workdayEndHour = 17; // 9am - 5pm

// to convert the hour into 12 hour format. Expects the hour in 24 hour format.
function getDisplayHour(hour) {
  var displayHour;
  if (hour <= 12) {
    displayHour = hour;
  } else {
    // hour > 12
    displayHour = hour - 12;
  }

  return displayHour;
}

// To get the am or pm tag for the hour. Expects the hour in 24 hour format.
function getAMorPMforHour(hour) {
  var ampm = "";
  if (hour < 12) {
    ampm = "am";
  } else if (hour >= 12) {
    ampm = "pm";
  }

  return ampm;
}

// Set the current date on the header.
function setTodaysDate() {
  var today = moment().format("dddd, MMMM Do");
  $("#currentDay").text(today);
}

// Initialized the workDay with an empty array of hourPlanner objects
function initializePlannerData() {

    var arrIndex = 0;
    var hrDetail = "";
    var dispHr = "";
    var ampm = "";

  for (let hr = workdayStartHour; hr <= workdayEndHour; hr++) {
    //get index and set variable to store data in array
    arrIndex = hr - 9;
    dispHr = getDisplayHour(hr);
    ampm = getAMorPMforHour(hr);

    hourPlanner = {
      id: arrIndex,
      displayHour: dispHr.toString(),
      time: hr,
      ampm: ampm,
      hourDetails: hrDetail,
    };

    workDayDetails.push(hourPlanner);
  }
}

$(document).ready(function () {
  initializePlannerData();

  setTodaysDate();
});
