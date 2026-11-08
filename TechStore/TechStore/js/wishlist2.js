// Wishlist page for TechStore
function loadWishlist2() {
    const wishlistContent = document.getElementById('wishlist-content');
    
    if (!wishlist || wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h2>Istaklar ro'yxati bo'sh</h2>
                <p>Mahsulotlarni istaklar ro'yxatiga qo'shing</p>
                <a href="products2.html" class="hero-btn" style="display: inline-block; margin-top: 20px;">Mahsulotlarni Ko'rish</a>
            </div>
        `;
        return;
    }

    wishlistContent.innerHTML = `
        <div class="products-grid">
            ${wishlist.map(product => `
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="wishlist-icon active" 
                             onclick="removeFromWishlist(${product.id})" 
                             title="Istaklar ro'yxatidan olib tashlash">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${formatPrice(product.price)}</span>
                            <button class="add-cart-btn" onclick="addProductToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Savatga
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    loadWishlist2();
});

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

window.removeFromWishlist = removeFromWishlist;
window.addProductToCart = addProductToCart;
