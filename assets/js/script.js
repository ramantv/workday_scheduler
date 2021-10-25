var workDaySchedule = [];
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
function initializeWorkDaySchedule() {
  var arrIndex = 0;
  var hrDetail = "";
  var dispHr = "";
  var ampm = "";

  for (let hr = workdayStartHour; hr <= workdayEndHour; hr++) {
    arrIndex = hr - 9; // to save the index of the hour. 0 is 9am, 1 is 10am etc. (is this really required??)
    dispHr = getDisplayHour(hr); // the actual hour corresponding to the 24hr format hour. As in 9, 10, 11, 12, 1...5 etc.
    ampm = getAMorPMforHour(hr); // the am or pm tag based on the 24 hour time.

    hourPlanner = {
      id: arrIndex,
      displayHour: dispHr.toString(),
      time: hr,
      ampm: ampm,
      hourDetails: hrDetail,
    };

    workDaySchedule.push(hourPlanner);
  }
}

//to save the workDay Schedule to localStorage
function saveWorkDaySchedule() {
  localStorage.setItem("workDaySchedule", JSON.stringify(workDaySchedule));
}

// To load the workDay schedule from local storage.
function loadWorkDaySchedule() {
  var scheduleLoaded = JSON.parse(localStorage.getItem("workDaySchedule"));

  if (scheduleLoaded) {
    workDaySchedule = scheduleLoaded;
  }
}

// displays data in time slots
function displayWorkDaySchedule() {
  workDaySchedule.forEach(function (hour) {
    $("#" + hour.id).val(hour.hourDetails);
  });
}

// to set the dispay css class based on past present or future hour for color coding.
function getDisplayClassForHour(hr) {
  var dispClass = "";
  var curHr = moment().format("HH");

  // compare the supplied hour to current hour and return the color code class accordingly
  if (hr == curHr) {
    dispClass = "present";
  } else if (hr < curHr) {
    dispClass = "past";
  } else {
    //  (hr > curHr)
    dispClass = "future";
  }

  return dispClass;
}

// creates the display elements for the workday schedule
function createTimeBlocksforDisplay() {
  // for each hour of the work day, create the timeblock
  workDaySchedule.forEach(function (theHour) {
    // creates row
    var timeBlock = $("<form>").addClass("row");

    // creates field for time
    var timeField = $("<div>")
      .addClass("col-md-2 hour")
      .text(theHour.displayHour + theHour.ampm);

    // creates the input data fields for the hour
    var hourInput = $("<div>").addClass("col-md-9 description p-0");
    var hourData = $("<textarea>");
    hourData.attr("id", theHour.id);

    // set the class for the color codes based on past/present/future hour
    hourData.addClass(getDisplayClassForHour(theHour.time));
    hourInput.append(hourData);

    // create save button for end of row
    var saveIcon = $("<i class='far fa-save fa-lg'></i>");
    var saveButton = $("<button>").addClass("col-md-1 saveBtn");
    saveButton.append(saveIcon);

    // append elements to row
    timeBlock.append(timeField, hourInput, saveButton);

    // append the row to the container
    $(".container").append(timeBlock);
  });
}

function onSaveButtonClick(event) {
  event.preventDefault();

  // saving the hour details into the workDaySchedule
  var saveIndex = $(this).siblings(".description").children().attr("id");
  var details = $(this).siblings(".description").children().val();

  console.log("" + saveIndex + " -> " + details);
  workDaySchedule[saveIndex].hourDetails = details;

  saveWorkDaySchedule();
  displayWorkDaySchedule();
}

$(document).ready(function () {
  initializeWorkDaySchedule();
  setTodaysDate();
  createTimeBlocksforDisplay();
  loadWorkDaySchedule();

  // To save hourly plan details when the save button is clicked.
  $(".saveBtn").on("click", onSaveButtonClick);

  displayWorkDaySchedule();
});
