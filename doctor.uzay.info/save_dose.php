<?php
session_start();
require 'dbnormal.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Doz bilgilerini veritabanına kaydet
    $user_id = (int) $_POST['user_id'];
    $medicine = $conn->real_escape_string($_POST['medicine']);
    $name = $conn->real_escape_string($_POST['name']);
    $surname = $conn->real_escape_string($_POST['surname']);
    $age = (double) $_POST['age'];
    $weight = (double) $_POST['weight'];
    $dose = (double) $_POST['dose'];
    $dailyAmount = $conn->real_escape_string($_POST['dailyAmount']);
    $discomfort = $conn->real_escape_string($_POST['discomfort']);
    $guidance = $conn->real_escape_string($_POST['guidance']);

    // Hazırlanmış sorgu
    $stmt = $conn->prepare("INSERT INTO Ills (user_id, medicine, name, surname, age, weight, dose, daily_amount, discomfort, guidance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssdddsss", $user_id, $medicine, $name, $surname, $age, $weight, $dose, $dailyAmount, $discomfort, $guidance);

    $stmt->execute();
    $stmt->close();
}
?>
