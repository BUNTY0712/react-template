<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_crud";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_GET['id'];

    $newTitle = $_POST['title'];
    $newDescription = $_POST['description'];
    $newGender = $_POST['gender'];
    $newColor = $_POST['color'];

    $newImage = "";
    if (isset($_FILES['image'])) {
        $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/react-template/src/upload/';

        if (!is_dir($uploadDirectory) || !is_writable($uploadDirectory)) {
            echo json_encode(array("error" => "Upload directory is not valid."));
            exit();
        }

        $imageFile = $_FILES['image'];
        $imageFileName = $imageFile['name'];
        $imageTempFilePath = $imageFile['tmp_name'];
        $uniqueImageFileName = uniqid() . "_" . $imageFileName;
        $imageTargetFilePath = $uploadDirectory . $uniqueImageFileName;

        if (!move_uploaded_file($imageTempFilePath, $imageTargetFilePath)) {
            echo json_encode(array("error" => "Failed to move the image file."));
            exit();
        }

        $newImage = $uniqueImageFileName;
    }

    $stmt = $conn->prepare("UPDATE items SET title = ?, description = ?, image = ?, gender = ?, color = ? WHERE id = ?");
    $stmt->bind_param("sssssi", $newTitle, $newDescription, $newImage, $newGender, $newColor, $id);

    if ($stmt->execute()) {
        // Fetch updated data
        $sql = "SELECT * FROM items";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            echo json_encode(array("error" => "No data found"));
        }
    } else {
        echo json_encode(array("error" => "Error updating item: " . $conn->error));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();
?>
