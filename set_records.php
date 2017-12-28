<?php
// define variables and set to empty values
$first_name = $email = $last_name = "";
// input validation with test_input() not working
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
  // if query succeeds get last entry from db and echo to client, else echo an error message
  $sql2 = "SELECT row from table ORDER BY id DESC LIMIT 1";

  if($conn->query($sql) == true) {
    echo $conn->insert_id;
  }
  // $last_row = $conn->query($sql2);
  else {
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
