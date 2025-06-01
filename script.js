const tg = window.Telegram.WebApp;
tg.ready();


  
 const availableScreenWidth = window.screen.availWidth;
 const availableScreenHeight = window.screen.availHeight;
 if (availableScreenWidth < 1440 && availableScreenHeight < 3220){
tg.requestFullscreen();
 }

