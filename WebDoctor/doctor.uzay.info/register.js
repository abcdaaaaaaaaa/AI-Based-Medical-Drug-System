document.getElementById('registerForm').addEventListener('submit', function(event) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        let additionalInfo = '';
        checkboxes.forEach((checkbox, index) => {
            additionalInfo += checkbox.value;
            if (index < checkboxes.length - 1) {
                additionalInfo += '\n';
            }
        });
        document.getElementById('information').value += '\n' + additionalInfo;
    }
});
