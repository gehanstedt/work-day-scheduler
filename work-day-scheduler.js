const standardDayBegin = 7;
const standardDayEnd = 18;
const textAreaColumns = 90;
const textAreaRows = 4;
var currentHour = 11;
var hourSelected;
var hoursNoteString;
var calendarDayText = [];
var currentDate;

$(document).ready(function() {

    function emptySchedule () {
        $(".container").empty ();
    }

    function buildSchedule () {
        var divElementRow;
        var divElementHour;
        var textAreaElement;
        var buttonElement;
        var timePeriodText;
        var timeText;
        var counter;
        for (counter = standardDayBegin; counter <= standardDayEnd; counter ++) {

            // Create time text and convert from military to regular time
            if (counter > 12) {
                timeText = `${counter - 12}:00 PM`;
            }

            else {
                timeText = `${counter}:00 AM`;
            }

            divElementRow = $(`<div class="row">`);
            $(".container").append (divElementRow);
            divElementHour = $(`<div class="hour"> 
            ${timeText}</div>`);
            divElementRow.append (divElementHour);

            // Determine if we are in the past, present or future
            if (counter < currentHour) {
                timePeriodText = "past";
            }

            else if (counter === currentHour) {
                timePeriodText = "present";
            }

            else { // counter > counterHour
                timePeriodText = "future"; 
            }

            textAreaElement = $(`<textarea cols="${textAreaColumns}" rows="${textAreaRows}" class="${timePeriodText}" houris="${counter}" id="textArea${counter}">`);
            divElementRow.append (textAreaElement);

            buttonElement = $(`<button class="saveBtn" houris="${counter}">`);
            buttonElement.text (`
            Save`);
            divElementRow.append (buttonElement);
        }
    }

    function writeCalendarData () {
        var workingTextArea;

        if (calendarDayText.length > 0) {
            for (counter = 0; counter < calendarDayText.length; counter ++) {
                if (calendarDayText [counter] !== null) {
                    console.log ("Updating hour: " + counter);
                    workingTextArea = "textArea" + counter;
                    $(`#${workingTextArea}`).val (calendarDayText [counter]);
                }
            }
        }

        else {
            console.log ("There is no existig data");
        }
    }

    function loadCalendarData () {
        var tempArray = JSON.parse(localStorage.getItem("GDOG-Work-Day-Scheduler"));
        if (tempArray !== null) {
          calendarDayText = tempArray;
        }
    }
      
    function saveCalendarData () {
        localStorage.setItem ("GDOG-Work-Day-Scheduler", JSON.stringify(calendarDayText));
    }

    function getMonthText (currentDate) {
        var month = [];
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[currentDate.getMonth()];        
    }

    function getDayText (currentDate) {
        var days = [];
        days[0] = "Sunday";
        days[1] = "Monday";
        days[2] = "Tuesday";
        days[3] = "Wednesday";
        days[4] = "Thursday";
        days[5] = "Friday";
        days[6] = "Saturday";
        return days[currentDate.getDay()];        
    }

    function writeCurrentDate (currentDate) {
        var fullDateText;
        var monthText = getMonthText (currentDate);
        var date = currentDate.getDate ();
        var dayText = getDayText (currentDate);
        var year = currentDate.getFullYear ();

        fullDateText = `${dayText}, ${monthText} ${date}, ${year}`;

        $("#currentDay").text (fullDateText);

        console.log (`Date:  ${fullDateText}`);
    }

    var d = new Date("July 21, 1983 01:15:00");
    var n = d.getDate();
    console.log ("N: "+ n);

    currentDate = new Date ();
    currentHour = currentDate.getHours();
    console.log (currentDate.getMonth ());
    console.log (currentDate);
    emptySchedule ();
    loadCalendarData ();
    writeCurrentDate (currentDate);
    buildSchedule ();
    writeCalendarData ();
    
    $(".saveBtn").on ("click", function (event) {
        event.preventDefault ();
        hourSelected = $(this).attr("houris");
        console.log ("Hour selected:  " + hourSelected);
        selectedTextArea = "textArea" + hourSelected;
        console.log ("Selected text area: " + selectedTextArea);
        hoursNoteString = $(`#${selectedTextArea}`).val ();
        calendarDayText [parseInt (hourSelected)] = hoursNoteString;
        saveCalendarData ();

        console.log ("Hours note:  " + calendarDayText);

    });
});



/*  We are basically adding something like this in from this function:
      <div class="row">
        <div class="hour">
          9:00 AM
        </div>
        <textarea cols="90" rows="4" class="past">
        </textarea>
        <button class="saveBtn">
          Save
        </button>
      </div>


*/



/*
// Your code here...

var stringVar1;
var stringVar2;
var result;
var operatorSelected;
var currentState;
var buttonElement = $("button");
var buttonClass;
var characterPressed;

function resetCalculator () {
  stringVar1 = "";
  stringVar2 = "";
  result = 0;
  operatorSelected = "";

  currentState = "Load1";
}

$(".number").on ("click", function (event) {
  event.preventDefault ();
  console.log ("State is:" + currentState);
  keyPressed = ($(this).attr("value"));
  console.log ("Key pressed " + keyPressed);
  
  if (currentState === "Load1") {
    stringVar1 += keyPressed;
    $("#first-number").text (stringVar1);
  }

  else if (currentState === "Load2") {
    stringVar2 += keyPressed;
    $("#second-number").text (stringVar2);
  }

  console.log ("stringVar1:  " + stringVar1);
 });

 $(".operator").on ("click", function (event) {
  event.preventDefault ();
  console.log ("State is:" + currentState);
  keyPressed = ($(this).attr("value"));
  operatorSelected = keyPressed;
  characterPressed = ($(this).text());
  console.log ("Key pressed " + keyPressed);
   
  if (currentState === "Load1") {
    currentState = "Load2";
    operatorSelected = keyPressed;
    $("#operator").text (characterPressed);
  }
 });

 $(".equal").on ("click", function (event) {
  event.preventDefault ();

  switch (operatorSelected) {
    case "plus":
      result = parseInt (stringVar1) + parseInt (stringVar2);
      break;

    case "minus":
      result = parseInt (stringVar1) - parseInt (stringVar2);
      break;

    case "times":
      result = parseInt (stringVar1) * parseInt (stringVar2);
      break;

    case "divide":
      result = parseInt (stringVar1) / parseInt (stringVar2);
      break;

    case "power":
      result = Math.pow (parseInt (stringVar1), parseInt (stringVar2));
      break;

  }

  $("#result").text (result);
 });

 $(".clear").on ("click", function (event) {
  event.preventDefault ();
  resetCalculator ();
  $("#first-number").text ("");
  $("#second-number").text ("");
  $("#operator").text ("");
  $("#result").text ("");
 });


 resetCalculator ();
 console.log ("State is (startup):" + currentState);
 */


