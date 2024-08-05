<?php
session_start();
require 'dbnormal.php';

$conn->set_charset("utf8mb4");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $response = array("status" => "success", "message" => "");

    try {
        $user_id = (int) $_POST['user_id'];
        $medicine = $conn->real_escape_string($_POST['medicine']);
        $name = $conn->real_escape_string($_POST['name']);
        $surname = $conn->real_escape_string($_POST['surname']);
        $age = $conn->real_escape_string($_POST['age']);
        $weight = (double) $_POST['weight'];
        $dose = (double) $_POST['dose'];
        $dailyAmount = $conn->real_escape_string($_POST['dailyAmount']);
        $discomfort = $conn->real_escape_string($_POST['discomfort']);
        $subdiscomfort = $conn->real_escape_string($_POST['subdiscomfort']);
        $guidance = $conn->real_escape_string($_POST['guidance']);

        $stmt = $conn->prepare("INSERT INTO Ills (user_id, medicine, name, surname, age, weight, dose, daily_amount, discomfort, sub_discomfort, guidance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssddssss", $user_id, $medicine, $name, $surname, $age, $weight, $dose, $dailyAmount, $discomfort, $subdiscomfort, $guidance);

        $stmt->execute();
        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $response["status"] = "error";
        $response["message"] = "Bir hata oluştu: " . $e->getMessage();
    }

    echo json_encode($response);
}
?>
