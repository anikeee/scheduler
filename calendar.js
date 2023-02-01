// Get Current Day and Time
const now = moment().format("dddd, MMMM Do");
document.querySelector("#currentDay").textContent = now;

// Standard Business Hours
const timeblocks = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM"
];

// Loop through timeblocks to create timeblock elements
timeblocks.forEach((timeblock, index) => {
    // Create Timeblock Container
    const container = document.createElement("div");
    container.classList.add("timeblock");

    // Create Hour Element
    const hour = document.createElement("div");
    hour.classList.add("hour");
    hour.textContent = timeblock;
    container.appendChild(hour);

    // Create Description Element
    const description = document.createElement("textarea");
    description.classList.add("description");
    description.setAttribute("id", `text${index}`);
    container.appendChild(description);

    // Create Save Button
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("saveBtn");
    saveBtn.innerHTML = '<i class="far fa-save"></i>';
    container.appendChild(saveBtn);

    // Append Timeblock Container to Calendar
    document.querySelector(".container").appendChild(container);

    // Get Hour in 24 Hour Format
    const currentHour = moment().format("HH");
    const blockHour = moment(timeblock, "h:mm A").format("HH");

    // Color Code Timeblocks Based on Current Time
    if (blockHour < currentHour) {
        container.classList.add("past");
    } else if (blockHour === currentHour) {
        container.classList.add("present");
    } else {
        container.classList.add("future");
    }

    // Save Event to Local Storage
    saveBtn.addEventListener("click", function() {
        localStorage.setItem(`text${index}`, description.value);
    });

    // Get Event from Local Storage and Display on Page Load
    const savedEvent = localStorage.getItem(`text${index}`);
    if (savedEvent) {
        description.value = savedEvent;
    }
});
