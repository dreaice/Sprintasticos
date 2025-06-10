$(document).ready(function () {
  // Funcionalidad original del botón "Ver detalle"
  $(".boton-enviar").click(function () {
    $(this).siblings(".card-text").toggleClass("text-ajustar");
  });

  // CARRUSEL FUNCTIONALITY
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let slidesToShow = getSlidesToShow();
  let isTransitioning = false;
  let autoPlayInterval;

  // Función para determinar cuántas tarjetas mostrar según el tamaño de pantalla
  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  // Función para obtener el ancho de una slide
  function getSlideWidth() {
    return slides[0].offsetWidth + 24; // incluye el gap
  }

  // Función para crear indicadores
  function createIndicators() {
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = '';
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / slidesToShow);

    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToPage(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Función para actualizar indicadores
  function updateIndicators() {
    if (!indicatorsContainer) return;

    const indicators = document.querySelectorAll('.carousel-indicator');
    const currentPage = Math.floor(currentIndex / slidesToShow);

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentPage);
    });
  }

  // Función para mover el carrusel
  function moveCarousel(animate = true) {
    if (!track) return;

    const slideWidth = getSlideWidth();
    const offset = slideWidth * currentIndex;

    if (animate) {
      track.style.transition = 'transform 3s ease-in-out';
    } else {
      track.style.transition = 'none';
    }

    track.style.transform = `translateX(-${offset}px)`;
    updateIndicators();
  }

  // Función para ir a una página específica
  function goToPage(pageIndex) {
    if (isTransitioning) return;

    const newIndex = pageIndex * slidesToShow;
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
      currentIndex = newIndex;
      moveCarousel();
    }
  }

  // Función para ir a la siguiente slide
  function nextSlide() {
    if (isTransitioning || !slides.length) return;

    isTransitioning = true;

    // Avanzar por el número de slides que se muestran
    currentIndex += slidesToShow;

    // Si llegamos al final, detener el carrusel y reiniciar después de una pausa
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    moveCarousel();

    setTimeout(() => {
      isTransitioning = false;
    }, 3000);
  }

  // Función para ir a la slide anterior
  function prevSlide() {
    if (isTransitioning || !slides.length) return;

    isTransitioning = true;

    // Retroceder por el número de slides que se muestran
    currentIndex -= slidesToShow;

    // Si llegamos antes del inicio, ir al final
    if (currentIndex < 0) {
      currentIndex = Math.max(0, slides.length - slidesToShow);
    }

    moveCarousel();

    setTimeout(() => {
      isTransitioning = false;
    }, 3000);
  }

  // Función para inicializar el autoplay
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 6000);
  }

  // Función para pausar el autoplay
  function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners para los botones
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoPlay();
      nextSlide();
      setTimeout(startAutoPlay, 1000);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoPlay();
      prevSlide();
      setTimeout(startAutoPlay, 1000);
    });
  }

  // Pausar autoplay cuando el mouse está sobre el carrusel
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', pauseAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      pauseAutoPlay();
      prevSlide();
      setTimeout(startAutoPlay, 1000);
    } else if (e.key === 'ArrowRight') {
      pauseAutoPlay();
      nextSlide();
      setTimeout(startAutoPlay, 1000);
    }
  });

  // Soporte para touch/swipe en dispositivos móviles
  let startX = 0;
  let endX = 0;
  let startY = 0;
  let endY = 0;

  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      pauseAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      // Solo actuar si el swipe es más horizontal que vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      setTimeout(startAutoPlay, 1000);
    }, { passive: true });
  }

  // Responsive: Recalcular cuando cambie el tamaño de la ventana
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesToShow = getSlidesToShow();
      if (newSlidesToShow !== slidesToShow) {
        slidesToShow = newSlidesToShow;
        currentIndex = 0;
        createIndicators();
        moveCarousel(false);
      }
    }, 250);
  });

  // Inicializar el carrusel
  function initCarousel() {
    if (slides.length > 0) {
      createIndicators();
      moveCarousel(false);

      // Iniciar autoplay después de un pequeño delay
      setTimeout(() => {
        startAutoPlay();
      }, 2000);
    }
  }

  // Inicializar cuando todo esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    setTimeout(initCarousel, 100);
  }

  // Intersection Observer para mejorar el rendimiento
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    slides.forEach(slide => {
      observer.observe(slide);
    });
  }
});