<?php 
include 'connect.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Display Details</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <a href="./user.php" class="btn btn-primary mb-3">Add User</a>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID No</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Mobile</th>
          <th scope="col">Password</th>
          <th scope="col">Operations</th>
        </tr>
      </thead>
      <tbody>
        <?php 
           $sql = "SELECT * FROM userstable";
           $result = mysqli_query($conn, $sql);
           if (!$result) {
               die("Query failed: " . mysqli_error($conn));
           }
          if (mysqli_num_rows($result) > 0) {
             while ($row = mysqli_fetch_assoc($result)) {
              $id = $row['UId'];
              $name = $row['UName'];
              $email = $row['UEmail'];
              $mobile = $row['UMobile'];
              $password = $row['UPassword'];
              echo '<tr>
                  <th scope="row">'.$id.'</th>
                  <td>'.$name.'</td>
                  <td>'.$email.'</td>
                  <td>'.$mobile.'</td>
                  <td>'.$password.'</td>
                  <td>
                    <button><a href="update.php?updateid='.$id.'" class="btn btn-warning btn-sm">Update</a></button>
                    <button><a href="delete.php?deleteid='.$id.'" class="btn btn-danger btn-sm">Delete</a></button>
                  </td>
                </tr>';
             }
          } else {
              echo "<tr><td colspan='6'>No users found</td></tr>";
          }
          ?>
      </tbody>
    </table>
  </div>

  <?php 
    mysqli_close($conn);
    ?>
</body>

</html>