// Array untuk menyimpan item keranjang
let cartItems = [];
let cartTotal = 0;

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, productPrice) {
    cartItems.push({ name: productName, price: productPrice });
    cartTotal += productPrice;
    updateCart();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsElement.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
        cartItemsElement.appendChild(li);
    });

    cartTotalElement.textContent = cartTotal.toLocaleString();
}

// Fungsi untuk mengarahkan ke WhatsApp
function sendToWhatsApp() {
    const phoneNumber = "082216406695"; // Ganti dengan nomor Anda
    const cartItemsElement = document.getElementById('cart-items');
    const items = Array.from(cartItemsElement.children).map(item => item.textContent);
    const total = document.getElementById('cart-total').textContent;

    let message = "Halo, saya ingin memesan:\n";
    items.forEach((item, index) => {
        message += `${index + 1}. ${item}\n`;
    });
    message += `Total: Rp ${total}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
}

// Kode untuk kotak 3D
document.querySelectorAll('.kotak-3d').forEach(kotak3D => {
    let rotation = 0;
    let isDragging = false;
    let startX = 0;

    // Untuk desktop (mouse events)
    kotak3D.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX;
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            let currentX = event.clientX;
            let deltaX = currentX - startX;
            rotation += deltaX * 0.5; // Sesuaikan kecepatan rotasi
            kotak3D.style.transform = `rotateY(${rotation}deg)`;
            startX = currentX;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Untuk mobile (touch events)
    kotak3D.addEventListener('touchstart', function(event) {
        isDragging = true;
        startX = event.touches[0].clientX;
    });

    document.addEventListener('touchmove', function(event) {
        if (isDragging) {
            let currentX = event.touches[0].clientX;
            let deltaX = currentX - startX;
            rotation += deltaX * 0.5; // Sesuaikan kecepatan rotasi
            kotak3D.style.transform = `rotateY(${rotation}deg)`;
            startX = currentX;
        }
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });
});