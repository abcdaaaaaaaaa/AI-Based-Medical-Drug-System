var questionText = "Rahatsızlık Belirtiniz Nedir?";
var questionElement = document.getElementById("question");
var optionsContainer = document.getElementById("optionsContainer");
var selectedOptionText = document.getElementById("selectedOptionText");
var doseForm = document.getElementById("doseForm");
var doseResult = document.getElementById("doseResult");
var index = 0;
var typingSpeed = 50;
var changeTimer;
var lastSelectedOption = null;
var mainOptionSelected = null;

function typeQuestion() {
    if (index < questionText.length) {
        questionElement.innerHTML += questionText.charAt(index);
        index++;
        setTimeout(typeQuestion, typingSpeed);
    }
}

let discomfort, subDiscomfort, guidance, medicineName, StomachIntensity, fire, res, PainIntensity, doseAmount;
let urgent = 0;


function selectOption(optionNumber, optionText) {
    clearTimeout(changeTimer);

    var option = event.target;
    mainOptionSelected = optionNumber;

    if (option !== lastSelectedOption) {
        if (lastSelectedOption !== null) {
            lastSelectedOption.classList.remove("selected");
        }
        option.classList.add("selected");
        selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText;
        discomfort = optionText;
        selectedOptionText.style.opacity = 1;
        lastSelectedOption = option;

        changeTimer = setTimeout(function() {
            updateOptions(optionNumber);
            askNextQuestion(optionNumber);
        }, 1000);
    } else {
        option.classList.remove("selected");
        selectedOptionText.innerHTML = "Seçilen Rahatsızlık Belirtisi:";
        lastSelectedOption = null;
    }
}

function selectSubOption(mainOption, subOption, optionText) {
    switch (mainOption) {
        case 1:
            askNextQuestion(5);
            updateOptionsForPain();
            return;
        case 2:
            if (subOption === 1 || subOption === 4) {
                guidance = "Gaviscon almanız önerilir. Belirtileriniz 5 günden daha uzun sürerse uzmana gidiniz.";
				StomachIntensity = 1;
            } else if (subOption === 2 || subOption === 3) {
                guidance = "Gaviscon alın. Uzmana gidiniz.";
				StomachIntensity = 2;
            } else if (subOption === 5) {
                guidance = "Gaviscon almanız önerilir. Belirtileriniz 5 günden daha uzun sürerse uzmana gidiniz.";
				StomachIntensity = 0;
            }
            showDoseForm();
            break;
        case 3:
            updateOptionsForFire();   
            break;
        case 4:
            if (subOption >= 1 && subOption <= 3) guidance = "Zyrtec almanız önerilir. Belirtileriniz 5 günden daha uzun sürerse ve yüksek alerjik reaksiyon durumu olursa uzmana gidiniz.";
            else if (subOption === 4) guidance = "Zyrtec alın ve Acile gidiniz.";
            showDoseForm();
            break;
        default:
            break;
    }
    applySelectionStyle(event.target);
    subDiscomfort = optionText;
    selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1;
}

let sumbit = 0;

function nextfire() { 
    askNextQuestion(6);
    updateOptionsForFire();     
}

function submitfire() {
    const inputElement = document.getElementById('fireInput');
    fire = inputElement.value;
    if (fire >= 36.1) {
        document.getElementById('inputContainer').style.display = 'none';
        nextfire();
    } else if (fire && fire < 36.1) alert('Lütfen geçerli bir değer giriniz.');
    else alert('Lütfen bir değer giriniz.');
}

function updateOptions(optionNumber) {
    var newOptions = [];
    switch (optionNumber) {
        case 1:
            newOptions = ["Baş Ağrısı", "Diş Ağrısı", "Karın Ağrısı", "Kas Ağrısı"];
            break;
        case 2:
            newOptions = ["Hazımsızlık", "Kusma", "İshal", "Mide Ağrısı", "Hafif Bir Rahatsızlık"];
            break;
        case 3:
            document.getElementById('inputContainerWrapper').style.display = 'flex';
            document.getElementById('fireInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') { submitfire(); } });
            document.getElementById('submitButton').addEventListener('click', function() { submitfire(); });
            lastSelectedOption = null;
            break;
        case 4:
            newOptions = ["Kaşıntı", "Sulu Gözler", "Hapşırma", "Öksürme ve Solunum Problemi"];
            break;
        default:
            break;
    }

    optionsContainer.innerHTML = "";
    newOptions.forEach(function(optionText, index) {
        var newOption = document.createElement("div");
        newOption.classList.add("option");
        newOption.textContent = optionText;
        newOption.onclick = function() {
            res = " " + optionText;
            selectSubOption(optionNumber, index + 1, optionText);
        };
        optionsContainer.appendChild(newOption);
    });

    lastSelectedOption = null;
}

