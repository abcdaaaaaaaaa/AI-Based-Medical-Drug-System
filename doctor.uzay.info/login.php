<?php
session_start();
require 'db.php'; // db.php dosyanızda PDO ile veritabanı bağlantısını kurduğunuzu varsayıyorum

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $TCKNO = $_POST['TCKNO'];

    try {
        // PDO kullanarak veritabanından kullanıcı bilgilerini alma
        $stmt = $conn->prepare("SELECT user_id, name, surname, password FROM users WHERE name = :name AND surname = :surname");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':surname', $surname);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($TCKNO, $user['password'])) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['surname'] = $user['surname'];
            header('Location: index.php');
            exit();
        } else {
            echo "TCKNO veya kullanıcı bilgileri yanlış.";
        }
    } catch (PDOException $e) {
        echo "Bir hata oluştu: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş Yap</title>
    <link rel="shortcut icon" href="bluespace.png">
    <link rel="stylesheet" href="loginstyle.css">
</head>
<body>
    <div class="form-container">
        <h2>Giriş Yap</h2>
        <form method="POST" action="">
            <label for="TCKNO">TC Kimlik Numarası:</label>
            <input type="text" id="TCKNO" name="TCKNO" required><br>
            <label for="name">Ad:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="surname">Soyad:</label>
            <input type="text" id="surname" name="surname" required><br>
            <button type="submit">Giriş Yap</button>
        </form>
        <p>Hesabınız yok mu? <a href="/register">Kayıt Ol</a></p>
    </div>
</body>
</html>
