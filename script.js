var date = moment().format('dddd, MMMM Do');
var keyDate = moment().get('date');
var currentHour = moment().hour();
$("#currentDay").text(date);

updateTime();

setInterval(function(){
    updateTime();
}, 1000);


if (keyDate != localStorage.getItem("date")){
    localStorage.clear();
    localStorage.setItem("date", keyDate);
}

for (index = 7; index < 20; index++){
    $(".container").append(makeBlocks(index));
}

function hourBack(i){
    if (currentHour > i)
        return "past";
    else if (currentHour < i)
        return "future";
    else 
        return "present";
}

function makeBlocks (i){
    var hour = $("<div>", {"class": "time-block row"});
    var time = $("<span>", {"class": "hour"});
    var event = $("<textarea>", {"class": "description"});
    var icon = $("<i>", {"class": "material-icons"});
    var save = $("<button>", {"class": "saveBtn"});

    icon.html("assignment_returned");
    save.append(icon);

    if(i<12){
        time.text(i + " AM");
        hour.attr("val", i);
        event.addClass (hourBack(i));
        event.val(localStorage.getItem(i));
        hour.append(time);
        hour.append(event);
        if (event.hasClass("past")){
            save.attr("disabled", true);
            save.attr("style", "color: rgb(131, 188, 201)");
        }
        hour.append(save);
    }
    else{
        hour.attr("val", (i-12));
        event.addClass (hourBack(i));
        event.val(localStorage.getItem(i-12));
        
        if (i == 12)
            time.text((i) + " PM");
        else{
            time.text((i-12) + " PM");
        }
        if (event.hasClass("past")){
            save.attr("disabled", true);
            save.attr("style", "color: rgb(131, 188, 201)");
        }
        hour.append(time);
        hour.append(event);
        hour.append(save);
    }
    
    return hour;
}

function updateTime(){
    $("#currentTime").text(moment().format("LTS"));
}

$(".saveBtn").on("click", function (){
    var time = $(this).parent().attr("val");
    var event = $(this).parent().find("textArea").val()
    localStorage.setItem(time, event);
})