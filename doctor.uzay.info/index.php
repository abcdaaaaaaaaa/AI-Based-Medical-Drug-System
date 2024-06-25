<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sanal Doktor</title>
    <link rel="shortcut icon" href="bluespace.png">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="header">
    <?php if (isset($_SESSION['user_id'])): ?>
        <a href="/logout" class="logout">Çıkış</a>
    <?php else: ?>
        <a href="/login" class="logout">Giriş</a>
    <?php endif; ?>
</div>
<div class="container">
    <div id="question" class="question"></div>
    <div class="doctorImage">
        <img id="doctorImage" src="doctor.png" alt="Doctor Image">
    </div>
    <div id="optionsContainer">
        <div class="option" onclick="selectOption(1, 'Agri Sorunlari')">Ağrı Sorunları</div>
        <div class="option" onclick="selectOption(2, 'Bulanti ve Mide Sorunlari')">Bulantı ve Mide Sorunları</div>
        <div class="option" onclick="selectOption(3, 'Yuksek Ates ve Yorgunluk')">Yüksek Ateş ve Yorgunluk</div>
        <div class="option" onclick="selectOption(4, 'Goz ve Burun Alerjileri, Oksuruk, Burun Tikanikligi')">Göz ve Burun Alerjileri, Öksürük, Burun Tıkanıklıgı</div>
    </div>
    <p id="selectedOptionText">Secilen Rahatsizlik Belirtisi:</p>
    <div id="doseForm" class="dose-form hidden">
        <label for="age">Yaş (1'den küçükse rasyonel sayı girin):</label>
        <input type="number" id="age" name="age">
        <label for="weight">Kilo (10'dan küçükse rasyonel sayı girin):</label>
        <input type="number" id="weight" name="weight">
        <button onclick="calculateDose()">Doz Hesapla</button>
        <p id="doseResult" class="dose-result"></p>
    </div>
</div>
<script>
let user_id = <?php echo json_encode($_SESSION['user_id']); ?>;
let name = <?php echo json_encode($_SESSION['name']); ?>;
let surname = <?php echo json_encode($_SESSION['surname']); ?>;
</script>
<script src="scripts.js"></script>
</body>
</html>
