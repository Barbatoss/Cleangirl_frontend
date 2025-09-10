// API Configuration
const API_BASE_URL = 'https://cleangirl-prod.up.railway.app';

// State
let currentQuantity = 1;
let productPrice = 19.90; // Base price in dollars

// DOM Elements
const quantityElement = document.getElementById('quantity');
const currentPriceElement = document.getElementById('current-price');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutForm = document.getElementById('checkout-form');
const orderForm = document.getElementById('order-form');
const successModal = document.getElementById('success-modal');
const loadingOverlay = document.getElementById('loading-overlay');
const placeOrderBtn = document.getElementById('place-order-btn');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    fetchProductInfo();
    updatePricing();
});

// Fetch product information from backend
async function fetchProductInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory`);
        if (response.ok) {
            const products = await response.json();
            const cleanGirlProduct = products.find(p => p.name === 'Clean Girl');
            
            if (cleanGirlProduct) {
                // Update pricing based on backend data
                const originalPrice = cleanGirlProduct.price_cents / 100;
                const discountPrice = cleanGirlProduct.discount_cents ? 
                    cleanGirlProduct.discount_cents / 100 : originalPrice;
                
                productPrice = discountPrice;
                
                // Update UI
                document.getElementById('original-price').textContent = `$${originalPrice.toFixed(2)}`;
                currentPriceElement.textContent = `$${discountPrice.toFixed(2)}`;
                
                // Show discount if applicable
                if (cleanGirlProduct.discount_cents && cleanGirlProduct.discount_cents < cleanGirlProduct.price_cents) {
                    document.getElementById('original-price').style.display = 'inline';
                } else {
                    document.getElementById('original-price').style.display = 'none';
                }
                
                updatePricing();
            }
        }
    } catch (error) {
        console.error('Error fetching product info:', error);
        // Continue with default pricing if API fails
    }
}

// Quantity controls
function increaseQuantity() {
    currentQuantity++;
    updateQuantityDisplay();
    updatePricing();
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
        updatePricing();
    }
}

function updateQuantityDisplay() {
    quantityElement.textContent = currentQuantity;
}

function updatePricing() {
    const subtotal = (productPrice * currentQuantity);
    const total = subtotal; // No additional fees for now
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Show checkout form
function proceedToCheckout() {
    checkoutForm.style.display = 'block';
    checkoutForm.scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
orderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        customer_name: formData.get('customer_name').trim(),
        email: formData.get('email').trim(),
        address: formData.get('address').trim(),
        phone: formData.get('phone').trim(),
        quantity: currentQuantity
    };
    
    // Validate form data
    if (!validateOrderData(orderData)) {
        return;
    }
    
    // Show loading
    showLoading(true);
    placeOrderBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            document.getElementById('order-id').textContent = result.order_id;
            showSuccessModal();
            
            // Reset form
            orderForm.reset();
            currentQuantity = 1;
            updateQuantityDisplay();
            updatePricing();
            checkoutForm.style.display = 'none';
            
        } else {
            // Error from server
            throw new Error(result.error || 'Failed to place order');
        }
        
    } catch (error) {
        console.error('Order placement error:', error);
        showError(error.message || 'Failed to place order. Please try again.');
    } finally {
        showLoading(false);
        placeOrderBtn.disabled = false;
    }
});

// Validation
function validateOrderData(data) {
    const errors = [];
    
    if (!data.customer_name || data.customer_name.length < 2) {
        errors.push('Please enter a valid full name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.address || data.address.length < 10) {
        errors.push('Please enter a complete delivery address');
    }
    
    if (data.quantity < 1) {
        errors.push('Quantity must be at least 1');
    }
    
    if (errors.length > 0) {
        showError(errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// UI Helper functions
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function showSuccessModal() {
    successModal.style.display = 'flex';
}

function closeModal() {
    successModal.style.display = 'none';
    // Optionally redirect to home page
    window.location.href = 'index.html';
}

function showError(message) {
    // Create a simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red text-white p-4 rounded-14 shadow-lg z-50 max-w-sm';
    errorDiv.innerHTML = `
        <div class="flex items-start gap-3">
            <span class="text-xl">⚠️</span>
            <div class="flex-1">
                <h4 class="font-semibold mb-1">Error</h4>
                <p class="text-sm whitespace-pre-line">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                ✕
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Health check on page load
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
            console.warn('Backend health check failed');
        }
    } catch (error) {
        console.warn('Backend not accessible:', error);
    }
}

// Run health check
checkBackendHealth();