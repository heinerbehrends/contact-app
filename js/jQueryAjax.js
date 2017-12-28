$(function() {
  // create the table rows from the database
  $.ajax({
    method: "GET",
    url: "get_records.php",
  }).done(function(data) {
    var result = $.parseJSON(data);
    // create the html for the table
    var table = "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th></tr>";
    // create the table rows in a loop
    $.each(result, function(key, value) {
      table += "<tr id='" + value['id'] + "'><td>" + value['id'] + "</td><td>" + value['first_name']
       + "</td><td>" + value['last_name'] + "</td><td>" + value['email'] + "</td><td>"
       + "<button class='delete' data-id='" + value['id'] + "'> delete </button></td></tr>";
    });
    table += "</table>";
    // insert  table into #records
    $("#records").html(table);

    // Event handler click for delete buttons
    $(".delete").click(function() {
      var row_id = $(this).attr("data-id");
      $.ajax({
        method: "POST",
        url: "delete.php",
        data: {id: row_id},
      }).done(function(row_id) {
          $("#" + row_id).hide(1000, 'ease');
      });    });
  });

  // // Event handler click for delete buttons
  // $(".delete").click(function() {
  //   console.log("yeah");
  //   var id = $(this).attr("id");
  //   console.log(id);
  // });

  // live update of submitted data
  var form = $("form");
  form.submit(function(event) {
      // stop the normal html submit
      event.preventDefault();
      var form_data = form.serializeArray();
      // create table row
      var nr_of_rows = $("tr").length;
      // var index_last_row = last_row;
      // console.log(id_last_row);
      var row = "";
      row += "<tr id='" + nr_of_rows + "'><td>" + nr_of_rows + "</td><td>" + form_data[0].value + "</td><td>"
      + form_data[1].value + "</td><td>" + form_data[2].value + "</td><td>"
      + "<button class='delete' data-id='" + nr_of_rows + "'> delete </button></td></tr>";
      $("table").append(row);
      // attach click event handler for new button
      $(".delete").click(function() {
        var row_id = $(this).attr("data-id");
        $.ajax({
          method: "POST",
          url: "delete.php",
          data: {id: row_id},
        }).done(function(row_id) {
            $("#" + row_id).hide(1000, 'ease');
        });
      });
      // console.log(form_data);
      $.ajax({
      method: "POST",
      url: form.attr('action'),
      data: form.serialize(),
      success: function(data) {
        console.log(form_data);
      },
      error: function(data) {
        console.log("An error occured");
      },
    });
  });


});
