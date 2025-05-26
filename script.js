// Инициализация
if (window.Telegram?.WebApp) {
  Telegram.WebApp.expand();
  Telegram.WebApp.setHeaderColor('secondary_bg');
  
  // Обработчики кнопок
  document.getElementById('close-btn').onclick = () => Telegram.WebApp.close();
}
