<?php
$servername = "localhost";
$dbname = "uzayinfo_healthapp";
$username = "uzayinfo_healthapp";
$password = "yumak345";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
?> 