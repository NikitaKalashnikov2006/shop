let tg = window.Telegram.WebApp;
tg.expand();
tg.disableHeader();
let button = document.getElementById("close");
button.addEventListener("click", () => {
    tg.close();
});

