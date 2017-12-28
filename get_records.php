<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "address_book";

// declare result array
$result_array = array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

// sql to get data from db
$sql = "SELECT id, first_name, last_name, email FROM contacts ORDER BY last_name ASC";
$result = $conn->query($sql);

// if there are results push them to the result_array
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($result_array, $row);
  }
}
// echo a json encoded array to the client
echo json_encode($result_array);
// close the db connection
$conn->close();
?>
