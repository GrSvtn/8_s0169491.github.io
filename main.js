window.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("popstate", formShow);
    document.getElementById("buttonFormShow").addEventListener("click", function () {
        history.pushState({ "form": true }, "", "?form=true");
        formShow();
    });
    formShow();
    document.querySelectorAll(".save-to-storage").forEach(function (input) { input.addEventListener("input", function () {localStorage.setItem (this.id, this.value)}); });
    document.getElementById("formSubmit").addEventListener("click", sendForm);
});

function formShow() {
    let popup = document.getElementById("popup");
    if (history.state != null && history.state.form === true) {
        popup.style.display = "block";
        popup.style.position = "absolute";
        document.querySelectorAll(".save-to-storage").forEach(function (input) { input.value = localStorage.getItem(input.id); });
    } else
        popup.style.display = "none";
}

function sendForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let checkbox = document.getElementById("checkbox");
    let result = document.getElementById("result");
    if (name != "" && message != "" && checkbox.checked && validateEmail(email) != null) {
        let sendRequest = new XMLHttpRequest();

        sendRequest.open('POST', 'https://formcarry.com/s/cB6SsjsbV');
        sendRequest.setRequestHeader('Content-Type', 'application/json');
        sendRequest.setRequestHeader('Accept', 'application/json');
        let popupForm = { "name": name, "email": email, "message": message };
        sendRequest.send(JSON.stringify(popupForm));
        let nameObj = document.getElementById("name");
        nameObj.value = "";
        let emailObj = document.getElementById("email");
        emailObj.value = "";
        let messageObj = document.getElementById("message");
        messageObj.value = "";
        checkbox.checked = false;
        sendRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
                localStorage.clear();
                result.style.color = "#2718dc";
                result.innerHTML = "Успешно отправлено";
            }
        }
    }
    else {
        result.style.color = "red";
        result.innerHTML = "Заполните форму полностью и отметьте чекбокс";
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};