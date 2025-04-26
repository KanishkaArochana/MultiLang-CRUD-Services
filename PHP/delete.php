<?php 
include 'connect.php';

if (isset($_GET['deleteid'])) {
    $id = $_GET['deleteid'];

    // Sanitize the input to avoid SQL injection
    $id = mysqli_real_escape_string($conn, $id);

    $sql = "DELETE FROM userstable WHERE UId = $id";
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
        // echo "Deleted Successfully!";
        header('location:display.php');
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
