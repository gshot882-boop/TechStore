// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Foydalanuvchi',
    email: 'user@example.com',
    membership: 'bronze',
    phone: '+998 90 123 45 67',
};

// Save to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
}

function saveUser() {
    localStorage.setItem('user', JSON.stringify(user));
    updateMembershipBadge();
}

// Update badges
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = count;
        countEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
    const countEl = document.getElementById('wishlist-count');
    if (countEl) {
        countEl.textContent = wishlist.length;
        countEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function updateMembershipBadge() {
    const badge = document.getElementById('membership-badge');
    if (badge) {
        badge.textContent = user.membership;
        badge.className = `membership-badge ${user.membership}`;
    }
    const tag = document.getElementById('membership-tag');
    if (tag) {
        const membershipNames = {
            'bronze': 'Bronze',
            'silver': 'Silver',
            'gold': 'Gold'
        };
        tag.textContent = membershipNames[user.membership] || 'Bronze';
    }
}

// Cart functions
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification('Mahsulot savatga qo\'shildi!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('cart2.html')) {
        if (typeof loadCart === 'function') loadCart();
        if (typeof loadCart2 === 'function') loadCart2();
    }
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('cart2.html')) {
                if (typeof loadCart === 'function') loadCart();
                if (typeof loadCart2 === 'function') loadCart2();
            }
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Wishlist functions
function addToWishlist(product) {
    if (!wishlist.find(item => item.id === product.id)) {
        wishlist.push(product);
        saveWishlist();
        showNotification('Istaklar ro\'yxatiga qo\'shildi!');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    if (window.location.pathname.includes('wishlist.html') || window.location.pathname.includes('wishlist2.html')) {
        if (typeof loadWishlist === 'function') loadWishlist();
        if (typeof loadWishlist2 === 'function') loadWishlist2();
    }
    showNotification('Istaklar ro\'yxatidan olib tashlandi!');
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// Membership functions
function setMembership(membership) {
    user.membership = membership;
    saveUser();
    showNotification(`${membership.toUpperCase()} a'zolik tanlandi!`);
}

function getMembershipDiscount() {
    switch (user.membership) {
        case 'gold': return 15;
        case 'silver': return 10;
        case 'bronze': return 5;
        default: return 0;
    }
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateWishlistBadge();
    updateMembershipBadge();
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index2.html';
    document.querySelectorAll('.nav-menu a, .navbar-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index2.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
