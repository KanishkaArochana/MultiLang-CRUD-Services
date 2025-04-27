# PHP CRUD Application Documantation

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [File Descriptions](#file-descriptions)
- [How to Use](#how-to-use)
- [Files Explanation](#files-explanation)
  - [connect.php](#connectphp)
  - [display.php](#displayphp)
  - [delete.php](#deletephp)
  - [update.php](#updatephp)
  - [user.php](#userphp)


## Project Overview
This is a simple PHP CRUD Application that performs basic Create, Read, Update, and Delete operations on a database using MySQL. The application consists of multiple PHP scripts that allow users to manage data stored in a `userstable` table.

### Features
- **Add User**: Insert a new user into the database.
- **View Users**: Display a list of all users.
- **Update User**: Edit an existing user's information.
- **Delete User**: Remove a user from the database.

## Prerequisites
Before you begin, ensure you have the following installed:
1. XAMPP or WAMP server for running PHP and MySQL.
2. PHP
3. MySQL Database.

## Setup Instructions
1. **Clone or Download the project files.**
2. **Create Database and Table:**
    - Open your phpMyAdmin and create a database named `phpcrud`.
    - Run the following SQL query to create the `userstable` table:
      ```sql
      CREATE TABLE userstable (
          UId INT AUTO_INCREMENT PRIMARY KEY,
          Uname VARCHAR(50) NOT NULL,
          Uemail VARCHAR(50) NOT NULL,
          Umobile VARCHAR(15) NOT NULL,
          Upassword VARCHAR(50) NOT NULL
      );
      ```
3. **Configure Database Connection:**
    - Open `connect.php` and ensure the database credentials are correct:
      ```php
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "phpcrud";
      ```
4. **Run the Application:**
    - Place the project folder in the `htdocs` directory if using XAMPP.
    - Start Apache and MySQL services via XAMPP/WAMP.
    - Open your browser and visit `http://localhost/[your_project_folder]/display.php`.

## File Descriptions
- **connect.php**: Establishes a connection to the MySQL database.
- **display.php**: Displays all users from `userstable` in an HTML table.
- **user.php**: Provides a form to add new users.
- **update.php**: Provides a form to update existing user details.
- **delete.php**: Handles the deletion of a user.

## How to Use
1. **Add User:**
    - Navigate to `user.php` or click "Add User" in `display.php`.
    - Fill in the form fields and click "Submit".
2. **View Users:**
    - Visit `display.php` to see all users.
3. **Update User:**
    - Click "Update" next to a user in `display.php`.
    - Modify the fields and click "Update".
4. **Delete User:**
    - Click "Delete" next to a user in `display.php`.

## Files Explanation

### connect.php
- Handles database connection using `mysqli`.
- Establishes a connection to the MySQL database.
- Terminates the script if the connection fails.

#### Functions Used:
1. `new mysqli()`
    - Creates a new connection to the MySQL server.
      ```php
      $conn = new mysqli($servername, $username, $password, $dbname);
      ```
2. `$conn->connect_error`
    - Checks if there is an error in the connection.
      ```php
      if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      ```

### display.php
- Displays all user records.
     ```php
$sql = "SELECT * FROM userstable";
$result = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    echo $row['UName'];
}
     ```
- Executes `SELECT *` to fetch all users.
- Displays each user’s details in an HTML table.
- Includes Update and Delete buttons.

#### Functions Used:
1. `mysqli_query()`
    - Executes the SELECT query to fetch all users.
      ```php
      $result = mysqli_query($conn, $sql);
      ```
2. `mysqli_fetch_assoc()`
    - Fetches the result row as an associative array.
      ```php
      while ($row = mysqli_fetch_assoc($result))
      ```
3. `mysqli_num_rows()`
    - Checks the number of rows returned by the query.
      ```php
      if (mysqli_num_rows($result) > 0) {…}
      ```
4. `mysqli_close()`
    - Closes the database connection after use.
      ```php
      mysqli_close($conn);
      ```

### delete.php
- Deletes a user by ID.
     ```php
$id = $_GET['deleteid'];
$sql = "DELETE FROM userstable WHERE UId = $id";
mysqli_query($conn, $sql);
header('location:display.php');
     ```
- Takes `deleteid` from the URL.
- Deletes the record with the matching `UId`.
- Redirects to `display.php`.

#### Functions Used:
1. `$_GET['deleteid']`
    - Retrieves the `deleteid` from the URL.
      ```php
      $id = $_GET['deleteid'];
      ```
2. `mysqli_real_escape_string()`
    - Escapes special characters to prevent SQL injection.
      ```php
      $id = mysqli_real_escape_string($conn, $id);
      ```
3. `mysqli_query()`
    - Executes the DELETE query.
      ```php
      $sql = "DELETE FROM userstable WHERE UId = $id";
      $result = mysqli_query($conn, $sql);
      ```
4. `header()`
    - Redirects the user to the `display.php` page.
      ```php
      header('location:display.php');
      ```

### update.php
- Updates user details.
     ```php
$query = "UPDATE userstable SET UName = ?, UEmail = ?, UMobile = ?, UPassword = ? WHERE UId = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssssi", $name, $email, $mobile, $password, $id);
mysqli_stmt_execute($stmt);
header("Location: display.php");
     ```

- Retrieves the current user’s data.
- Updates the record when the form is submitted.
- Uses prepared statements to prevent SQL injection.

#### Functions Used:
1. `$_GET['updateid']`
    - Retrieves the `updateid` from the URL.
      ```php
      $id = $_GET['updateid'];
      ```
2. `mysqli_query()`
    - Executes the SELECT query to fetch user details.
      ```php
      $result = mysqli_query($conn, $sql);
      ```
3. `mysqli_fetch_assoc()`
    - Fetches the user details as an associative array.
      ```php
      $row = mysqli_fetch_assoc($result);
      ```
4. `isset()`
    - Checks if the form is submitted.
      ```php
      if (isset($_POST['submit'])) {…}
      ```
5. `mysqli_prepare()`
    - Prepares the UPDATE query.
      ```php
      $stmt = mysqli_prepare($conn, $query);
      ```
6. `mysqli_stmt_bind_param()`
    - Binds variables to the prepared statement.
      ```php
      mysqli_stmt_bind_param($stmt, "ssssi", $name, $email, $mobile, $password, $id);
      ```
7. `mysqli_stmt_execute()`
    - Executes the prepared statement.
      ```php
      if (mysqli_stmt_execute($stmt))
      ```
8. `mysqli_stmt_close()`
    - Closes the prepared statement.
      ```php
      mysqli_stmt_close($stmt);
      ```
9. `mysqli_close()`
    - Closes the database connection.
      ```php
      mysqli_close($conn);
      ```

### user.php
- Adds a new user to the database.
    ```php
$stmt = mysqli_prepare($conn, "INSERT INTO userstable (UName, UEmail, UMobile, UPassword) VALUES (?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $mobile, $password);
mysqli_stmt_execute($stmt);
header('location:display.php');
    ```
- Prepares and executes an INSERT query to add a user.
- Uses prepared statements to prevent SQL injection.

#### Functions Used:
1. `isset()`
    - Checks if the form is submitted.
      ```php
      if (isset($_POST['submit'])) { … }
      ```
2. `mysqli_prepare()`
    - Prepares the INSERT query.
      ```php
      $stmt = mysqli_prepare($conn, "INSERT INTO userstable (Uname, Uemail, Umobile, Upassword) VALUES (?, ?, ?, ?)");
      ```
3. `mysqli_stmt_bind_param()`
    - Binds form data to the prepared statement.
      ```php
      mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $mobile, $password);
      ```
4. `mysqli_stmt_execute()`
    - Executes the prepared statement to insert data.
      ```php
      if (mysqli_stmt_execute($stmt))
      ```
5. `header()`
    - Redirects the user to the `display.php` page.
      ```php
      header('location:display.php');
      ```
6. `mysqli_stmt_close()`
    - Closes the prepared statement.
      ```php
      mysqli_stmt_close($stmt);
      ```
7. `mysqli_close()`
    - Closes the database connection.
      ```php
      mysqli_close($conn);
      ```
