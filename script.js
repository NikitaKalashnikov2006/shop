let tg = window.Telegram.WebApp;
tg.expand();
tg.disableHeader();
let button = document.getElementById("close");
button.addEventListener("close", () => {
    tg.close();
});

