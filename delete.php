<?php
$id = 0;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $id = $_POST["id"];
}
// setup variables for db connection
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
// sql to delete a record
$sql = "DELETE FROM contacts WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo $id;
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}
// close connection
$conn->close();
?>
