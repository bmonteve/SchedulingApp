# SchedulingApp

Currently this page allows a user to see the current date and time, and schedule events on the current day only. Buttons have been added to allow switching to previous and future dates, but the functionality has not been added yet. On the current day, the page allows a user to add events to hours that have not already passed, as it disables the save button from allowing storage of past events if the time has already passed. It will update each row with a gray, red, or green color to show which hour is past, present, or future respectively. If the hour is not in the past a user can click on the textarea in the center of the row and type in an event to be scheduled. Once the button is clicked the event will save to local storage under the key for that date and will remain within that hour row when the page is refreshed. 

Future submissions will include:
    - Ability to clear current day events
    - Ability to clear all calendar day events
    - A popup form connected to a textarea click event to enable saving details of the event, while only displaying the event title on the page
        - This will allow the user to also click a saved event to view details that have already been saved
    - Ability to adjust the date to look at previous and future days on the calendar
        - Eventually a click event will be added to the day to choose a day from a pop up calendar and the next and previous buttons will be removed
            - By this time I believe I will need to adjust from saving events on local storage to a server as data for an entire calendar may be too much for local storage to handle