$(function() {
  // Event handler for form toggle
  $("#add-contact").click(function() {
    $(this).next().slideToggle("slow", function() {
      $('#plus-minus').html($('#plus-minus').text() == "remove" ?  "add"  :  "remove");
    });
  });
  // function to create a card
  function makeCard(id, firstName, lastName, email) {
    var card =  '';
    card += "<div id='" + id + "' class='card'>" +
    "<div class='card-header card-header-info toggle view-contact px-0'>" +
    "<div class='row no-gutters'>" +
    "<i class='arrow-person material-icons col-auto medium my-auto mx-3'>account_circle</i>" +
    "<h3 class='col my-auto ml-3'>" + firstName + " " +  lastName + "</h3>" +
    "<i class='arrow-person material-icons col-auto medium my-auto ml-auto pr-3'>keyboard_arrow_down</i>" +
    "</div>" +
    "</div>" +
    "<ul class='list-group list-group-flush'>" +
    "<a href='mailto:" + email + "'>" +
    "<li class='list-group-item px-0'>" +
      "<div class='row no-gutters'>" +
        "<i class='material-icons col-auto medium my-auto mx-4 py-3 text-warning'>email</i>" +
        "<div class='email col my-auto pr-5 text-dark'>" + email + "</div>" +
      "</div>" +
    "</li>" +
    "</a>" +
    "<ul class='list-group listgroup-flush'>" +
    "<li class='info list-group-item px-0'>" +
      "<div class='row no-gutters'>" +
        "<i class='material-icons col-auto medium my-auto mx-4 py-3 text-dark'>info_outline</i>" +
        "<div class='col my-auto pr-5'>Are you sure you want to delete this entry?</div>" +
      "</div>" +
    "</li>" +
    "<li class='cancel list-group-item px-0'>" +
      "<div class='row no-gutters'>" +
        "<i class='material-icons col-auto medium my-auto mx-4 text-primary'>highlight_off</i>" +
        "<div class='col my-auto pr-3 text-primary'>Cancel</div>" +
      "</div>" +
    "</li>" +
    "</ul>" +
    "<li class='delete list-group-item px-0' data-id='" + id + "'>" +
    "<div class='row no-gutters'>" +
    "<i id='delete-icon' class='material-icons col-auto medium my-auto mx-4 text-danger'>delete</i>" +
    "<div class='col my-auto text-danger'>Delete contact</div>" +
    "</div>" +
    "</li>" +
    "</ul>" +
    "</div>";
    return card
  }

  // create the togglable cards from the database with $.ajax and $.each loop
  $.ajax({
    method: "GET",
    url: "read_write.php",
  }).done(function(data) {
    // save result in global variable
    window.result = $.parseJSON(data);
    // create the cards in a loop
    $.each(result, function(key, value) {
      // create variables for makeCard()
      var id = value['id'];
      var firstName = value['first_name'];
      var lastName = value['last_name'];
      var email = value['email'];
      var card = makeCard(id, firstName, lastName, email);
      // insert  table into #records
      $("#contacts").append(card);
    });

    // event handler for toggle view
    var toggle = $(".toggle");
    toggle.click(function() {
      console.log("click toggle");
      $(this).next().slideToggle("slow");
      $(this).parent().siblings().children().next().slideUp("slow");
      // change the icons on click
      // $(".view-contact").click(function() {
      //   var icon = $(this).find("i");
      //   icon.html(icon.text() == "account_circle" ? "keyboard_arrow_down" : "account_circle");
      // });
    });
    // function to transform get fullnames and id in each object
    function makeFullName(json) {
      var new_json = [];
      for (var i=0; i<json.length; i++) {
        new_object = {name: json[i].first_name + " " + json[i].last_name,
        id: json[i].id};
        new_json.push(new_object);
      }
      return new_json
    }

    $("#search").keyup(function() {
      var input = this.value;
      var fullNameID = makeFullName(window.result);
      var noMatchIDs = [];
      var matchIDs = [];
      var contacts = $("#contacts");
      console.log(fullNameID);
      // for all names in the address book
      for (i=0; i<fullNameID.length; i++) {
        // check if the user input matches the name
        if (fullNameID[i].name.toLowerCase().indexOf(input.toLowerCase()) === -1) {
          // and add the index to an array if there is no match
          noMatchIDs.push(fullNameID[i].id);
        }
        else {
          matchIDs.push(fullNameID[i].id);
        }
      }


      // function to update the UI after each show() or hide()
      function updateUI(contacts) {
        console.log(contacts.children("div:visible").length);
        // if there is only one card left open it
        if (contacts.children("div:visible").length === 1) {
          contacts.children("div:visible").children("ul").slideDown("slow");
        }
        // if there are no results show a message
        if (contacts.children(":visible").length === 0) {
          contacts.append("<p id='no-entries' class='lead text-center'>No entries match your search</p>");
        }
        // if there is more than one card, close the open card
        if (contacts.children("div:visible").length > 1) {
          contacts.children().children("ul").slideUp();
        }
      }

      // hide all cards that do not match the user input
      for (i=0; i<noMatchIDs.length; i++) {
        $("#" + noMatchIDs[i]).hide(300, function() {
          updateUI(contacts);
        });
      }



      // show all the cards that do match the user inputs
      for (i=0; i<matchIDs.length; i++) {
        $("#" + matchIDs[i]).show(300, function() {
          updateUI(contacts);
        });
      }

      // if there are matching contacts than remove the message
      if (matchIDs.length > 0) {
        $("#no-entries").remove();
      }


    });

    // post form data to db
    var form = $("#needs-validation");
    form.submit(function(event) {
      if (!form[0].checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form[0].classList.add('was-validated');
        return
      }
      // stop the normal html submit
      event.preventDefault();
      // get the posted data for new card
      var form_data = form.serializeArray();
      $.ajax({
        method: "POST",
        url: form.attr('action'),
        data: form.serialize(),
        // set_records echoes the id of the newly created row
        success: function(data) {
          var id = data;
          var firstName = form_data[0].value;
          var lastName = form_data[1].value;
          var email = form_data[2].value;
          // concat string with posted data for new card
          // repeated code
          var card = makeCard(id, firstName, lastName, email);
          $("#contacts").append(card);
          // event handler for toggle view
          console.log("#" + id);
          // repeated code
          var new_element = $("#" + id).children(".toggle");
          new_element.click(function() {
            console.log("click toggle");
            $(this).next().slideToggle("slow");
            $(this).parent().siblings().children().next().slideUp("slow");
          });
          // repeated code
          // variables for delete buttons
          var deleteCount = 0;
          var deleteButtons = $(".delete");
          // setup event listeners for .delete class
          deleteButtons.click(function() {
            $(this).prev().slideDown("slow");
            deleteCount ++;
            var row_id = $(this).attr("data-id");
            if (deleteCount === 2) {
              $.ajax({
                method: "POST",
                url: "delete.php",
                data: {id: row_id},
              }).done(function(row_id) {
                $("#" + row_id).hide("slow", function() {
                  $("#" + row_id).remove();
                });
              });
            }
          });
          // repeated code
          // Cancel buttons
          $('.cancel').click(function() {
            $(this).parent().next().removeAttr("clicked");
            $(this).parent().slideUp("slow", function() {
              $('#delete-icon').html($('#delete-icon').text() == "delete_forever" ?  "delete"  :  "delete_forever");
            });
          });
          // close the dialog, scroll to the new item and open it
          $("#add-contact").next().slideToggle("slow", function() {
            $('#plus-minus').html($('#plus-minus').text() == "remove" ?  "add"  :  "remove");
            $('html, body').animate({
              scrollTop: $("#" + id).offset().top
            }, 1000);
            $("#" + id).children("ul").slideDown("slow");
          });
        },
        error: function(data) {
          console.log("An error occured");
        },
      });
    });
    // variables for delete buttons
    var deleteButtons = $(".delete");
    // setup event listeners for .delete class
    deleteButtons.click(function() {
      $(this).prev().slideDown("slow", function() {
        // does not work - supposed to toggle the icon
        $('#delete-icon').html($('#delete-icon').text() == "delete_forever" ?  "delete"  :  "delete_forever");
      });
      var row_id = $(this).attr("data-id");
      // check if this element has been clicked before
      if ($(this).attr("clicked")) {
        // if so post delete request and remove the element from DOM
        $.ajax({
          method: "POST",
          url: "delete.php",
          data: {id: row_id},
        }).done(function(row_id) {
          $("#" + row_id).hide("slow", function() {
            $("#" + row_id).remove();
          });
        });
      }
      // if not set the clicked attribute to true
      else {
        $(this).attr("clicked", true);
      }
    });
    // Cancel buttons
    $('.cancel').click(function() {
      $(this).parent().next().removeAttr("clicked");
      $(this).parent().slideUp("slow", function() {
        $('#delete-icon').html($('#delete-icon').text() == "delete_forever" ?  "delete"  :  "delete_forever");
      });
    });

  });

  // // When clicked on list-group-item-danger change modal content
  // $('#confirm-delete').on('show.bs.modal', function (event) {
  //   var button = $(event.relatedTarget); // Button that triggered the modal
  //   // Extract info from data-* attributes
  //   var id = button.data('id');
  //   var firstName = button.data('first-name');
  //   var lastName = button.data('last-name');
  //   var email = button.data('email');
  //   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  //   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  //   var modal = $(this);
  //   modal.find('#name').text(firstName + " " + lastName);
  //   modal.find('#email').text(email);
  //   // // add data id to Button
  //   // button.data('data-id', id);
  //   // attach click event handler for delete li
  //   $("#delete").click(function() {
  //     var row_id = button.attr("data-id");
  //     console.log(row_id);

  //   });
  // });


});
