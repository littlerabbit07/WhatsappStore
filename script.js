// Sample product data - Replace with your actual products
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality bluetooth headphones with noise cancellation",
        price: 79.99,
        category: "electronics",
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Cotton T-Shirt",
        description: "100% cotton comfortable t-shirt available in multiple colors",
        price: 24.99,
        category: "clothing",
        emoji: "👕"
    },
    {
        id: 3,
        name: "Premium Coffee Beans",
        description: "Organic arabica coffee beans, freshly roasted",
        price: 18.50,
        category: "food",
        emoji: "☕"
    },
    {
        id: 4,
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor and GPS",
        price: 199.99,
        category: "electronics",
        emoji: "⌚"
    },
    {
        id: 5,
        name: "Denim Jeans",
        description: "Classic fit denim jeans, durable and comfortable",
        price: 45.00,
        category: "clothing",
        emoji: "👖"
    },
    {
        id: 6,
        name: "Herb Garden Kit",
        description: "Indoor herb garden kit with seeds and pots",
        price: 32.99,
        category: "home",
        emoji: "🌿"
    },
    {
        id: 7,
        name: "Artisan Chocolate",
        description: "Handcrafted dark chocolate with sea salt",
        price: 12.99,
        category: "food",
        emoji: "🍫"
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 12-hour battery",
        price: 89.99,
        category: "electronics",
        emoji: "🔊"
    },
    {
        id: 9,
        name: "Cozy Blanket",
        description: "Ultra-soft fleece blanket perfect for cold nights",
        price: 35.99,
        category: "home",
        emoji: "🛋️"
    },
    {
        id: 10,
        name: "Energy Drink Pack",
        description: "Natural energy drinks with vitamins and minerals (6 pack)",
        price: 21.99,
        category: "food",
        emoji: "⚡"
    }
];

let cart = [];
let quantities = {};

// Initialize quantities
products.forEach(product => {
    quantities[product.id] = 0;
});

function renderProducts(productsToShow = products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${STORE_CONFIG.currency}${product.price.toFixed(2)}</div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                <div class="qty-display" id="qty-${product.id}">${quantities[product.id]}</div>
                <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(productCard);
    });
}

function updateQuantity(productId, change) {
    quantities[productId] = Math.max(0, quantities[productId] + change);
    document.getElementById(`qty-${productId}`).textContent = quantities[productId];
}

function addToCart(productId) {
    const quantity = quantities[productId];
    if (quantity === 0) return;

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    // Reset quantity display
    quantities[productId] = 0;
    document.getElementById(`qty-${productId}`).textContent = 0;

    updateCartDisplay();
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
    document.getElementById('modal-cart-total').textContent = totalPrice.toFixed(2);
}

function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    renderProducts(filteredProducts);
}

function openCart() {
    renderCartItems();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ${STORE_CONFIG.currency}${item.price.toFixed(2)} × ${item.quantity}
            </div>
            <div>
                ${STORE_CONFIG.currency}${(item.price * item.quantity).toFixed(2)}
                <button onclick="removeFromCart(${index})" style="margin-left: 10px; background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCartItems();
}

function sendToWhatsApp() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const notes = document.getElementById('customer-notes').value;

    if (!name || !phone) {
        alert('Please fill in your name and phone number');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Create WhatsApp message
    let message = `🛍️ *NEW ORDER*\n\n`;
    message += `👤 *Customer Info:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    if (address) message += `Address: ${address}\n`;
    message += `\n📝 *Order Details:*\n`;

    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name}\n`;
        message += `  Qty: ${item.quantity} × ${STORE_CONFIG.currency}${item.price.toFixed(2)} = ${STORE_CONFIG.currency}${(item.quantity * item.price).toFixed(2)}\n`;
        total += item.quantity * item.price;
    });

    message += `\n💰 *Total: ${STORE_CONFIG.currency}${total.toFixed(2)}*\n`;
    
    if (notes) {
        message += `\n📋 *Special Instructions:*\n${notes}\n`;
    }

    message += `\n✅ Please confirm this order and let me know the delivery details.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear cart after sending
    cart = [];
    updateCartDisplay();
    closeCart();
}

// Close modal when clicking outside
document.getElementById('cart-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCart();
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartDisplay();
});