window.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("popstate", 顯示);
    document.getElementById("表單顯示").addEventListener("click", function () {
        history.pushState({ "form": true }, "", "?form=true");
        顯示();
    });
    顯示();
    document.querySelectorAll(".save-to-storage").forEach(function (input) { input.addEventListener("input", function () {localStorage.setItem (this.id, this.value)}); });
    document.getElementById("按鈕").addEventListener("click", 遞交);
});


function 顯示() {
    let popup = document.getElementById("彈出窗口");
    if (history.state != null && history.state.form === true) {
        popup.style.display = "block";
        popup.style.position = "absolute";
        document.querySelectorAll(".save-to-storage").forEach(function (input) { input.value = localStorage.getItem(input.id); });
    } else
        popup.style.display = "none";
}

function 遞交() {
    let name = document.getElementById("姓名").value;
    let email = document.getElementById("電郵").value;
    let message = document.getElementById("訊息").value;
    let checkbox = document.getElementById("複選框");
    let result = document.getElementById("結果");
    if (name != "" && message != "" && checkbox.checked && validateEmail(email) != null) {
        let sendRequest = new XMLHttpRequest();

        sendRequest.open('POST', 'https://formcarry.com/s/cB6SsjsbV');
        sendRequest.setRequestHeader('Content-Type', 'application/json');
        sendRequest.setRequestHeader('Accept', 'application/json');
        let popupForm = { "姓名": name, "電郵": email, "訊息": message };
        sendRequest.send(JSON.stringify(popupForm));
        document.getElementById("姓名").value = "";
        document.getElementById("電郵").value = "";
        document.getElementById("訊息").value = "";
        checkbox.checked = false;
        sendRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
                localStorage.clear();
                result.style.color = "green";
                result.innerHTML = "Successfully sent";
            }
        }
    }
    else {
        result.style.color = "red";
        result.innerHTML = "Fullfill the form and check the checkbox";
    }
}

const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};