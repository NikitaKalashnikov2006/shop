<<<<<<< HEAD
// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Развернуть приложение на весь экран

// Данные товаров
const products = [
    { id: 1, title: "Смартфон", price: 19990, category: "Электроника", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Ноутбук", price: 54990, category: "Электроника", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Футболка", price: 1990, category: "Одежда", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Джинсы", price: 3990, category: "Одежда", image: "https://via.placeholder.com/150" },
    { id: 5, title: "JavaScript для начинающих", price: 1290, category: "Книги", image: "https://via.placeholder.com/150" },
    { id: 6, title: "React руководство", price: 1590, category: "Книги", image: "https://via.placeholder.com/150" },
];

// Корзина
let cart = [];
let currentCategory = "Все товары";

// DOM элементы
const productsContainer = document.getElementById('products');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Загрузка товаров
function loadProducts() {
    productsContainer.innerHTML = '';
    
    const filteredProducts = currentCategory === "Все товары" 
        ? products 
        : products.filter(product => product.category === currentCategory);
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price} руб.</p>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
    
    // Добавляем обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Добавление в корзину
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Обновление корзины
function updateCart() {
    cartBtn.textContent = `Корзина (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Отображение корзины в модальном окне
function showCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваша корзина пуста</p>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
        
        itemElement.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <p>${item.price} руб. × ${item.quantity}</p>
            </div>
            <div>
                <p>${itemPrice} руб.</p>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    totalPriceElement.textContent = totalPrice;
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Удаление из корзины
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    showCart();
    updateCart();
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) return;
    
    // Можно отправить данные в Telegram бота
    tg.sendData(JSON.stringify({
        type: 'order',
        items: cart,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }));
    
    // Или просто показать сообщение
    tg.showAlert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем корзину
    cart = [];
    updateCart();
    showCart();
    cartModal.style.display = 'none';
}

// Инициализация приложения
function init() {
    // Загружаем сохраненную корзину
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    // Загружаем товары
    loadProducts();
    
    // Обработчики категорий
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.textContent;
            loadProducts();
        });
    });
    
    // Обработчики корзины
    cartBtn.addEventListener('click', () => {
        showCart();
        cartModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    // Инициализация Telegram WebApp
    tg.MainButton.setParams({
        text: 'Оформить заказ',
        is_visible: false
    });
}

// Запуск приложения
=======
// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Развернуть приложение на весь экран

// Данные товаров
const products = [
    { id: 1, title: "Смартфон", price: 19990, category: "Электроника", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Ноутбук", price: 54990, category: "Электроника", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Футболка", price: 1990, category: "Одежда", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Джинсы", price: 3990, category: "Одежда", image: "https://via.placeholder.com/150" },
    { id: 5, title: "JavaScript для начинающих", price: 1290, category: "Книги", image: "https://via.placeholder.com/150" },
    { id: 6, title: "React руководство", price: 1590, category: "Книги", image: "https://via.placeholder.com/150" },
];

// Корзина
let cart = [];
let currentCategory = "Все товары";

// DOM элементы
const productsContainer = document.getElementById('products');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Загрузка товаров
function loadProducts() {
    productsContainer.innerHTML = '';
    
    const filteredProducts = currentCategory === "Все товары" 
        ? products 
        : products.filter(product => product.category === currentCategory);
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price} руб.</p>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
    
    // Добавляем обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Добавление в корзину
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Обновление корзины
function updateCart() {
    cartBtn.textContent = `Корзина (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Отображение корзины в модальном окне
function showCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваша корзина пуста</p>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
        
        itemElement.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <p>${item.price} руб. × ${item.quantity}</p>
            </div>
            <div>
                <p>${itemPrice} руб.</p>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    totalPriceElement.textContent = totalPrice;
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Удаление из корзины
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    showCart();
    updateCart();
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) return;
    
    // Можно отправить данные в Telegram бота
    tg.sendData(JSON.stringify({
        type: 'order',
        items: cart,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }));
    
    // Или просто показать сообщение
    tg.showAlert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем корзину
    cart = [];
    updateCart();
    showCart();
    cartModal.style.display = 'none';
}

// Инициализация приложения
function init() {
    // Загружаем сохраненную корзину
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    // Загружаем товары
    loadProducts();
    
    // Обработчики категорий
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.textContent;
            loadProducts();
        });
    });
    
    // Обработчики корзины
    cartBtn.addEventListener('click', () => {
        showCart();
        cartModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    // Инициализация Telegram WebApp
    tg.MainButton.setParams({
        text: 'Оформить заказ',
        is_visible: false
    });
}
