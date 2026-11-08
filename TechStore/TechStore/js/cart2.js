// Cart page for TechStore
function loadCart2() {
    const cartContent = document.getElementById('cart-content');
    
    if (!cart || cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h2>Savat bo'sh</h2>
                <p>Savatga mahsulot qo'shing</p>
                <a href="products2.html" class="hero-btn" style="display: inline-block; margin-top: 20px;">Mahsulotlarni Ko'rish</a>
            </div>
        `;
        return;
    }

    const discount = getMembershipDiscount();
    const subtotal = getCartTotal();
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    cartContent.innerHTML = `
        <div class="cart-wrapper">
            <div class="cart-items-list">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>${item.category}</p>
                            <p style="color: var(--primary-color); font-weight: 600;">${formatPrice(item.price)}</p>
                        </div>
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="updateCartQuantity2(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQuantity2(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <div>
                            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i> O'chirish
                            </button>
                        </div>
                        <div class="cart-item-price">
                            ${formatPrice(item.price * item.quantity)}
                        </div>
                    </div>
                `).join('')}
                <button onclick="clearCart2()" class="remove-item-btn" style="width: 100%; margin-top: 10px;">
                    <i class="fas fa-trash-alt"></i> Savatni Tozalash
                </button>
            </div>
            <div class="cart-summary">
                <h2>Buyurtma Xulosa</h2>
                <div class="summary-row">
                    <span>Jami:</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                ${discount > 0 ? `
                    <div class="summary-row" style="color: var(--secondary-color);">
                        <span>Chegirma (${discount}%):</span>
                        <span>-${formatPrice(discountAmount)}</span>
                    </div>
                ` : ''}
                <div class="summary-row total">
                    <span>To'lov:</span>
                    <span>${formatPrice(total)}</span>
                </div>
                <button class="checkout-btn" onclick="checkout2()">
                    <i class="fas fa-credit-card"></i> Buyurtma Berish
                </button>
            </div>
        </div>
    `;
}

function updateCartQuantity2(productId, quantity) {
    updateQuantity(productId, quantity);
    loadCart2();
    updateCartBadge();
}

function clearCart2() {
    if (confirm('Savatni tozalashni xohlaysizmi?')) {
        cart = [];
        saveCart();
        loadCart2();
    }
}

function checkout2() {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh!');
        return;
    }
    showNotification('Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
    cart = [];
    saveCart();
    loadCart2();
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart2();
});

window.updateCartQuantity2 = updateCartQuantity2;
window.removeFromCart = removeFromCart;
window.clearCart2 = clearCart2;
window.checkout2 = checkout2;
