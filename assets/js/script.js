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

//saves data to localStorage
function savePlannerData() {
  localStorage.setItem("workDaySchedule", JSON.stringify(workDaySchedule));
}

// Initialized the workDay with an empty array of hourPlanner objects
function initializePlannerData() {
  var arrIndex = 0;
  var hrDetail = "";
  var dispHr = "";
  var ampm = "";

  for (let hr = workdayStartHour; hr <= workdayEndHour; hr++) {
    arrIndex = hr - 9; // to save the index of the hour. 0 is 9am, 1 is 10am etc
    dispHr = getDisplayHour(hr); // the actual hour. 9, 10, 11, 12, 1...5
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

// creates the display emalements for the workday schedule
function createTimeBlocksforDisplay() {

  workDaySchedule.forEach(function (hrPlan) {
    // creates row
    var timeBlock = $("<form>").addClass("row");

    $(".container").append(timeBlock);

    //creates field for time
    var timeField = $("<div>")
      .addClass("col-md-2 hour")
      .text(hrPlan.displayHour + hrPlan.ampm);

    // creates the input data fiels 
    var hourInput = $("<div>").addClass("col-md-9 description p-0");
    var hourData = $("<textarea>");
    hourData.attr("id", hrPlan.id);

    //compare time to current time - color codes
    if (hrPlan.time == moment().format("HH")) {
      hourData.addClass("present");
    } else if (hrPlan.time < moment().format("HH")) {
      hourData.addClass("past");
    } else if (hrPlan.time > moment().format("HH")) {
      hourData.addClass("future");
    }

    hourInput.append(hourData);

    // create save button for end of row
    var saveIcon = $("<i class='far fa-save fa-lg'></i>");
    var saveEnd = $("<button>").addClass("col-md-1 saveBtn");

    //append elements to row
    saveEnd.append(saveIcon);
    timeBlock.append(timeField, hourInput, saveEnd);
  });
}

$(document).ready(function () {
  initializePlannerData();
  setTodaysDate();
  createTimeBlocksforDisplay();
});
