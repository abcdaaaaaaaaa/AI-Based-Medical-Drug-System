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
        <a href="/logout" class="button logout">Çıkış</a>
        <a href="/index.php" class="button restart">Yeniden Başlat</a>
    <?php else: ?>
        <a href="/login" class="button logout">Giriş</a>
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
    <p id="selectedOptionText">Seçilen Rahatsızlık Belirtisi:</p>
    <div id="doseForm" class="dose-form hidden">
        <label for="age">Yaş:</label>
        <input type="number" id="age" name="age" placeholder="Bitirdiğiniz yaşı buraya yazabilirsiniz.">
        <label for="mounth">Ay:</label>
        <input type="number" id="mounth" name="mounth" placeholder="0-11 arasında bşr ay tanımlayınız.">
        <label for="weight">Kilo:</label>
        <input type="number" id="weight" name="weight" placeholder="kg < 10 ise 5.3 gibi kesirli sayı giriniz.">
        <button onclick="calculateDose()">Dozu Hesapla</button>
    </div>
        <p id="doseResult" class="dose-result"></p>
    <div id="inputContainerWrapper">
        <div id="inputContainer">
            <input type="fire" id="fireInput" placeholder="Örnek: Ateşim 37.2°C" />
            <button id="submitButton">Gönder</button>
        </div>
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
