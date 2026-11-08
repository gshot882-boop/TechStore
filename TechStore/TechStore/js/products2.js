// Products page for TechStore
let selectedCategory2 = 'all';
let searchTerm2 = '';

function renderProducts2() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory2 === 'all' || product.category === selectedCategory2;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm2) || 
                             product.description.toLowerCase().includes(searchTerm2);
        return matchesCategory && matchesSearch;
    });

    const productsGrid = document.getElementById('products-grid');
    const productsCount = document.getElementById('products-count');
    
    if (productsCount) {
        productsCount.textContent = `${filteredProducts.length} ta mahsulot topildi`;
    }

    if (productsGrid) {
        if (filteredProducts.length > 0) {
            productsGrid.innerHTML = filteredProducts.map(product => 
                createProductCard2(product)
            ).join('');
        } else {
            productsGrid.innerHTML = '<div class="no-products"><p>Hech qanday mahsulot topilmadi</p></div>';
        }
    }
}

// Filter by category
window.filterByCategory2 = function(category, element) {
    selectedCategory2 = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    } else {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.textContent.trim() === (category === 'all' ? 'Barchasi' : category)) {
                btn.classList.add('active');
            }
        });
    }
    
    renderProducts2();
};

document.addEventListener('DOMContentLoaded', function() {
    // Get unique categories
    const categories = ['all', ...new Set(products.map(p => p.category))];
    
    // Render categories
    const categoryFilters = document.getElementById('category-filters');
    if (categoryFilters) {
        categoryFilters.innerHTML = categories.map(category => `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    onclick="filterByCategory2('${category}', this)">
                ${category === 'all' ? 'Barchasi' : category}
            </button>
        `).join('');
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchTerm2 = e.target.value.toLowerCase();
            renderProducts2();
        });
    }

    // Initial render
    renderProducts2();
});

function createProductCard2(product) {
    const inWishlist = isInWishlist(product.id);
    const productJson = JSON.stringify(product).replace(/"/g, '&quot;');
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

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

function toggleWishlist2(productId) {
    const product = products.find(p => p.id === productId);
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(product);
    }
    // Reload products without page reload
    const productsGrid = document.getElementById('products-grid');
    const featuredContainer = document.getElementById('featured-products');
    
    if (productsGrid) {
        const filteredProducts = products.filter(p => {
            const selectedCategory = document.querySelector('.filter-btn.active')?.textContent.trim() === 'Barchasi' ? 'all' : 
                document.querySelector('.filter-btn.active')?.textContent.trim();
            const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        productsGrid.innerHTML = filteredProducts.map(p => createProductCard2(p)).join('');
    }
    
    if (featuredContainer) {
        const featuredProducts = products.slice(0, 6);
        featuredContainer.innerHTML = featuredProducts.map(p => createProductCard2(p)).join('');
    }
}

// Make functions available globally
window.toggleWishlist2 = toggleWishlist2;
window.addProductToCart = addProductToCart;
window.createProductCard2 = createProductCard2;
