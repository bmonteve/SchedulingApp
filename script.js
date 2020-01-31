//Creates and tracks current date and hour, while also showing that on the browser
var date = moment().format('dddd, MMMM Do');
var currentHour = moment().hour();
var currentMin = moment().minute();
var currentSec = moment().seconds();
$("#currentDay").text(date);
var dayEvents = [];
var dateIndex = 0;

//first call to run time and update row colors 
updateTime();
addToContainer();
updateRow();

//interval to update time and row colors in real time w/o requirement for a page refresh
setInterval(function(){
    updateTime();
    updateRow();
}, 1000);

//ensures that the make blocks function does not try to pull from an empty array by setting the array holding daily events 
function checkStorage(){
if (localStorage.getItem(date)!= null){
    dayEvents = JSON.parse(localStorage.getItem(date));
}
else 
    dayEvents = ["","","","","","","","","","","","",""];
}

//displays blocks for 6am to 10p on the browser
function addToContainer (){
    checkStorage();
    for (index = 6; index < 23; index++){
        $(".container").append(makeBlocks(index));
    }
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
    event.val(dayEvents[i-6]);
    icon.html("assignment_returned");
    save.append(icon);

    hour.append(time);
    hour.append(event);
    hour.append(save);
    
    return hour;
}

//determines what class a block needs based on the day and current hour to allow css adjustment
function hourBack(){
    var index = parseInt($(this).attr("val"));
    currentHour = moment().hour();
    
    if (dateIndex == 0){
        if (currentHour > index)
            addPast($(this));
        else if (currentHour < index)
            addFuture($(this));
        else {
            $(this).removeClass("future");
            $(this).addClass("present");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
         }
    }
    else if (dateIndex > 0)
        addFuture($(this));
    else
        addPast($(this));
}

//adds the correct future class to a block based on the hour and day
function addFuture(obj){
    $(obj).removeClass("past present")
    $(obj).addClass("future");
    $(obj).find("i").removeClass("disabled");
    $(obj).find(".saveBtn").attr("disabled",false);
}

//adds the correct past class to a block based on the hour and day
function addPast(obj){
    $(obj).removeClass("future present")
    $(obj).addClass("past");
    $(obj).find("i").addClass("disabled");
    $(obj).find(".saveBtn").attr("disabled",true);
}

//works with the interval to check each element with the row class to update the background color
//calls hourBack for each element to adjust the classes
function updateRow (){
    $(".row").each(hourBack);
}

//works with interval to adjust time on page without a refresh, updates time enters a new day
function updateTime(){
    $("#currentTime").text(moment().format("LTS"));
        currentHour = moment().hour();
        currentMin = moment().minute();
        currentSec = moment().seconds();
        if (currentHour == 0 && currentMin == 0 && currentSec == 0){
            date = moment().format('dddd, MMMM Do');
            $("#currentDay").text(date);
        }
}

//updates the blocks based on the stored days array of events
function updateBlocks (){
    var index = 6;
    $(".row").each(function(){
        $(this).find("textarea").val(dayEvents[index-6]);
        index++;
    })
}

//adds functionality to the save buttons for each row, is disabled when row has class of past
$(".saveBtn").on("click", function (){
    var time = $(this).parent().attr("val");
    var event = $(this).parent().find("textArea").val()
    dayEvents[(parseInt(time)-6)] = event;
    localStorage.setItem(date, JSON.stringify(dayEvents));
})

//allows the user to go the previous days to check their calendar. Creates a new storage key if the dates has not already been used
$(".previous").on("click", function (){
    dateIndex--;
    hourBack();
    date = moment().add(dateIndex, "days").format('dddd, MMMM Do');
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    $("#currentDay").text(date);
    updateBlocks();
})

//allows the user to go the next days to check their calendar. Creates a new storage key for that day
$(".next").on("click", function (){
    dateIndex++;
    hourBack();
    date = moment().add(dateIndex, "days").format('dddd, MMMM Do');
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    $("#currentDay").text(date);
    updateBlocks();
})

//clears all the stored days and events, in the event that the total stored days overload storage and more space is need
$(".clearAll").on("click", function(){
    localStorage.clear();
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    updateBlocks();
})

//clears the current day's events only 
$(".clearCurrent").on("click", function(){
    index = 6;
    dayEvents = ["","","","","","","","","","","","",""];
    localStorage.setItem(date, JSON.stringify(dayEvents));
    updateBlocks();
})

//ADD Dom elements, Make the event row a button to bring up pop up
    //Add edit button to show form input/edit details
    //Have event row only show event title
    //Make past rows uneditable

//eventually add calendar format to choose date instead of back and forward buttons

