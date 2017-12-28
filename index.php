<html>
  <head>
    <meta charset="utf-8">
    <title>Ajax Address Book</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <?php
      // define variables and set to empty values
      $first_name = $email = $last_name = "";

      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $first_name = test_input($_POST["first_name"]);
        $last_name = test_input($_POST["last_name"]);
        $email = test_input($_POST["email"]);
        // setup variables for db access
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "address_book";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
           die("Connection failed: " . $conn->connect_error);
        }

        // Escape user inputs for security
        $first_name = $conn->real_escape_string($_REQUEST['first_name']);
        $last_name = $conn->real_escape_string($_REQUEST['last_name']);
        $email = $conn->real_escape_string($_REQUEST['email']);

        // attempt insert query execution
        $sql = "INSERT INTO contacts (first_name, last_name, email) VALUES ('$first_name', '$last_name', '$email')";

        if($conn->query($sql) === true){
            echo "Records inserted successfully.";
        } else {
            echo "ERROR: Could not able to execute $sql. " . $conn->error;
        }

        // Close connection
        $conn->close();
      }
      // input validation
      function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }
    ?>

    <!-----------Beginning of HTML--------------->
    <article class="container">
      <h1>Email Addresses</h1>
      <!-- empty section for html insert via js -->
      <section id="records">
      </section>
      <!-- form section -->
      <section>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" target="target">
          <input type="text" name="first_name" placeholder="First Name">
          <input type="text" name="last_name" placeholder="Last Name">
          <input type="text" name="email" placeholder="myaddress@example.com">
          <input type="submit" name="submit" value="Submit">
        </form>
      </section>
    </article>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="js/jQueryAjax.js"></script>
  </body>
</html>
