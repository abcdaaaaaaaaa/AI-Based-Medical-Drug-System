var questionText = "Rahatsizlik Belirtiniz Nedir?";
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

let discomfort;
function selectOption(optionNumber, optionText) {
    clearTimeout(changeTimer); // Stop the change timer

    var option = event.target;
    mainOptionSelected = optionNumber;

    if (option !== lastSelectedOption) {
        if (lastSelectedOption !== null) {
            lastSelectedOption.classList.remove("selected");
        }
        option.classList.add("selected");
        selectedOptionText.innerHTML = "Secilmis Rahatsizlik Belirtisi: " + optionText;
        discomfort = optionText;
        selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
        lastSelectedOption = option;

        changeTimer = setTimeout(function() {
            updateOptions(optionNumber);
            askNextQuestion(optionNumber);
        }, 1000); // 1 second delay
    } else {
        option.classList.remove("selected");
        selectedOptionText.innerHTML = "Secilen Rahatsizlik Belirtisi:";
        lastSelectedOption = null;
    }
}

let guidance;
let medicinename;

let StomachIntensity;
function selectSubOption(mainOption, subOption, optionText) {
    if (mainOption === 1) {
        askNextQuestion(5);
        mainOptionSelected = mainOption;
        PainIntensity = subOption;
        updateOptionsForPain();
        return;
    } else {
        switch (mainOption) {
            case 2:
                if (subOption === 1 || subOption === 4) {
                    guidance = "Gaviscon almaniz onerilir. Belirtiniz 5 gunden uzun surerse Uzmana gidiniz.";
					StomachIntensity = 1;
                    showDoseForm();
                } else if (subOption === 2 || subOption === 3) {
                    guidance = "Gaviscon almaniz onerilir. Uzmana gidiniz.";
					StomachIntensity = 2;
                    showDoseForm();
                } else if (subOption === 5) {
                    guidance = "Gun icerisinde dinlenmeye ozen gostererek 4-5 porsiyon taze meyve tuketmeniz onerilir. Rahatsizliginiz 5 gunden uzun surerse Uzmana gidiniz.";
                    medicinename = "fruit";
                }
                break;
            case 3:
                if (subOption === 1 || subOption === 3) {
                    guidance = "Parasetemol alin. Ates Takibi baslatin. Ilacla dusmezse veya ilacla dusup 2 gunden uzun surerse Uzmana gidiniz.";
                    showDoseForm();
                } else if (subOption === 2) {
                    guidance = "Parasetemol alin Hemen Uzmana gidiniz.";
                    showDoseForm();
                } else if (subOption === 4) {
                    guidance = "Hemen Acil Servise gidiniz.";
                    medicinename = "EmergencyRoom";
                } else if (subOption === 5) {
                    guidance = "Gun icerisinde dinlenmeye ozen gostererek 4-5 porsiyon taze meyve tuketmeniz onerilir. Rahatsizliginiz 5 gunden uzun surerse Uzmana gidiniz.";
                    medicinename = "fruit";
                }
                break;
            case 4:
                if (subOption >= 1 && subOption <= 3) {
                    guidance = "Zyrtec almaniz onerilir. Belirtiniz 5 gunden uzun surerse ve yuksek alerjik reaksiyonlarinda Uzmana gidiniz.";
                    showDoseForm();
                } else if (subOption === 4) {
                    guidance = "Zyrtec alin ve Acile gidiniz.";
                    showDoseForm();
                }
                break;
            default:
                break;
        }
        applySelectionStyle(event.target);
        selectedOptionText.innerHTML = "Secilmis Rahatsizlik Belirtisi: " + optionText + "<br>" + guidance;
        selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
    }
}

let res;

