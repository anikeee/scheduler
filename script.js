// File name: script.js

const container = $(".container");
const currentDay = $("#currentDay");

const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Display current day
currentDay.text(moment().format("dddd, MMMM Do"));

// Create timeblocks for standard business hours
businessHours.forEach(hour => {
    const timeblock = $("<div>").addClass("timeblock row");
    const time = $("<div>")
        .addClass("col-2 hour")
        .text(`${hour}:00`);
    const event = $("<textarea>")
        .addClass("col-9 description")
        .attr("data-time", hour);
    const saveBtn = $("<button>")
        .addClass("col-1 saveBtn")
        .html("<i class='fas fa-save'></i>");
    timeblock.append(time, event, saveBtn);
    container.append(timeblock);
});
