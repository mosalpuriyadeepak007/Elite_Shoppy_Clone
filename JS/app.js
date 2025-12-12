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

    minValue.value = "$ "+minVal;
    maxValue.value = "$ "+maxVal;

    const rangeWidth = maxSlider.max;

    sliderRange.style.left = (minVal / rangeWidth) * 100 + "%";
    sliderRange.style.width = ((maxVal - minVal) / rangeWidth) * 100 + "%";
}

minSlider.addEventListener("input", updateSlider);
maxSlider.addEventListener("input", updateSlider);

updateSlider();