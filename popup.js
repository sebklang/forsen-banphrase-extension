// TODO add resultParagraph reset function (color and text) and show timeout duration on banphrases

const checkBanphraseBtn = document.getElementById("checkBanphraseBtn");
checkBanphraseBtn.addEventListener("click", submitted);

const messageBox = document.getElementById("message");
messageBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    	submitted();
    }
})

function submitted() {
    const resultParagraph = document.getElementById("result");
    resultParagraph.innerHTML = "Loading ...";
    resultParagraph.style.color = "black";

    const http = new XMLHttpRequest();
    http.open("POST", "https://forsen.tv/api/v1/banphrases/test", true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            var response = JSON.parse(http.responseText);
            console.log(response);
            if (response.banned === true) {
                resultParagraph.innerHTML = "Banned! :(";
                resultParagraph.style.color = "red";
            }
            else if (response.banned === false) {
                resultParagraph.innerHTML = "Not banned! :)";
                resultParagraph.style.color = "green";
            }
            else {
                resultParagraph.innerHTML = "Error: response did not contain 'banned' field";
                resultParagraph.style.color = "black";
            }
        }
        
        else if (http.readyState === 4 && http.status !== 200) {
            resultParagraph.innerHTML = "Error: check your internet or paja shut down api xd";
            resultParagraph.style.color = "black";
            console.log("http.status=" + http.status);
        }
    };

    const message = document.getElementById("message");
    const data = {
        message: message.value
    };

    http.send(JSON.stringify(data));
}