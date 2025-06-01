// Simple script to filter products and handle add to cart functionality

document.addEventListener('DOMContentLoaded', () => {
    const sizeFilter = document.getElementById('size-filter');
    const colorFilter = document.getElementById('color-filter');
    const products = document.querySelectorAll('.product-card');
    const cart = document.querySelector('.cart');
    let cartCount = 0;
    let cartItems = [];

    function filterProducts() {
        const selectedSize = sizeFilter.value;
        const selectedColor = colorFilter.value;
        console.log('Filtering products with size:', selectedSize, 'color:', selectedColor);

        products.forEach(product => {
            const productSize = product.getAttribute('data-size');
            const productColor = product.getAttribute('data-color');
            const sizeMatch = selectedSize === '' || productSize === selectedSize;
            const colorMatch = selectedColor === '' || productColor === selectedColor;

            if (sizeMatch && colorMatch) {
                product.style.display = 'flex';
                console.log('Showing product:', product.querySelector('h3').textContent);
            } else {
                product.style.display = 'none';
                console.log('Hiding product:', product.querySelector('h3').textContent);
            }
        });
    }

    sizeFilter.addEventListener('change', filterProducts);
    colorFilter.addEventListener('change', filterProducts);

    // Add to cart button handler
    products.forEach(product => {
        const button = product.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
            cartCount++;
            cartItems.push({ name: productName, price: productPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('cartCount', cartCount);
            const cartCountSpan = document.getElementById('cart-count');
            if (cartCountSpan) {
                cartCountSpan.textContent = cartCount;
            }
            alert(`${productName} added to cart.`);
        });
    });

    // Initialize cart count and items from localStorage on page load
    window.addEventListener('load', () => {
        const storedCartItems = localStorage.getItem('cartItems');
        const storedCartCount = localStorage.getItem('cartCount');
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
        }
        if (storedCartCount) {
            cartCount = parseInt(storedCartCount, 10);
            const cartCountSpan = document.getElementById('cart-count');
            if (cartCountSpan) {
                cartCountSpan.textContent = cartCount;
            }
        }
    });

    // Cart button click handler
    cart.addEventListener('click', () => {
        alert(`You have ${cartCount} item(s) in your cart.`);
    });
});
