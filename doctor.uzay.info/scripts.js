var questionText = "Rahatsızlik Belirtiniz Nedir?";
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

let discomfort, subdiscomfort, guidance, medicinename, StomachIntensity, fire, res, PainIntensity, doseAmount;
let urgent = 0;


function selectOption(optionNumber, optionText) {
    clearTimeout(changeTimer); // Stop the change timer

    var option = event.target;
    mainOptionSelected = optionNumber;

    if (option !== lastSelectedOption) {
        if (lastSelectedOption !== null) {
            lastSelectedOption.classList.remove("selected");
        }
        option.classList.add("selected");
        selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText;
        discomfort = optionText;
        selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
        lastSelectedOption = option;

        changeTimer = setTimeout(function() {
            updateOptions(optionNumber);
            askNextQuestion(optionNumber);
        }, 1000); // 1 second delay
    } else {
        option.classList.remove("selected");
        selectedOptionText.innerHTML = "Seçilen Rahatsizlik Belirtisi:";
        lastSelectedOption = null;
    }
}

function selectSubOption(mainOption, subOption, optionText) {
    if (mainOption === 1) {
        askNextQuestion(5);
        mainOptionSelected = mainOption;
        PainIntensity = subOption;
        updateOptionsForPain();
        return;
    } else if (mainOption === 3) {  
        mainOptionSelected = mainOption;
        updateOptionsForFire();   
    } else { 
        switch (mainOption) {
            case 2:
                if (subOption === 1 || subOption === 4) {
                    guidance = "Gaviscon almaniz onerilir. Belirtiniz 5 gunden uzun surerse Uzmana gidiniz.";
					StomachIntensity = 1;
                } else if (subOption === 2 || subOption === 3) {
                    guidance = "Gaviscon alin. Uzmana gidiniz.";
					StomachIntensity = 2;
                } else if (subOption === 5) {
                    guidance = "Gaviscon almaniz onerilir. Belirtiniz 5 gunden uzun surerse Uzmana gidiniz.";
					StomachIntensity = 0;
                }
                showDoseForm();
                break;
            case 4:
                if (subOption >= 1 && subOption <= 3) guidance = "Zyrtec almaniz onerilir. Belirtiniz 5 gunden uzun surerse ve yuksek alerjik reaksiyonlarinda Uzmana gidiniz.";
                else if (subOption === 4) guidance = "Zyrtec alin ve Acile gidiniz.";
                showDoseForm();
                break;
            default:
                break;
        }
        applySelectionStyle(event.target);
        subdiscomfort = optionText;
        selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
        selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
    }
}

        function submitfire() {
            const inputElement = document.getElementById('fireInput');
            fire = inputElement.value;
            if (fire >= 36.1) {
                document.getElementById('inputContainer').style.display = 'none';
            } else if (fire && fire < 36.1) {
                alert('Lütfen geçerli bir değer giriniz.');
            } else {
                alert('Lütfen bir değer giriniz.');
            }
        }

function updateOptions(optionNumber) {
    var newOptions = [];
    switch (optionNumber) {
        case 1:
            newOptions = ["Bas Agrisi", "Dis Agrisi", "Karin Agrisi", "Kas Agrisi"];
            break;
        case 2:
            newOptions = ["Hazimsizlik", "Kusma", "Ishal", "Mide Agrisi", "Hafif Bir Rahatsizlik"];
            break;
        case 3:
            document.getElementById('inputContainerWrapper').style.display = 'flex';
            document.getElementById('fireInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                submitfire();
                askNextQuestion(6);
                updateOptionsForFire(); 
            }
        });
        
        document.getElementById('submitButton').addEventListener('click', function() {
            submitfire();
            askNextQuestion(6);
            updateOptionsForFire(); 
        });
        
        // Reset last selected option for the new set of options
        lastSelectedOption = null;
            break;
        case 4:
            newOptions = ["Kaşınti", "Sulu Gozler", "Hapsirma", "Oksurme ve Solunum Problemi"];
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

    // Reset last selected option for the new set of options
    lastSelectedOption = null;
}

function updateOptionsForPain() {
    var painOptions = ["Keskin", "Devamli", "Kunt/Donuk", "Aralikli"];
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

    // Reset last selected option for the new set of options
    lastSelectedOption = null;
}

function showGuidanceForPain(subOption, optionText) {
    if (subOption === 1 || subOption === 2) {
        guidance = "Ibuprofen alin. Uzmana gidiniz.";
        PainIntensity = 4;
    } else if (subOption === 3 || subOption === 4) {
        guidance = "Ibuprofen almaniz onerilir. Agriniz 5 gunden uzun surerse Uzmana gidiniz.";
    }
    
    PainIntensity = 5 - subOption;
    showDoseForm();
    
	optionText +=  res;
    subdiscomfort = optionText;
    applySelectionStyle(event.target);
    selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
}

function updateOptionsForFire() {
    var fireOptions = ["Titreme", "Kilo Kaybi", "Vucut Agrisi", "Uykuya Meyil", "Hafif Bir Rahatsizlik"];
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

    // Reset last selected option for the new set of options
    lastSelectedOption = null;
}

