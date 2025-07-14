function confirmAction(message) {
    return confirm(message || "Göndermek istediğinizden emin misiniz?");
}

function toggleVisibility(elementId, show = true) {
    document.getElementById(elementId).classList.toggle('hidden', !show);
}

function sendYes() {
    if (confirmAction()) {
        toggleVisibility('resultContainer', false);
        toggleVisibility('approvalReasonContainer', true);
    }
}

function sendNo() {
    if (confirmAction()) {
        toggleVisibility('resultContainer', false);
        toggleVisibility('detailedRejectionQuestionContainer', true);
    }
}

function detailedRejectionYes() {
    if (confirmAction()) {
        toggleVisibility('detailedRejectionQuestionContainer', false);
        toggleVisibility('detailedRejectionReasonContainer', true);
    }
}

function detailedRejectionNo() {
    if (confirmAction()) {
        toggleVisibility('detailedRejectionQuestionContainer', false);
        toggleVisibility('rejectionReasonContainer', true);
    }
}

function sendDetailedRejectionReason() {
    if (confirmAction() && document.getElementById('detailedRejectionText').value.trim() !== "") {
        alert("Detaylı Red gerekçesi gönderildi.");
        console.log("Detaylı Red Gerekçesi:", document.getElementById('detailedRejectionText').value);
        toggleVisibility('detailedRejectionReasonContainer', false);
        toggleVisibility('rejectionReasonContainerFilled', true);
    } else {
        alert("Lütfen ilgili gerekçeyi doldurunuz.");
    }
}

function sendRejectionReason() {
    if (confirmAction()) {
        const checkedOptions = document.querySelectorAll('input[name="rejectionReason"]:checked');
        if (checkedOptions.length > 0) {
            const selectedReasons = Array.from(checkedOptions).map(option => option.value);
            alert("Red gerekçesi gönderildi.");
            console.log("Red Gerekçesi:", selectedReasons.join(", "));
            toggleVisibility('rejectionReasonContainer', false);
            toggleVisibility('resultContainer', false);
        } else {
            alert("Lütfen en az bir red gerekçesi seçin.");
        }
    }
}

function sendRejectionReasonFilled() {
    if (confirmAction()) {
        const selectedReasonsFilled = Array.from(document.querySelectorAll('input[name="rejectionReasonFilled"]:checked'))
            .map(option => option.value);
        alert("Red gerekçesi gönderildi.");
        console.log("Red Gerekçesi (Dolu):", selectedReasonsFilled.join(", "));
        toggleVisibility('rejectionReasonContainerFilled', false);
        toggleVisibility('resultContainer', false);
    }
}

function sendApprovalReason() {
    if (confirmAction()) {
        alert("Kabul gerekçesi gönderildi.");
        console.log("Kabul Gerekçesi:", document.getElementById('approvalText').value);
        toggleVisibility('approvalReasonContainer', false);
        toggleVisibility('resultContainer', false);
    }
}
