const tg = window.Telegram.WebApp;
tg.ready();


  
 const availableScreenWidth = window.screen.availWidth;
 const availableScreenHeight = window.screen.availHeight;
 if (availableScreenWidth < 1440 && availableScreenHeight < 3220){
tg.requestFullscreen();
 }










 import { TonConnect } from '@tonconnect/sdk';

const connector = new TonConnect({
  manifestUrl: 'https://nikitakalashnikov2006.github.io/shop/tonconnect-manifest.json'
});

// Проверка, подключен ли уже кошелек
const walletConnectionSource = {
  jsBridgeKey: 'tonconnect' // Для работы внутри Telegram WebView
};

async function connectWallet() {
  const wallets = await connector.getWallets();
  const wallet = wallets[0]; // Первый доступный кошелек (TonKeeper, OpenMask и др.)
  
  const connectionLink = connector.connect(wallet, walletConnectionSource);
  
  
    tg.openLink(connectionLink.universalLink);
  
}

// Проверяем, есть ли уже подключенный кошелек
connector.onStatusChange((wallet) => {
  if (wallet) {
    console.log('Кошелек подключен:', wallet);
  } else {
    console.log('Кошелек отключен');
  }
});

