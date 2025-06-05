document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicatorsContainer = document.getElementById("carouselIndicators");
  const slides = Array.from(track.children);

  let currentIndex = 0;

  const getSlidesPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  };

  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width + 16; // incluyendo gap
    const slidesPerView = getSlidesPerView();
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateIndicators(slidesPerView);
  };

  const updateIndicators = (slidesPerView) => {
    Array.from(indicatorsContainer.children).forEach((btn, index) => {
      btn.classList.toggle("active", index === Math.floor(currentIndex / slidesPerView));
    });
  };

  const createIndicators = () => {
    const slidesPerView = getSlidesPerView();
    const pages = Math.ceil(slides.length / slidesPerView);
    indicatorsContainer.innerHTML = "";

    for (let i = 0; i < pages; i++) {
      const btn = document.createElement("button");
      if (i === 0) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentIndex = i * slidesPerView;
        updateCarousel();
      });
      indicatorsContainer.appendChild(btn);
    }
  };

  prevBtn.addEventListener("click", () => {
    const slidesPerView = getSlidesPerView();
    currentIndex = Math.max(0, currentIndex - slidesPerView);
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    const slidesPerView = getSlidesPerView();
    const maxIndex = slides.length - slidesPerView;
    currentIndex = Math.min(currentIndex + slidesPerView, maxIndex);
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    createIndicators();
    updateCarousel();
  });

  createIndicators();
  updateCarousel();
});