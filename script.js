//Creates and tracks current date and hour, while also showing that on the browser
var date = moment().format('dddd, MMMM Do');
var currentHour = moment().hour();
$("#currentDay").text(date);
var dayEvents = [];
var dateIndex = 0;

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

//first call to run time and update row colors 
updateTime();
addToContainer();
updateRow();

//interval to update time and row colors in real time w/o requirement for a page refresh
setInterval(function(){
    updateTime();
    updateRow();
}, 1000);

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

//adds a past, present, or future class to adjust the css to the row based on the current hour
function hourBack(){
    var index = parseInt($(this).attr("val"));
    currentHour = moment().hour();
    
    if (currentHour > index){
        if (dateIndex == 0){
            $(this).removeClass("present");
            $(this).removeClass("future");
            $(this).addClass("past");
            $(this).find("i").addClass("disabled");
            $(this).find(".saveBtn").attr("disabled",true);
        }
        else if (dateIndex > 0){
            $(this).removeClass("past present")
            $(this).addClass("future");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
        }
        else {
            $(this).removeClass("future present")
            $(this).addClass("past");
            $(this).find("i").addClass("disabled");
            $(this).find(".saveBtn").attr("disabled",true);
        }
    }
    else if (currentHour < index){
        if (dateIndex == 0){
            $(this).addClass("future");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
        }
        else if (dateIndex > 0){
            $(this).removeClass("past present")
            $(this).addClass("future");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
        }
        else {
            $(this).removeClass("future present")
            $(this).addClass("past");
            $(this).find("i").addClass("disabled");
            $(this).find(".saveBtn").attr("disabled",true);
        }
    }
    else {
        if (dateIndex == 0){
            $(this).removeClass("future");
            $(this).addClass("present");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
        }
        else if (dateIndex > 0){
            $(this).removeClass("past present");
            $(this).addClass("future");
            $(this).find("i").removeClass("disabled");
            $(this).find(".saveBtn").attr("disabled",false);
        }
        else {
            $(this).removeClass("future present")
            $(this).addClass("past");
            $(this).find("i").addClass("disabled");
            $(this).find(".saveBtn").attr("disabled",true);
        }
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

//adds functionality to the save buttons for each row, is disabled when row has class of past
$(".saveBtn").on("click", function (){
    var time = $(this).parent().attr("val");
    var event = $(this).parent().find("textArea").val()
    dayEvents[(parseInt(time)-6)] = event;
    localStorage.setItem(date, JSON.stringify(dayEvents));
})

//ADD Dom elements, Make the event row a button to bring up pop up
    //Add edit button to show form input/edit details
    //Have event row only show event title
    //Make past rows uneditable

$(".previous").on("click", function (){
    dateIndex--;
    hourBack();
    date = moment().add(dateIndex, "days").format('dddd, MMMM Do');
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    $("#currentDay").text(date);
    index = 6;
    $(".row").each(function(){
        $(this).find("textarea").val(dayEvents[index-6]);
        index++;
    })
})

$(".next").on("click", function (){
    dateIndex++;
    hourBack();
    date = moment().add(dateIndex, "days").format('dddd, MMMM Do');
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    $("#currentDay").text(date);
    index = 6;
    $(".row").each(function(){
        $(this).find("textarea").val(dayEvents[index-6]);
        index++;
    })
})

$(".clearAll").on("click", function(){
    localStorage.clear();
    checkStorage();
    localStorage.setItem(date, JSON.stringify(dayEvents));
    index = 6;
    $(".row").each(function(){
        $(this).find("textarea").val(dayEvents[index-6]);
        index++;
    })
})

$(".clearCurrent").on("click", function(){
    index = 6;
    dayEvents = ["","","","","","","","","","","","",""];
    localStorage.setItem(date, JSON.stringify(dayEvents));
    $(".row").each(function(){
        $(this).find("textarea").val(dayEvents[index-6]);
        index++;
    })
})
localStorage.setItem(date, JSON.stringify(dayEvents));
//Add functionality to buttons to change the date
    //Make past dates viewable but uneditable
    //reformat LocalStorage use to data from events on multiple days
    //eventually add calendar format to choose date instead of back and forward buttons

