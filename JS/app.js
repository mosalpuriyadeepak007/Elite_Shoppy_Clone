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

    minSlider.addEventListener("input", updateSlider);
    maxSlider.addEventListener("input", updateSlider);

    updateSlider();

    // Carousel functionality
    const images = document.querySelectorAll('.crsl img');
    const dots = document.querySelectorAll('.Img-tracker span');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
      // Remove active class from all
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to current
      images[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextSlide() {
      let next = (currentIndex + 1) % images.length;
      showSlide(next);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
      });
    });

    // Initialize
    showSlide(0);
    startAutoSlide();


    let checkbox = document.querySelectorAll('.category-list input[type="checkbox"]');
    checkbox.forEach((box) => {
        box.checked = true;
    });