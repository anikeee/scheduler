const container = $(".container");
const currentDay = $("#currentDay");
const datePicker = $("#datePicker");

const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Display current day
let selectedDate = moment();
currentDay.text(selectedDate.format("dddd, MMMM Do"));

// Create date picker
datePicker.attr("value", selectedDate.format("YYYY-MM-DD"));
datePicker.on("change", function() {
    selectedDate = moment(this.value);
    currentDay.text(selectedDate.format("dddd, MMMM Do"));
    createTimeblocks();
});

// Create timeblocks for standard business hours
function createTimeblocks() {
    container.empty();
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
    // Get saved events from local storage
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};

    // Load saved events into textareas
    for (let hour in savedEvents) {
        if (savedEvents[hour].date === selectedDate.format("YYYY-MM-DD")) {
            $(`textarea[data-time="${hour}"]`).val(savedEvents[hour].event);
        }
    }

    // Color code timeblocks based on past, present, and future
    const now = new Date().get


    // Color code timeblocks based on past, present, and future
    const now = new Date().getHours();
    $(".timeblock").each(function() {
        const hour = parseInt($(this).find(".hour").text().split(":")[0]);
        if (hour < now) {
            $(this).addClass("past");
        } else if (hour === now) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    });

// Save event to local storage when save button is clicked
    $(".saveBtn").on("click", function() {
        const hour = $(this).siblings(".hour").text().split(':')[0];
        const event = $(this).siblings(".description").val();
        const date = selectedDate.format("YYYY-MM-DD");
        savedEvents[hour] = {event: event, date: date};
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
});
