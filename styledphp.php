<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" >
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:200,400,600,800">
  <title>Email contacts</title>
</head>
<body>
  <!-- main elements -->
  <!-- search form -->
  <form class="fixed-top">
    <div class="form-row my-3">
      <i class="col-auto material-icons pr-0 mx-3 my-auto medium">search</i>
      <input id="search" class="col form-control form-control-lg mr-4 py-2 px-3"
      type="search" name="search" placeholder="Search contacts" autofocus>
    </div>
  </form>
  <h1 class="py-0 pb-4 pt-3 text-center">my email contacts</h1>
  <!-- empty div for js -->
  <div id="contacts">
  </div>
  <!-- input form -->
  <div class="card fixed-bottom">
    <div id="add-contact" class="card-header px-0">
      <div class="row no-gutters">
        <i id="plus-minus" class="material-icons col-auto medium my-auto mx-3 text-success">add</i>
        <h3 class="col mb-0 my-auto ml-3">Add a contact</h3>
      </div>
    </div>
    <form id="needs-validation" method="post" action="set_records.php" novalidate>
      <div class="container-fluid p-4">
        <div class="form-group">
          <label for="customValidation1">First Name <small>(required)</small></label>
          <input id="customValidation1" name="first_name" class="form-control form-control-lg" placeholder="Enter First Name" required>
          <div class="invalid-feedback">Please enter a first name.</div>
        </div>
        <div class="form-group">
          <label for="customValidation2">Last Name <small>(required)</small></label>
          <input id="customValidation2" name="last_name" class="form-control form-control-lg" placeholder="Enter Last Name" required>
          <div class="invalid-feedback">Please enter a second name.</div>
        </div>
        <div class="form-group">
          <label for="customValidation3">Email address <small>(required)</small></label>
          <input id="customValidation3" type="email" name="email" class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
          <div class="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <button type="submit" value="Submit" class="btn btn-block btn-success btn-lg my-4">Submit</button>
      </div>
    </form>
  </div>

  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
  <script src="js/jQueryAjaxStyled.js"></script>
</body>
</html>
