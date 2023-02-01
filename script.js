// Get current day and display it on the page
let currentDay = document.getElementById("currentDay");
let today = new Date();
let day = today.getDay();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
currentDay.textContent = daysOfWeek[day] + ", " + today.toLocaleDateString();

// Get all timeblocks and set the colors based on past, present, and future
let timeblocks = document.querySelectorAll(".timeblock");
let hour = new Date().getHours();

timeblocks.forEach(timeblock => {
    let timeblockHour = parseInt(timeblock.getAttribute("data-hour"));
    let description = timeblock.querySelector(".description");

    if (timeblockHour < hour) {
        description.classList.add("past");
    } else if (timeblockHour === hour) {
        description.classList.add("present");
    } else {
        description.classList.add("future");
    }
});

// Save event to local storage when save button is clicked
let saveBtns = document.querySelectorAll(".saveBtn");

saveBtns.forEach(saveBtn => {
    saveBtn.addEventListener("click", function() {
        let timeblock = this.parentElement;
        let hour = timeblock.getAttribute("data-hour");
        let description = timeblock.querySelector(".description").value;

        localStorage.setItem(hour, description);
    });
});

// Get events from local storage and display them on the page
timeblocks.forEach(timeblock => {
    let hour = timeblock.getAttribute("data-hour");
    let description = timeblock.querySelector(".description");

    description.value = localStorage.getItem(hour);
});
