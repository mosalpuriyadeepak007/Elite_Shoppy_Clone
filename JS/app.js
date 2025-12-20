const menCheck = document.getElementById("men");
const womenCheck = document.getElementById("women");
const body = document.getElementsByTagName("body");

menCheck.addEventListener("change", function () {
    if (menCheck.checked) {
        womenCheck.checked = false;
    }
});

womenCheck.addEventListener("change", function () {
    if (womenCheck.checked) {
        menCheck.checked = false;
    }
});


// Main Carousel functionality
(function () {
    const slidesContainer = document.querySelector('.carousel .slides');
    const textSlidesContainer = document.querySelector('.carousel .text-slides');
    const slides = document.querySelectorAll('.carousel .slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
    const carousel = document.querySelector('.carousel');

    if (!slidesContainer || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;
    let isPaused = false;
    const slideCount = slides.length;
    const autoSlideDelay = 5000; // 5 seconds

    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        currentIndex = index;

        // Move slides
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (textSlidesContainer) {
            textSlidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, autoSlideDelay);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Pause on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startAutoSlide();
        }
    });

    // Initialize
    goToSlide(0);
    startAutoSlide();
})();


// fade crousel and range slider

const minSlider = document.getElementById("min");
const maxSlider = document.getElementById("max");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
const sliderRange = document.getElementById("slider-range");

function updateSlider() {
    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    if (minVal > maxVal - 500) {
        minSlider.value = maxVal - 500;
        minVal = maxVal - 0;
    }

    minValue.value = minVal;
    maxValue.value = maxVal;

    const rangeWidth = maxSlider.max;

    sliderRange.style.left = (minVal / rangeWidth) * 100 + "%";
    sliderRange.style.width = ((maxVal - minVal) / rangeWidth) * 100 + "%";
}

if (minSlider && maxSlider) {
    minSlider.addEventListener("input", updateSlider);
    maxSlider.addEventListener("input", updateSlider);
    updateSlider();
}

// Secondary Carousel functionality (for other pages)
const images = document.querySelectorAll('.crsl img');
const crslDots = document.querySelectorAll('.Img-tracker span');

if (images.length > 0 && crslDots.length > 0) {
    let crslCurrentIndex = 0;
    let crslAutoSlideInterval;

    function showCrslSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        crslDots.forEach(dot => dot.classList.remove('active'));

        images[index].classList.add('active');
        crslDots[index].classList.add('active');
        crslCurrentIndex = index;
    }

    function nextCrslSlide() {
        let next = (crslCurrentIndex + 1) % images.length;
        showCrslSlide(next);
    }

    function startCrslAutoSlide() {
        crslAutoSlideInterval = setInterval(nextCrslSlide, 3000);
    }

    function resetCrslAutoSlide() {
        clearInterval(crslAutoSlideInterval);
        startCrslAutoSlide();
    }

    crslDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCrslSlide(index);
            resetCrslAutoSlide();
        });
    });

    showCrslSlide(0);
    startCrslAutoSlide();
}


let checkbox = document.querySelectorAll('.category-list input[type="checkbox"]');
checkbox.forEach((box) => {
    box.checked = true;
});


// Shopping Cart Functionality
let cartItems = []; // Array to store cart items
let cartContainer = null; // Reference to cart container

// Function to create cart HTML
function createCartHTML() {
    const cartDiv = document.createElement('div');
    cartDiv.className = 'add-to-cart';
    cartDiv.innerHTML = `
        <form action="">
            <button type="button" id="close-toggle"><i class="fa-solid fa-xmark"></i></button>
            <ul class="cart-items">
            </ul>
            <div class="Total">
                Subtotal: $<span id="cart-total">0.00</span>
            </div>
        </form>
    `;
    return cartDiv;
}

// Function to calculate total
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

// Function to update cart UI
function updateCartUI() {
    if (!cartContainer) return;
    
    const cartList = cartContainer.querySelector('.cart-items');
    const totalSpan = cartContainer.querySelector('#cart-total');
    
    // Clear existing items
    cartList.innerHTML = '';
    
    // Add each item
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="itemName">
                <a href="#" class="cart-name">${item.name}</a>
                <input type="text" class="qty-input" data-index="${index}" placeholder="Qty." value="${item.quantity}">
                <button type="button" class="cancel-btn" data-index="${index}">cancel</button>
                <p style="display: inline-block;">$<span>${item.price.toFixed(2)}</span></p>
            </div>
            <div class="discount">Discount: $<span>0.00</span></div>
        `;
        cartList.appendChild(li);
    });
    
    // Update total
    totalSpan.textContent = calculateTotal();
    
    // Add event listeners for cancel buttons
    const cancelBtns = cartContainer.querySelectorAll('.cancel-btn');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(btn.dataset.index);
            cartItems.splice(index, 1);
            updateCartUI();
            
            // Hide cart if empty
            if (cartItems.length === 0) {
                cartContainer.style.display = 'none';
            }
        });
    });
    
    // Add event listeners for quantity inputs
    const qtyInputs = cartContainer.querySelectorAll('.qty-input');
    qtyInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(input.dataset.index);
            const newQty = parseInt(input.value) || 1;
            cartItems[index].quantity = newQty > 0 ? newQty : 1;
            updateCartUI();
        });
    });
}

// Function to add item to cart
function addToCart(name, price) {
    // Check if item already exists
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: name,
            price: parseFloat(price.replace('$', '')),
            quantity: 1
        });
    }
    
    // Create cart container if it doesn't exist
    if (!cartContainer) {
        cartContainer = createCartHTML();
        body[0].appendChild(cartContainer);
        
        // Add close button functionality
        const closeBtn = cartContainer.querySelector('#close-toggle');
        closeBtn.addEventListener('click', () => {
            cartContainer.style.display = 'none';
        });
    }
    
    // Show cart and update UI
    cartContainer.style.display = 'block';
    updateCartUI();
}

// Add to Cart button event listeners
let addToCartButtons = document.querySelectorAll('.CardsContainer  .AddToCart');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log('Add to Cart button clicked');
        
        let clickedItem = button.parentElement;
        let itemName = clickedItem.children[1].innerText;
        let itemPrice = clickedItem.children[2].children[0].innerText;
        
        console.log('Item Name:', itemName);
        console.log('Item Price:', itemPrice);
        
        addToCart(itemName, itemPrice);
    });
});