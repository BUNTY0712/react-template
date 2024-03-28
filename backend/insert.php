<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
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

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $title = $_POST['title'];
  $description = $_POST['description'];
  $gender = $_POST['gender']; // Retrieve gender value from form
  $color = $_POST['color'];   // Retrieve color value from form

  // Handle file upload
  if ($_FILES['image']) {
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/react-template/src/upload/';

    if (!is_dir($uploadDirectory) || !is_writable($uploadDirectory)) {
      $response = ['success' => false, 'message' => 'Upload directory is not valid.'];
      echo json_encode($response);
      exit();
    }

    // Handle image file
    $imageFile = $_FILES['image'];
    $imageFileName = $imageFile['name'];
    $imageTempFilePath = $imageFile['tmp_name'];
    $uniqueImageFileName = uniqid() . "_" . $imageFileName;
    $imageTargetFilePath = $uploadDirectory . $uniqueImageFileName;

    if (!move_uploaded_file($imageTempFilePath, $imageTargetFilePath)) {
      $response = ['success' => false, 'message' => 'Failed to move the image file.'];
      echo json_encode($response);
      exit();
    }
  } else {
    // If image file is not provided, set default value
    $uniqueImageFileName = '';
  }

  // Prepare SQL statement
  $stmt = $conn->prepare("INSERT INTO items (title, image, description, gender, color) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sssss", $title, $uniqueImageFileName, $description, $gender, $color);

  // Execute SQL statement
  if ($stmt->execute() === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $stmt->error;
  }

  // Close statement
  $stmt->close();
}

// Close connection
$conn->close();
?>
