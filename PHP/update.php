<?php
include 'connect.php';

$id = $_GET['updateid'];
$sql = "SELECT * FROM userstable WHERE UId = $id";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

$name = $row['UName'];
$email = $row['UEmail'];
$mobile = $row['UMobile'];
$password = $row['UPassword'];

// Check if the form is submitted
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];

    // Prepare the SQL query
    $query = "UPDATE userstable SET UName = ?, UEmail = ?, UMobile = ?, UPassword = ? WHERE UId = ?";

    // Prepare an SQL statement
    $stmt = mysqli_prepare($conn, $query);

    // Check if the statement is prepared successfully
    if ($stmt) {
        // Bind the parameters
        mysqli_stmt_bind_param($stmt, "ssssi", $name, $email, $mobile, $password, $id);

        // Execute the statement
        if (mysqli_stmt_execute($stmt)) {
            // echo "Update Successfully";
            header("Location: display.php");
            exit(); // Ensure script stops after redirect
        } else {
            echo "Error: " . mysqli_stmt_error($stmt);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Close the connection
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
    <h1 class="text-center">Update User</h1>
    <form method="post">
    <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" name="name" class="form-control" value="<?php echo htmlspecialchars($name); ?>">
    </div>

    <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" name="email" class="form-control" value="<?php echo htmlspecialchars($email); ?>">
    </div>

    <div class="mb-3">
        <label class="form-label">Mobile</label>
        <input type="text" name="mobile" class="form-control" value="<?php echo htmlspecialchars($mobile); ?>">
    </div>

    <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="text" name="password" class="form-control" value="<?php echo htmlspecialchars($password); ?>">
    </div>

    <button type="submit" name="submit" class="btn btn-primary">Update</button>
</form>

</div>
        

</body>
</html>
