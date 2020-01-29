//Creates and tracks current date and hour, while also showing that on the browser
var date = moment().format('dddd, MMMM Do');
var keyDate = moment().get('date');
var currentHour = moment().hour();
$("#currentDay").text(date);

//displays blocks for 7am to 7p on the browser
for (index = 7; index < 20; index++){
    $(".container").append(makeBlocks(index));
}

//first call to run time and update row colors 
updateTime();
updateRow();

//interval to update time and row colors in real time w/o requirement for a page refresh
setInterval(function(){
    updateTime();
    updateRow();
}, 1000);

//sets current day events to local storage, and clears out storage when a new day begins
/*will adjust functionality of the local storage calls when next and previous day buttons
are made functional*/
if (keyDate != localStorage.getItem("date")){
    localStorage.clear();
    localStorage.setItem("date", keyDate);
}

//creates the indivual rows for each hour of my current work day 
function makeBlocks (i){
    var hour = $("<div>", {"class": "time-block row"});
    var time = $("<span>", {"class": "hour"});
    var event = $("<textarea>", {"class": "description"});
    var icon = $("<i>", {"class": "material-icons"});
    var save = $("<button>", {"class": "saveBtn"});

    if(i<12)
        time.text(i + " AM");
    else if (i == 12)
        time.text((i) + " PM");
    else
        time.text((i-12) + " PM");

    hour.attr("val", i);
    event.val(localStorage.getItem(i));
    icon.html("assignment_returned");
    save.append(icon);

    hour.append(time);
    hour.append(event);
    hour.append(save);
    
    return hour;
}

//adds a past, present, or future class to adjust the css to the row based on the current hour
function hourBack(){
    var index = parseInt($(this).attr("val"));
    currentHour = moment().hour();
    
    if (currentHour > index){
        $(this).removeClass("present");
        $(this).addClass("past");
        $(this).find("i").addClass("disabled");
        $(this).find(".saveBtn").attr("disabled",true);
    }
    else if (currentHour < index){
        $(this).addClass("future");
    }
    else {
        $(this).removeClass("future");
        $(this).addClass("present");
    }
}

//works with the interval to check each element with the row class to update the background color
//calls hourBack for each element to adjust the classes
function updateRow (){
    $(".row").each(hourBack);
}

//works with interval to adjust time on page without a refresh
function updateTime(){
    $("#currentTime").text(moment().format("LTS"));
}

//adds functionality to the save buttons for each row, is disable when row has class of past
$(".saveBtn").on("click", function (){
    var time = $(this).parent().attr("val");
    var event = $(this).parent().find("textArea").val()
    localStorage.setItem(time, event);
})

//ADD Dom elements, Make the event row a button to bring up pop up
    //Add edit button to show form input/edit details
    //Have event row only show event title
    //Make past rows uneditable

//Add functionality to buttons to change the date
    //Make past dates viewable but uneditable
    //reformat LocalStorage use to data from events on multiple days
    //eventually add calendar format to choose date instead of back and forward buttons

