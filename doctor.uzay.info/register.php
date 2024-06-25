<?php
session_start();
require 'db.php'; // PDO ile veritabanı bağlantısını içerir

// Form gönderildiğinde
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $password = password_hash($_POST['TCKNO'], PASSWORD_DEFAULT);
    $information = $_POST['information'];
    $has_problem = !empty($information);

    // Kullanıcı ID'si belirleme
    if ($has_problem) {
        $stmt = $conn->query("SELECT COALESCE(MIN(user_id), 0) - 1 AS user_id FROM users WHERE user_id < 0");
    } else {
        $stmt = $conn->query("SELECT COALESCE(MAX(user_id), 0) + 1 AS user_id FROM users WHERE user_id > 0");
    }
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $user_id = $row['user_id'];

    // Kullanıcıyı ekleme
    $stmt = $conn->prepare("INSERT INTO users (user_id, name, surname, password, information) VALUES (:user_id, :name, :surname, :password, :information)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':surname', $surname);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':information', $information);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $user_id;
        $_SESSION['name'] = $name;
        $_SESSION['surname'] = $surname;
        header('Location: index.php');
        exit();
    } else {
        echo "Kayıt sırasında bir hata oluştu.";
    }
}
?>



<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kayıt Ol</title>
    <link rel="shortcut icon" href="bluespace.png">
    <link rel="stylesheet" href="loginstyle.css">
</head>
<body>
    <div class="form-container">
        <h2>Kayıt Ol</h2>
        <form method="POST" action="">
            <label for="name">Ad:</label>
            <input type="text" id="name" name="name" required><br>
            
            <label for="surname">Soyad:</label>
            <input type="text" id="surname" name="surname" required><br>
            
            <label for="TCKNO">TC Kimlik Numarası:</label>
            <input type="text" id="TCKNO" name="TCKNO" required><br>
            
            <label for="information">Özel bir ilaç kullanıyormusunuz veya ciddi sağlık probleminiz var mı? Kullanıyorsanız/Varsa yazınız (255 karaktere kadar).</label><br>
            <textarea id="information" name="information" maxlength="255"></textarea><br>
            
            <button type="submit">Kayıt Ol</button>
        </form>
    </div>
</body>
</html>