function updateOptionsForPain() {
    var painOptions = ["Keskin", "Devamlı", "Künt/Donuk", "Aralıklı"];
    optionsContainer.innerHTML = "";
    painOptions.forEach(function(optionText, index) {
        var newOption = document.createElement("div");
        newOption.classList.add("option");
        newOption.textContent = optionText;
        newOption.onclick = function() {
            showGuidanceForPain(index + 1, optionText);
        };
        optionsContainer.appendChild(newOption);
    });

    lastSelectedOption = null;
}

function showGuidanceForPain(subOption, optionText) {
    if (subOption === 1 || subOption === 2) {
        guidance = "Ibuprofen alın. Uzmana gidiniz.";
    } else if (subOption === 3 || subOption === 4) {
        guidance = "Ibuprofen almanız önerilir. Ağrınız 5 günden daha uzun sürerse uzmana gidiniz.";
    }
    
    PainIntensity = 5 - subOption;
    showDoseForm();
    
	optionText +=  res;
    subDiscomfort = optionText;
    applySelectionStyle(event.target);
    selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1;
}

function updateOptionsForFire() {
    var fireOptions = ["Titreme", "Kilo Kaybı", "Vücut Ağrısı", "Uykuya Meyil", "Hafif Bir Rahatsızlık"];
    optionsContainer.innerHTML = "";
    fireOptions.forEach(function(optionText, index) {
        var newOption = document.createElement("div");
        newOption.classList.add("option");
        newOption.textContent = optionText;
        newOption.onclick = function() {
            showGuidanceForFire(index + 1, optionText);
        };
        optionsContainer.appendChild(newOption);
    });

    lastSelectedOption = null;
}

function showGuidanceForFire(subOption, optionText) {
    urgent = 0;      
    if (fire > 39 || subOption === 4) { 
        guidance = "Hemen Acil Servise gidiniz.";
        urgent = 1;      
    } else if (subOption === 1 || subOption === 3) {
        guidance = "Paracetemol alın. Ateş Takibi Başlatın. İlaçla düşmezse veya ilaçla düşüp 2 günden daha uzun sürerse uzmana gidiniz.";
    } else if (subOption === 2) {
        guidance = "Paracetemol alın. Hemen uzmana gidiniz.";
    } else if (subOption === 5) {
        if (fire <= 37.2) {
		  guidance = "Paracetemol alın. Rahatsızlığınız 2 günden daha uzun sürerse uzmana gidiniz.";
          urgent = -1;
		}
        else guidance = "Paracetemol alın. Ateş Takibi Başlatın. İlaçla düşmezse veya ilaçla düşüp 2 günden daha uzun sürerse uzmana gidiniz.";
    }
    showDoseForm();
	optionText = fire + "°C " + optionText;
    subDiscomfort = optionText;
    applySelectionStyle(event.target);
    selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1;
}

function askNextQuestion(optionNumber) {
    var nextQuestionText = "";
    switch (optionNumber) {
        case 1:
            nextQuestionText = "Nereniz Ağrıyor?";
            break;
        case 2:
            nextQuestionText = "Bu belirtilerden herhangi birini yaşadınız mı?";
            break;
        case 3:
            nextQuestionText = "Ateşiniz kaç derecedir?";
            break;
        case 4:
            nextQuestionText = "Alerjiniz veya solunum probleminiz var mı?";
            break;
		case 5:
            nextQuestionText = "Ağrıyı nasıl tarif edersiniz?";
            break;
        case 6:
            nextQuestionText = "Başlıca belirtileriniz nelerdir?";
        default:
            break;
    }
    index = 0;
    questionText = nextQuestionText;
    questionElement.innerHTML = '';
    setTimeout(typeQuestion, 1500);
}

