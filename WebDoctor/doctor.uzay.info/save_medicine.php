<?php
session_start();
require 'dbnormal.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    header('Content-Type: application/json');
    $response = array("status" => "success", "message" => "");

    $user_id = (int) $_POST['user_id'];
    $medicine = $_POST['medicine'];
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $age = $_POST['age'];
    $weight = (double) $_POST['weight'];
    $dose = $_POST['dose'];
    $dailyAmount = $_POST['dailyAmount'];
    $discomfort = $_POST['discomfort'];
    $subdiscomfort = $_POST['subdiscomfort'];
    $guidance = $_POST['guidance'];

    $_SESSION['user_id'] = $user_id;
    $_SESSION['medicine'] = $medicine;
    $_SESSION['name'] = $name;
    $_SESSION['surname'] = $surname;
    $_SESSION['age'] = $age;
    $_SESSION['weight'] = $weight;
    $_SESSION['dose'] = $dose;
    $_SESSION['dailyAmount'] = $dailyAmount;
    $_SESSION['discomfort'] = $discomfort;
    $_SESSION['subdiscomfort'] = $subdiscomfort;
    $_SESSION['guidance'] = $guidance;

    echo json_encode($response);
    exit;
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İlaç Gerekçesi Gönder</title>
    <link rel="stylesheet" href="savestyle.css">
    <link rel="shortcut icon" href="../images/doctor.ico">
