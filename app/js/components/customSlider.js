export function customSlider() {
  if (!$('.slider').length) return false;

  const slides = document.querySelectorAll('.slider ul li');
  const next = document.querySelectorAll('.next');
  let currentSlide = 0;

  const goToSlide = (n) => {
    slides[currentSlide].className = '';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'active';
  }

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  }

  const slideInterval = setInterval(nextSlide, 4000);

  const pauseSlideShow = () => {
    clearInterval(slideInterval);
  }

  for(var i = 0; i < next.length; i++) {
    next[i].addEventListener('click', function(event) {
      pauseSlideShow();
      nextSlide();
    });
  }
}
