// Display the current day at the top of the calendar
// const currentDayElement = document.getElementById('currentDay');
// currentDayElement.textContent = dayjs().format('dddd, MMMM D, YYYY');


// Function to display current day and time blocks
function displayPlanner() {
    const currentDayElement = document.getElementById('currentDay');
    const timeBlocksElement = document.getElementById('timeBlocks');
    const now = dayjs(); // Get the current date and time using Day.js
    const currentDay = now.format('dddd, MMMM D, YYYY'); // Format the date
    currentDayElement.textContent = currentDay;

    // Standard business hours
    const businessHours = ['9AM ', '10AM', '11AM', '12PM', '1PM ', '2PM  ', '3PM ', '4PM', '5PM'];

    businessHours.forEach(hour => {
        const timeBlock = document.createElement('p');
        timeBlock.classList.add('time-block');
        timeBlock.textContent = hour;

        // Add color-coding based on past, present, and future using Day.js
        const timeBlockTime = dayjs(hour, 'h A'); // Parse the time using Day.js
        if (timeBlockTime.isBefore(now, 'hour')) {
            timeBlock.classList.add('past');
        } else if (timeBlockTime.isSame(now, 'hour')) {
            timeBlock.classList.add('present');
        } else {
            timeBlock.classList.add('future');
        }

        timeBlocksElement.appendChild(timeBlock);

        // Add click event to allow users to enter an event
        timeBlock.addEventListener('click', () => {
            const eventText = prompt(`Enter an event for ${hour}:`);
            if (eventText !== null) {
                // Save the event in local storage
                localStorage.setItem(hour, eventText);
                // Display the event in the time block
                timeBlock.textContent = `${hour}: ${eventText}`;
            }
        });

        // Retrieve and display saved events from local storage
        const savedEvent = localStorage.getItem(hour);
        if (savedEvent) {
            timeBlock.textContent = `${hour}: ${savedEvent}`;
        }
    });
}

// Call the function to display the planner
displayPlanner();
