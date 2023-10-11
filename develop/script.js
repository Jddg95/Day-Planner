$(document).ready(function() {
  // Save event functionality
  $('.saveBtn').click(function() {
    var timeSlot = $(this).parent();
    var userInput = timeSlot.find('textarea').val();
    // Save the userInput to localStorage or your preferred storage method
    // Example: localStorage.setItem(timeSlot.attr('id'), userInput);
  });

  // Retrieve saved events from localStorage and populate the text areas
  $('.time-block').each(function() {
    var timeSlot = $(this);
    var storedEvent = localStorage.getItem(timeSlot.attr('id'));
    if (storedEvent) {
      timeSlot.find('textarea').val(storedEvent);
    }
  });

  function updateTime() {
    var currentDate = new Date();
    var currentTime = currentDate.toLocaleTimeString();
    var currentDateFormatted = currentDate.toLocaleDateString();

    // Update the content of the div with id "timeDate"
    $('#timeDate').html("Current Time: " + currentTime + "<br>Current Date: " + currentDateFormatted);
  }

  updateTime();

  setInterval(updateTime, 1000);

  var currentTime = dayjs();

  // Loop through each time slot and compare with the current time
  $('.time-block').each(function() {
    var timeSlot = dayjs($(this).find('.hour').text(), "h:mm A");

    if (currentTime.isBefore(timeSlot, 'hour')) {
      $(this).addClass('future');
    } else if (currentTime.isSame(timeSlot, 'hour')) {
      $(this).addClass('present');
    } else {
      $(this).addClass('past');
    }
  });
});
