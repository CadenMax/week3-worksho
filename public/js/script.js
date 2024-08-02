// public/js/script.js
$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get form data
      const formData = {
        username: $('#username').val(),
        password: $('#password').val()
      };
  
      // Send AJAX POST request to /login route
      $.post('/login', formData, function(response) {
        if (response.valid) {
          // Hide the error message if login is successful
          $('#errormsg').removeClass('showmessage').addClass('hidemessage');
          window.location.href = '/account';
        } else {
          // Show the error message if login fails
          $('#errormsg').removeClass('hidemessage').addClass('showmessage');
        }
      });
    });
  });
  