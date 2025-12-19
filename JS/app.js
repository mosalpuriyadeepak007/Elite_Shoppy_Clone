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
(function() {
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