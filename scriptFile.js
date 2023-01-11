document.getElementById("set-timer").addEventListener("click", function () {
    var time = document.getElementById("time").value;
    chrome.runtime.sendMessage({ type: "setTimer", time: time }, function () {
        window.close();
    });
});