const tg = window.Telegram.WebApp;
tg.ready();
  
 function isMobilePhone() {
  const platform = tg.platform;
  const userAgent = navigator.userAgent.toLowerCase();

  // Проверяем iOS (iPhone, не iPad)
  if (platform === "ios") {
    return !/ipad|tablet/i.test(userAgent); // true только для iPhone
  }

  // Проверяем Android (телефон, не планшет)
  if (platform === "android") {
    return !/tablet/i.test(userAgent); // true только для телефонов
  }

  // Игнорируем другие платформы (ПК, веб и т.д.)
  return false;
}

if (isMobilePhone()) {
  tg.requestFullscreen(); // Сработает только на iPhone/Android-телефонах
} else {
  tg.expand();
}

