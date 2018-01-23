<?php
// define variables and set to empty values
$first_name = $email = $last_name = "";
// input validation with test_input() not working
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $first_name = test_input($_POST["first_name"]);
  $last_name = test_input($_POST["last_name"]);
  $email = test_input($_POST["email"]);
  // setup variables for db access
  include 'config.php';

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // prepare and bind
  $stmt = $conn->prepare("INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $first_name, $last_name, $email);

  // Escape user inputs for security
  $first_name = $conn->real_escape_string($_REQUEST['first_name']);
  $last_name = $conn->real_escape_string($_REQUEST['last_name']);
  $email = $conn->real_escape_string($_REQUEST['email']);

  // attempt insert query execution
  if($stmt->execute() == true) {
    echo $conn->insert_id;
  }
  else {
    echo "ERROR: Not able to execute $stmt. " . $conn->error;
  }

  // Close connection
  $stmt->close();
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
