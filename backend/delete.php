<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Include DELETE method
header("Access-Control-Allow-Headers: Content-Type");

// Establish connection to MySQL database
$servername = "localhost"; // Change to your MySQL server hostname
$username = "root"; // Change to your MySQL username
$password = ""; // Change to your MySQL password
$dbname = "react_crud"; // Change to your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// Check if the ID parameter is provided
if(isset($_GET['id'])) {
    // Retrieve the ID from the request
    $id = $_GET['id'];
    
    // Assuming you have a database connection established already
    // Replace 'items' with the actual table name in your database
    $query = "DELETE FROM items WHERE id = $id";

    // Execute the query
    if(mysqli_query($conn, $query)) { // Change $your_db_connection to $conn
        // Deletion successful
        echo json_encode(array("message" => "Item deleted successfully"));
    } else {
        // Deletion failed
        echo json_encode(array("error" => "Error deleting item"));
    }
} else {
    // ID parameter not provided
    echo json_encode(array("error" => "ID parameter is missing"));
}
?>