function updateOptions(optionNumber) {
    var newOptions = [];
    switch (optionNumber) {
        case 1:
            newOptions = ["Bas Agrisi", "Dis Agrisi", "Karin Agrisi", "Kas Agrisi"];
            break;
        case 2:
            newOptions = ["Hazimsizlik", "Kusma", "Ishal", "Mide Agrisi", "Kucuk bir rahatsizligim var"];
            break;
        case 3:
            newOptions = ["Titreme", "Kilo Kaybi", "Vucut Agrisi", "Uykuya Meyil", "Kucuk bir rahatsizligim var"];
            break;
        case 4:
            newOptions = ["Kasinti", "Sulu Gozler", "Hapsirma", "Oksurme ve Solunum Problemi"];
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

let PainIntensity;
function showGuidanceForPain(subOption, optionText) {
    if (subOption === 1) {
        guidance = "Ibuprofen alin. Uzmana gidiniz.";
        PainIntensity = 4;
        showDoseForm();
    } else if (subOption === 2) {
        guidance = "Ibuprofen alin. Uzmana gidiniz.";
        PainIntensity = 3;
        showDoseForm();
    } else if (subOption === 3) {
        guidance = "Ibuprofen almaniz onerilir. Agriniz 5 gunden uzun surerse Uzmana gidiniz.";
        PainIntensity = 2;
        showDoseForm();
    } else if (subOption === 4) {
        guidance = "Ibuprofen almaniz onerilir. Agriniz 5 gunden uzun surerse Uzmana gidiniz.";
        PainIntensity = 1;
        showDoseForm();
    }
	
	optionText +=  res;
    applySelectionStyle(event.target);
    selectedOptionText.innerHTML = "Secilmis Rahatsizlik Belirtisi: " + optionText + "<br>" + guidance;
    selectedOptionText.style.opacity = 1; // Make selectedOptionText visible
}

function askNextQuestion(optionNumber) {
    var nextQuestionText = "";
    switch (optionNumber) {
        case 1:
            nextQuestionText = "Nereniz Agriyor?";
            break;
        case 2:
            nextQuestionText = "Bu belirtilerden herhangi birini yasadiniz mi?";
            break;
        case 3:
            nextQuestionText = "Baslica belirtileriniz nelerdir?";
            break;
        case 4:
            nextQuestionText = "Alerjiniz veya solunum probleminiz var mi?";
            break;
		case 5:
            nextQuestionText = "Agriyi nasil tarif edersiniz?";		
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

let doseAmount;

function calculateDose() {
    var age = parseFloat(document.getElementById("age").value).toFixed(4);
    var age = parseInt(document.getElementById("age").value) + (parseFloat(document.getElementById("mounth").value).toFixed(4) / 12);
    var weight = parseFloat(document.getElementById("weight").value).toFixed(4);
    var doseFrequency; // times per day

	if (mainOptionSelected === 1) {
	   medicinename = "Ibuprofen";
	   if (age < 0.25) {
         doseResult.innerHTML = "Yasiniz 3 aydan kucuk. Ilac icin Uzmaniniza danisin.";
	     medicinename = "NotApproved";
       } else if (age < 18) {
          doseAmount = weight * 6;
          if (doseAmount > 400) {doseAmount = 400;}     
		  if (PainIntensity === 1 || PainIntensity === 2) {doseFrequency = 3;}
		  else if (PainIntensity === 3 || PainIntensity === 4) {doseFrequency = 4;}
          doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde " + doseFrequency + " kez alinmalidir.";
        } else {
		  if (PainIntensity === 1) {doseFrequency = 4; doseAmount = 200;}
		  else if (PainIntensity === 2) {doseFrequency = 6; doseAmount = 200;}
		  else if (PainIntensity === 3) {doseFrequency = 4; doseAmount = 400;} 		
		  else if (PainIntensity === 4) {doseFrequency = 6; doseAmount = 400;} 		
          doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde " + doseFrequency + " kez alinmalidir.";
        }
    } else if (mainOptionSelected === 2) {
	   if (age < 1) {
         doseResult.innerHTML = "Yasiniz 1 yastan kucuk. Gaviscon ve Gaviscon Infant'i kullanmaniz onerilmez.";
	   } else if (age < 3) {
	     medicinename = "Gaviscon Infant ml";
	     doseFrequency = "max6";
	     
         doseResult.innerHTML = "Yasiniz 3 yastan kucuk. Bu ilaci doktor gozetiminde alin. Gaviscon Infant'i kullanmaniz onerilir.<br><br>";
         doseResult.innerHTML += "Biberonla besleme:<br>";
		 doseResult.innerHTML += "Her poseti 115 ml biberonla karistirin. ";
         doseResult.innerHTML += "Iyice calkalayin ve bebegi normal sekilde besleyin. ";
         doseResult.innerHTML += "Beslenme bittikten sonra Gaviscon Infant'i bir kasik veya sise kullanarak uygulayin.<br><br>";

         doseResult.innerHTML += "Emzirme:<br>";
         doseResult.innerHTML += "Her poseti bir cay kasigi kaynamis ancak sogutulmus suyla karistirin. ";
         doseResult.innerHTML += "Puruzsuz bir macun olusacaktir. 2 cay kasigi kaynamis, sarmal su ekleyin ve karistirin. "; 
         doseResult.innerHTML += "Mamanin yarisinda, uygulamak icin bir kasik veya biberon kullanin.<br><br>";
	     
         if (weight < 4.5){
           doseAmount = 115;
           doseResult.innerHTML += "Gunluk Poset Dozu: 1 Poset, Gunde 6 kereden fazla almayin.";
         } else {
           doseAmount = 230;
           doseResult.innerHTML += "Gunluk Poset Dozu: 2 Poset, Gunde 6 kereden fazla almayin.";
         }

	   } else if (age < 6) {
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
          doseAmount = 5 * (age - 2) / 8 + 2.5;	
          doseResult.innerHTML = "Yasiniz 6 yastan kucuk. Bu ilaci doktor gozetiminde alin.<br>";
          doseResult.innerHTML += "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " ml, Gunde 4 kez alinmalidir.";		 
       } else if (age <= 18) { // exceptional
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
		  doseAmount = 5 * age / 6;
          doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " ml, Gunde 4 kez alinmalidir.";
	   } else {
	      medicinename = "Gaviscon ml";
	      doseFrequency = 4;
		  if (StomachIntensity === 1) {doseAmount = 15;}
		  else if (StomachIntensity === 2) {doseAmount = 20;}
          doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " ml, Gunde 4 kez alinmalidir.";
	   }
	} else if (mainOptionSelected === 3) {
       medicinename = "Parasetemol mg";
	   if (age < 0.0833) {
         doseResult.innerHTML = "Yasiniz 1 aydan kucuk. Ilac icin Uzmaniniza danisin.";	
	     medicinename = "NotApproved";
       } else if (age < 18) {
            if (weight < 5) {
                doseResult.innerHTML = "Kilonuz cok dusuk. Ilac icin Uzmaniniza danisin.";
	            medicinename = "NotApproved";
                return;
            } else {
                doseAmount = weight * 15;
                if (doseAmount > 1000) {doseAmount = 1000;}
	             doseFrequency = 4;
                 doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde 4 kez alinmalidir.";
            }
        } else {
            if (weight < 40) {
// In the literature, this value is fixed as 500.
                doseAmount = 500;
                doseFrequency = 2;
            } else if (weight >= 40 && weight < 50) {
// The literature recommends 500-1000, but 1000 was chosen here because high fever along with body pain or chills are advanced conditions.
                doseAmount = 1000;
                doseFrequency = 3;
            } else {
// The literature recommends 500-1000, but 1000 was chosen here because high fever along with body pain or chills are advanced conditions.
                doseAmount = 1000;
                doseFrequency = 4;
            }
            doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde " + doseFrequency + " kez alinmalidir.";
        }
    } else if (mainOptionSelected === 4) {
        medicinename = "Zyrtec mg"; 
        doseFrequency = 1;
        if (age < 2) {
          doseResult.innerHTML = "2 yasin altindaki cocuklar icin bu ilac onerilmez. Lutfen Uzmaniniza danisiniz.";
	  medicinename = "NotRecommended";
          doseFrequency = 0;
        } else if (age >= 2 && age < 6) {
            doseAmount = 2.5 + (age - 2) * 0.625;
            doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde 1 kez alinmalidir.";
        } else if (age >= 6 && age < 12) {
            doseAmount = 5 + (age - 6) * 0.833;
            doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde 1 kez alinmalidir.";
        } else if (age >= 12) {
            doseAmount = 10;
            doseResult.innerHTML = "Gunluk Ilac Dozu: " + doseAmount.toFixed(4) + " mg, Gunde 1 kez alinmalidir.";
        }
    }
    
var xhr = new XMLHttpRequest();
xhr.open("POST", "save_dose.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("user_id=" + user_id + "&medicine=" + medicinename + "&name=" + name + "&surname=" + surname + "&age=" + age + "&weight=" + weight + "&dose=" + doseAmount.toFixed(4) + "&dailyAmount=" + doseFrequency + "&discomfort=" + discomfort + "&guidance=" + guidance);
}

setTimeout(typeQuestion, 1500);
