// TODO add resultParagraph reset function (color and text) and show timeout duration on banphrases

const checkBanphraseBtn = document.getElementById("checkBanphraseBtn");
checkBanphraseBtn.addEventListener("click", submit);

const messageBox = document.getElementById("message");
messageBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    	submit();
    }
});

function submit() {
    const resultParagraph = document.getElementById("result");
    resultParagraph.innerHTML = "<img src=\"/images/FeelsOkayMan.png\"> Loading ...";
    resultParagraph.style.color = "black";

    const http = new XMLHttpRequest();
    http.open("POST", "https://forsen.tv/api/v1/banphrases/test", true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            var response = JSON.parse(http.responseText);
            console.log(response);
            if (response.banned === true) {
                resultParagraph.innerHTML = "<img src=\"/images/FeelsBadMan.png\"> Banned!";
                resultParagraph.style.color = "red";
            }
            else if (response.banned === false) {
                resultParagraph.innerHTML = "<img src=\"/images/FeelsGoodMan.png\"> Not banned!";
                resultParagraph.style.color = "green";
            }
            else {
                resultParagraph.innerHTML = "Error: response is malformed";
                resultParagraph.style.color = "black";
            }
        }
        
        else if (http.readyState === 4 && http.status !== 200) {
            resultParagraph.innerHTML = "Error: check your internet or go to extension settings and allow access to forsen.tv";
            resultParagraph.style.color = "black";
            console.log("http.status=" + http.status);
        }
    };

    const data = {
        message: messageBox.value
    };

    http.send(JSON.stringify(data));
}