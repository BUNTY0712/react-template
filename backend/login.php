<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_crud";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetching data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Prepare a statement to select user by email and password
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User is authenticated
    $user = $result->fetch_assoc();
    $response = array("success" => true, "user" => $user);
    echo json_encode($response);
} else {
    // User authentication failed
    $response = array("success" => false, "message" => "Invalid email or password");
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>
