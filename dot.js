const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dotsContainer = document.getElementById("dotsContainer");

const slidesPerView = 3;
const totalGroups = Math.ceil(slides.length / slidesPerView);
let currentIndex = 0;

// Buat dot navigation
for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    const groupWidth = slideWidth * slidesPerView;
    track.style.transform = `translateX(-${currentIndex * groupWidth}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalGroups;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

setInterval(nextSlide, 6000);