</head>
<body>
    <div class="header">
        <?php if (isset($_SESSION['user_id'])): ?>
            <a href="/logout" class="button logout">Çıkış</a>
            <a href="/" class="button restart">Yeniden Başlat</a>
        <?php else: ?>
            <a href="/login" class="button logout">Giriş</a>
        <?php endif; ?>
    </div>

    <div class="main-container">
        <div class="info-container">
            <h2>Kullanıcı Bilgileri</h2>
            <table id="userInfoTable">
                <tr>
                    <th>Alan</th>
                    <th>Değer</th>
                </tr>
                <tr>
                    <td>User ID</td>
                    <td id="user_id"></td>
                </tr>
                <tr>
                    <td>İlaç</td>
                    <td id="medicine"></td>
                </tr>
                <tr>
                    <td>Ad</td>
                    <td id="name"></td>
                </tr>
                <tr>
                    <td>Soyad</td>
                    <td id="surname"></td>
                </tr>
                <tr>
                    <td>Yaş</td>
                    <td id="age"></td>
                </tr>
                <tr>
                    <td>Ağırlık</td>
                    <td id="weight"></td>
                </tr>
                <tr>
                    <td>Doz</td>
                    <td id="dose"></td>
                </tr>
                <tr>
                    <td>Günlük Miktar</td>
                    <td id="dailyAmount"></td>
                </tr>
                <tr>
                    <td>Rahatsızlık</td>
                    <td id="discomfort"></td>
                </tr>
                <tr>
                    <td>Alt Rahatsızlık</td>
                    <td id="subdiscomfort"></td>
                </tr>
                <tr>
                    <td>Rehberlik</td>
                    <td id="guidance"></td>
                </tr>
            </table>
        </div>

        <div class="container" id="resultContainer">
            <p>Sonuçlar Medikal İlaç Dolabına iletilsin mi?</p>
            <div class="yes-no-buttons">
                <button class="yes-btn" onclick="sendYes()">Evet</button>
                <button class="no-btn" onclick="sendNo()">Hayır</button>
            </div>
        </div>

        <div class="container hidden" id="detailedRejectionQuestionContainer">
            <p>Detaylı Red Gerekçesini doldurmak ister misiniz?</p>
            <div class="yes-no-buttons">
                <button class="yes-btn" onclick="detailedRejectionYes()">Evet</button>
                <button class="no-btn" onclick="detailedRejectionNo()">Hayır</button>
            </div>
        </div>

        <div class="container hidden" id="detailedRejectionReasonContainer">
            <textarea id="detailedRejectionText" placeholder="Detaylı Red Gerekçesini yazın"></textarea>
            <button onclick="sendDetailedRejectionReason()">Detaylı Red Gerekçesini Gönder</button>
        </div>

        <div class="container hidden" id="rejectionReasonContainer">
            <div class="options" id="rejectionOptions">
                <label><input type="checkbox" name="rejectionReason" value="Bu ilaç hastada halen kullanıma yeterli olacak kadar bulunuyor."> Bu ilaç hastada halen kullanıma yeterli olacak kadar bulunuyor.</label>
                <label><input type="checkbox" name="rejectionReason" value="İstenilen ilaç eczanede bulunamadı."> İstenilen ilaç eczanede bulunamadı.</label>
                <label><input type="checkbox" name="rejectionReason" value="Sanal Doktorun önerisine göre hasta bu ilacı doktor kontrolünde tüketmesi gerekiyor."> Sanal Doktorun önerisine göre hasta bu ilacı doktor kontrolünde tüketmesi gerekiyor.</label>
            </div>
            <button onclick="sendRejectionReason()">Red Gerekçesini Gönder</button>
        </div>

        <div class="container hidden" id="rejectionReasonContainerFilled">
            <div class="options" id="rejectionOptionsFilled">
                <label><input type="checkbox" name="rejectionReasonFilled" value="Bu ilaç hastada halen kullanıma yeterli olacak kadar bulunuyor."> Bu ilaç hastada halen kullanıma yeterli olacak kadar bulunuyor.</label>
                <label><input type="checkbox" name="rejectionReasonFilled" value="İstenilen ilaç eczanede bulunamadı."> İstenilen ilaç eczanede bulunamadı.</label>
                <label><input type="checkbox" name="rejectionReasonFilled" value="Sanal Doktorun önerisine göre hasta bu ilacı doktor kontrolünde tüketmesi gerekiyor."> Sanal Doktorun önerisine göre hasta bu ilacı doktor kontrolünde tüketmesi gerekiyor.</label>
                <label><input type="checkbox" name="rejectionReasonFilled" value="Sanal Doktor tarafından önerilen ilaç, Detaylı Red Gerekçesinde belirttiğimiz nedenlerden dolayı kullanıma uygun görülmedi." checked disabled> Sanal Doktor tarafından önerilen ilaç, Detaylı Red Gerekçesinde belirttiğimiz nedenlerden dolayı kullanıma uygun görülmedi.</label>
            </div>
            <button onclick="sendRejectionReasonFilled()">Red Gerekçesini Gönder</button>
        </div>

        <div class="container hidden" id="approvalReasonContainer">
            <textarea id="approvalText" placeholder="Kabul Gerekçesini düzenleyin">Sonuçlar Sanal Doktor tarafından uygun görüldü.</textarea>
            <button onclick="sendApprovalReason()">Kabul Gerekçesini Gönder</button>
        </div>
    </div>

    <script>
        document.getElementById("user_id").textContent = <?php echo json_encode($_SESSION['user_id']); ?>;
        document.getElementById("medicine").textContent = <?php echo json_encode($_SESSION['medicine']); ?>;
        document.getElementById("name").textContent = <?php echo json_encode($_SESSION['name']); ?>;
        document.getElementById("surname").textContent = <?php echo json_encode($_SESSION['surname']); ?>;
        document.getElementById("age").textContent = <?php echo json_encode($_SESSION['age']); ?>;
        document.getElementById("weight").textContent = <?php echo json_encode($_SESSION['weight']); ?>;
        document.getElementById("dose").textContent = <?php echo json_encode($_SESSION['dose']); ?>;
        document.getElementById("dailyAmount").textContent = <?php echo json_encode($_SESSION['dailyAmount']); ?>;
        document.getElementById("discomfort").textContent = <?php echo json_encode($_SESSION['discomfort']); ?>;
        document.getElementById("subdiscomfort").textContent = <?php echo json_encode($_SESSION['subdiscomfort']); ?>;
        document.getElementById("guidance").textContent = <?php echo json_encode($_SESSION['guidance']); ?>; 
    </script>
    <script src="savescript.js"></script>
</body>
</html>


