<?php
// Database credentials
$servername = "localhost";// Server name 
$username = "root"; // Database username
$password = "";  // Database password 
$dbname = "phpcrud"; // Database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>