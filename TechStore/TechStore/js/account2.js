// Account page for TechStore
function updateAccount2(e) {
    e.preventDefault();
    user.name = document.getElementById('account-name').value;
    user.email = document.getElementById('account-email').value;
    user.phone = document.getElementById('account-phone').value;
    saveUser();
    showNotification('Ma\'lumotlar yangilandi!');
}

function updateAccountStats2() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = wishlist.length;
    const totalSpent = getCartTotal();
    
    document.getElementById('cart-count-stat').textContent = cartCount;
    document.getElementById('wishlist-count-stat').textContent = wishlistCount;
    document.getElementById('total-spent').textContent = formatPrice(totalSpent);
    document.getElementById('current-membership').textContent = user.membership;
    document.getElementById('membership-discount').textContent = getMembershipDiscount() + '%';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('account-name').value = user.name;
    document.getElementById('account-email').value = user.email;
    document.getElementById('account-phone').value = user.phone;
    
    updateAccountStats2();
});

const originalSetMembership2 = window.setMembership;
window.setMembership = function(membership) {
    originalSetMembership2(membership);
    if (window.location.pathname.includes('account2.html')) {
        updateAccountStats2();
    }
};

window.updateAccount2 = updateAccount2;