function showGuidanceForFire(subOption, optionText) {
    urgent = 0;      
    if (fire > 39 || subOption === 4) { 
        guidance = "Hemen Acil Servise gidiniz.";
        urgent = 1;      
    } else if (subOption === 1 || subOption === 3) {
        guidance = "Paracetemol alin. Ates Takibi baslatin. Ilacla dusmezse veya ilacla dusup 2 gunden uzun surerse Uzmana gidiniz.";
    } else if (subOption === 2) {
        guidance = "Paracetemol alin Hemen Uzmana gidiniz.";
    } else if (subOption === 5) {
        guidance = "Paracetemol alin. Rahatsizliginiz 2 gunden uzun surerse Uzmana gidiniz.";
        urgent = -1;
    }
    showDoseForm();
	optionText = fire + "°C " + optionText;
    subdiscomfort = optionText;
    applySelectionStyle(event.target);
    selectedOptionText.innerHTML = "Seçilmiş Rahatsızlık Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
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
            nextQuestionText = "Ağrıyı nasil tarif edersiniz?";
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
    var age = parseInt(document.getElementById("age").value) + parseFloat(document.getElementById("mounth").value).toFixed(4) / 12;
    var weight = parseFloat(document.getElementById("weight").value).toFixed(2);
    var doseFrequency; // times per day
    
    doseResult.innerHTML = "Mevcut Hasta Bilgisi: " + parseInt(document.getElementById("age").value) + " yaş ";
    doseResult.innerHTML += parseInt(document.getElementById("mounth").value) + " ay ";
    doseResult.innerHTML += parseFloat(document.getElementById("weight").value).toFixed(2) + " kilo.<br>";

	if (mainOptionSelected === 1) {
	   medicinename = "Ibuprofen";
	   if (age < 0.25) {
         doseResult.innerHTML += "Yaşınız 3 aydan küçük. Ibuprofen için Uzmanınıza danışın.";
	     medicinename = "NotApproved";
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
         doseResult.innerHTML += "Yaşınız 1 yastan küçük. Gaviscon ve Gaviscon Infant'i kullanmaniz onerilmez.";
	   } else if (age < 3) {
	     medicinename = "Gaviscon Infant ml";
	     doseFrequency = "max6";
	     
         doseResult.innerHTML += "Yaşınız 3 yaştan kücük. Bu ilaci doktor gözetiminde alin. Gaviscon Infant'i kullanmanız önerilir.<br><br>";
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
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
          doseAmount = 5 * (age - 2) / 8 + 2.5;	
		  if (StomachIntensity === 0) doseAmount = 2.5;
          doseResult.innerHTML += "Yaşınız 6 yastan küçük. Bu ilaci doktor gözetiminde alin.<br>";
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";		 
       } else if (age <= 18) { // exceptional
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
		  doseAmount = 5 * age / 6;
		  if (StomachIntensity === 0 && age < 12) doseAmount = 5;
          else if (StomachIntensity === 0) doseAmount = 10;
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";
	   } else {
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
		  if (StomachIntensity === 0) doseAmount = 10;
		  else if (StomachIntensity === 1) doseAmount = 15;
		  else if (StomachIntensity === 2) doseAmount = 20;
          doseResult.innerHTML += "Günlük Gaviscon Dozu: " + doseAmount.toFixed(4) + " ml, Günde 4 kez alınmalıdır.";
	   }
	} else if (mainOptionSelected === 3) {
       medicinename = "Paracetemol mg";
	   if (urgent === 1) medicinename = "Paracetemol mg EmergencyRoom";
	   if (age < 0.0833) {
         doseResult.innerHTML += "Yaşınız 1 aydan küçük. Paracetemol için Uzmanınıza danışın.";	
	     medicinename = "NotApproved";
       } else if (age < 18) {
            if (weight < 5) {
                doseResult.innerHTML += "Kilonuz cok dusuk. Paracetemol için Uzmanınıza danışın.";
	            medicinename = "NotApproved";
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
        if (urgent === -1 && fire <= 37.2 && doseAmount > 500) doseAmount = 500;
        if (urgent === 1) doseResult.innerHTML += "Acil Alınacak Paracetemol Dozu: " + doseAmount.toFixed(4) + "mg";  
        if (urgent === 0 || urgent === -1) doseResult.innerHTML += "Günlük Paracetemol Dozu: " + doseAmount.toFixed(4) + " mg, Günde " + doseFrequency + " kez alınmalıdır.";
        }
    } else if (mainOptionSelected === 4) {
        medicinename = "Zyrtec mg";
        doseFrequency = 1;
        if (age < 2) {
          doseResult.innerHTML += "2 yaşın altindaki cocuklar için Zyrtec onerilmez. Lütfen Uzmanınıza danışınız.";
	      medicinename = "NotRecommended";
          doseFrequency = 0;
        } else if (age >= 2 && age < 6) doseAmount = 2.5 + (age - 2) * 0.625;
        else if (age >= 6 && age < 12) doseAmount = 5 + (age - 6) * 0.833;
        else if (age >= 12) doseAmount = 10;
        
        if (age >= 2) doseResult.innerHTML += "Günlük Zyrtec Dozu: " + doseAmount.toFixed(4) + " mg, Günde 1 kez alınmalıdır.";
    }
    
var xhr = new XMLHttpRequest();
xhr.open("POST", "save_dose.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("user_id=" + user_id + "&medicine=" + medicinename + "&name=" + name + "&surname=" + surname + "&age=" + age.toFixed(4) + "&weight=" + weight + "&dose=" + doseAmount.toFixed(4) + "&dailyAmount=" + doseFrequency + "&discomfort=" + discomfort + "&subdiscomfort=" + subdiscomfort + "&guidance=" + guidance);

document.getElementById('doseForm').style.display = 'none';
}

setTimeout(typeQuestion, 1500);
