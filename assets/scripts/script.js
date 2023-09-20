// Display the current day at the top of the calendar

$(document).ready(function () {
     $("#currentDay").text(dayjs().format('dddd MMMM D YYYY'));

  // Color-code each timeblock based on past, present, and future when the timeblock is viewed.
  function updateTimeblockColors() {
    let currentHour = dayjs().hour();

    $(".time-block").each(function () {
      let blockHour = parseInt($(this).attr("id"));

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Allow a user to enter an event when they click a timeblock
  $(".saveBtn").on("click", function () {
    let hour = $(this).closest(".time-block").attr("id");
    let event = $(this).siblings(".plan").val();
    localStorage.setItem(hour, event);
  });

  // Save the event in local storage when the save button is clicked in that timeblock.
  function loadEvents() {
    $(".time-block").each(function () {
      let hour = $(this).attr("id");
      let event = localStorage.getItem(hour);
      $(this).find(".plan").val(event);
    });
  }


  updateTimeblockColors();
  loadEvents();
});