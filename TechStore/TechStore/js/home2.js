// Home page for TechStore
document.addEventListener('DOMContentLoaded', function() {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = products.slice(0, 6);
        featuredContainer.innerHTML = featuredProducts.map(product => 
            createProductCard2(product)
        ).join('');
    }
});

function createProductCard2(product) {
    const inWishlist = isInWishlist(product.id);
    return `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="wishlist-icon ${inWishlist ? 'active' : ''}" 
                     onclick="toggleWishlist2(${product.id})" 
                     title="${inWishlist ? 'Istaklar ro\'yxatidan olib tashlash' : 'Istaklar ro\'yxatiga qo\'shish'}">
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
    `;
}

function toggleWishlist2(productId) {
    const product = products.find(p => p.id === productId);
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(product);
    }
    // Reload products
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = products.slice(0, 6);
        featuredContainer.innerHTML = featuredProducts.map(product => 
            createProductCard2(product)
        ).join('');
    }
}

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

// Make functions available globally
window.toggleWishlist2 = toggleWishlist2;
window.addProductToCart = addProductToCart;
window.setMembership = setMembership;
window.createProductCard2 = createProductCard2;