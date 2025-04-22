<?php 
include 'connect.php';

// Check if the form is submitted
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];

    // Prepare an SQL statement
    $stmt = mysqli_prepare($conn, "INSERT INTO userstable (Uname, Uemail, Umobile, Upassword) VALUES (?, ?, ?, ?)");
    
    // Bind the parameters
    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $mobile, $password);
    
    // Execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // echo "Data Inserted Successfully";
        header('location:display.php');
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
}

// Close the connection (optional at the end)
mysqli_close($conn); 

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>PHP CRUD Application</title>
</head>
<body>

<div class="container" style="max-width: 80%;">
    <h1 class="text-center">Add User</h1>
    <form method="post">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name="name" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Mobile</label>
            <input type="text" name="mobile" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="text" name="password" class="form-control">
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

</body>
</html>