function applySelectionStyle(selectedOption) {
    if (lastSelectedOption !== null) {
        lastSelectedOption.classList.remove("selected");
    }
    selectedOption.classList.add("selected");
    lastSelectedOption = selectedOption;
}

function showDoseForm() { 
    doseForm.classList.remove("hidden"); 
}

function calculateDose() {
    var weight = parseFloat(document.getElementById("weight").value).toFixed(2);
    var doseFrequency;

    doseResult.innerHTML += "Mevcut Hasta Bilgisi: " + customAge + " " + weight + " kilo.<br><br>";

	if (mainOptionSelected === 1) {
	   medicineName = "Ibuprofen";
	   if (age < 0.25) {
         doseResult.innerHTML += "Yaşınız 3 aydan küçük. Ibuprofen için Uzmanınıza danışın.";
	     medicineName = "NotApproved";
       } else if (age < 18) {
          doseAmount = weight * 6;
          if (doseAmount > 400) doseAmount = 400;     
		  if (PainIntensity === 1 || PainIntensity === 2) {doseFrequency = 3;}
		  else if (PainIntensity === 3 || PainIntensity === 4) {doseFrequency = 4;}
          doseResult.innerHTML += "Günlük Ibuprofen Dozu: " + doseAmount.toFixed(4) + " mg, Günde " + doseFrequency + " kez alınmalıdır.";
        } else {
		  if (PainIntensity === 1) {doseFrequency = 4; doseAmount = 200;}
		  else if (PainIntensity === 2) {doseFrequency = 6; doseAmount = 200;}
		  else if (PainIntensity === 3) {doseFrequency = 4; doseAmount = 400;}
		  else if (PainIntensity === 4) {doseFrequency = 6; doseAmount = 400;}
          doseResult.innerHTML += "Günlük Ibuprofen Dozu: " + doseAmount.toFixed(4) + " mg, Günde " + doseFrequency + " kez alınmalıdır.";
        }
    } else if (mainOptionSelected === 2) {
	   if (age < 1) {
         doseResult.innerHTML += "Yaşınız 1 yaştan küçük. Gaviscon ve Gaviscon Infant'i kullanmaniz önerilmez.";
	   } else if (age < 3) {
	     medicineName = "Gaviscon Infant ml";
	     doseFrequency = "max6";
	     
         doseResult.innerHTML += "Yaşınız 3 yaştan küçük. Bu ilaci doktor gözetiminde alın. Gaviscon Infant'i kullanmanız önerilir.<br><br>";
         doseResult.innerHTML += "Biberonla besleme:<br>";
		 doseResult.innerHTML += "Her poşeti 115 ml biberonla karıştırın. ";
         doseResult.innerHTML += "İyice çalkalayın ve bebeği normal şekilde besleyin. ";
         doseResult.innerHTML += "Beslenme bittikten sonra Gaviscon Infant'ı bir kaşık veya şişe kullanarak uygulayın.<br><br>";

         doseResult.innerHTML += "Emzirme:<br>";
         doseResult.innerHTML += "Her poşeti bir çay kaşığı kaynamış ancak soğutulmuş suyla karıştırın. ";
         doseResult.innerHTML += "Pürüzsüz bir macun oluşacaktır. 2 çay kaşığı kaynamış, sarmal su ekleyin ve karıştırın. "; 
         doseResult.innerHTML += "Mamanın yarısında, uygulamak için bir kaşık veya biberon kullanın.<br><br>";
	     
         if (weight < 4.5){
           doseAmount = 115;
           doseResult.innerHTML += "Günlük Gaviscon Infant Poşet Dozu: 1 Poşet, Günde 6 kereden fazla almayın.";
         } else {
           doseAmount = 230;
           doseResult.innerHTML += "Günlük Gaviscon Infant Poşet Dozu: 2 Poşet, Günde 6 kereden fazla almayın.";
         }
         
	   } else if (age < 6) {
	      medicineName = "Gaviscon ml";
	      doseFrequency = 4;
          doseAmount = 5 * (age - 2) / 8 + 2.5;	
		  if (StomachIntensity === 0) doseAmount = 2.5;
          doseResult.innerHTML += "Yaşınız 6 yaştan küçük. Bu ilaci doktor gözetiminde alın.<br>";
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";		 
       } else if (age <= 18) { // exceptional
	      medicineName = "Gaviscon ml";
	      doseFrequency = 4;
		  doseAmount = 5 * age / 6;
		  if (StomachIntensity === 0 && age < 12) doseAmount = 5;
          else if (StomachIntensity === 0) doseAmount = 10;
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";
	   } else {
	      medicineName = "Gaviscon ml";
	      doseFrequency = 4;
		  if (StomachIntensity === 0) doseAmount = 10;
		  else if (StomachIntensity === 1) doseAmount = 15;
		  else if (StomachIntensity === 2) doseAmount = 20;
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";
	   }
	} else if (mainOptionSelected === 3) {
       medicineName = "Paracetemol mg";
	   if (urgent === 1) medicineName = "Paracetemol mg EmergencyRoom";
	   if (age < 0.0833) {
         doseResult.innerHTML += "Yaşınız 1 aydan küçük. Paracetemol için Uzmanınıza danışın.";	
	     medicineName = "NotApproved";
       } else if (age < 18) {
            if (weight < 5) {
                doseResult.innerHTML += "Kilonuz çok düşük. Paracetemol için Uzmanınıza danışın.";
	            medicineName = "NotApproved";
                return;
            } else {
                doseAmount = weight * 15;
	            doseFrequency = 4;
            }
        } else {
            if (weight < 40) {
// In the literature, this value is fixed as 500.
                doseAmount = 500;
                doseFrequency = 2;
            } else if (weight >= 40 && weight < 50) {
// The literature recommends 500-1000, but 1000 was chosen here because high fever along with body pain or chills are advanced conditions.
                if (fire > 37.2) doseAmount =  277.7778 * (fire - 37.2) + 500;
                else doseAmount = 500;
                doseFrequency = 3;
            } else {
// The literature recommends 500-1000, but 1000 was chosen here because high fever along with body pain or chills are advanced conditions.
                if (fire > 37.2) doseAmount =  277.7778 * (fire - 37.2) + 500;
                else doseAmount = 500;
                doseFrequency = 4;
            }
        }
        if (age >= 0.0833 && weight >= 5) {
        if (doseAmount > 1000) doseAmount = 1000;
        if (urgent === -1 && doseAmount > 500) doseAmount = 500;
        if (urgent === 1) doseResult.innerHTML += "Acil Alınacak Paracetemol Dozu: " + doseAmount.toFixed(4) + "mg";  
        if (urgent === 0 || urgent === -1) doseResult.innerHTML += "Günlük Paracetemol Dozu: " + doseAmount.toFixed(4) + " mg, Günde " + doseFrequency + " kez alınmalıdır.";
        }
    } else if (mainOptionSelected === 4) {
        medicineName = "Zyrtec mg";
        doseFrequency = 1;
        if (age < 2) {
          doseResult.innerHTML += "2 yaşın altindakı çocuklar için Zyrtec önerilmez. Lütfen ilaç için uzmanınıza danışınız.";
	      medicineName = "NotRecommended";
          doseFrequency = 0;
        } else if (age >= 2 && age < 6) doseAmount = 2.5 + (age - 2) * 0.625;
        else if (age >= 6 && age < 12) doseAmount = 5 + (age - 6) * 0.833;
        else if (age >= 12) doseAmount = 10;
        
        if (age >= 2) doseResult.innerHTML += "Günlük Zyrtec Dozu: " + doseAmount.toFixed(4) + " mg, Günde 1 kez alınmalıdır.";
    }
    
var xhr = new XMLHttpRequest();
xhr.open("POST", "save_dose.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.status == "error") {
            console.error(response.message);
        } else {
            console.log("Successful: " + response.message);
        }
    }
};

xhr.send("user_id=" + user_id + "&medicine=" + medicineName + "&name=" + name + "&surname=" + surname + "&age=" + customAge + "&weight=" + weight + "&dose=" + doseAmount.toFixed(4) + "&dailyAmount=" + doseFrequency + "&discomfort=" + discomfort + "&subdiscomfort=" + subDiscomfort + "&guidance=" + guidance);

document.getElementById('doseForm').style.display = 'none';
document.getElementById('optionsContainer').style.display = 'none';
document.getElementById('question').style.display = 'none';
}

setTimeout(typeQuestion, 1500);
