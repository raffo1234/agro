require('../scss/app.scss');

const slider = () => {
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

const openModal = () => {
  const modalEle = $('.modal');
  modalEle.addClass('active')  ;
  $('body').addClass('modal-opened');
}

const closeModal = () => {
  const modalEle = $('.modal');
  modalEle.removeClass('active')  ;
  $('body').removeClass('modal-opened');
}

$('.modal-close').on('click', function() {
  closeModal();
});

const contact = () => {
  if (!$('.contact-form').length) return false;

  const form = $('.contact-form');
  const button = form.find(':submit');
  const formMessages = $('.form-messages');

  form.on("submit", function(e) {
    e.preventDefault();

    button.addClass('disabled');
    button.html('ENVIANDO...');

    $.ajax({
      type: 'post',
      url: 'contact.php',
      data: form.serialize()
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      formMessages.removeClass('error');
      formMessages.addClass('success');

      // Set the message text.
      formMessages.text(response);
      openModal();

      button.removeClass('disabled');
      button.html('ENVIAR AHORA');

      // Clear the form.
      form[0].reset();
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      formMessages.removeClass('success');
      formMessages.addClass('error');

      button.removeClass('disabled');
      button.html('ENVIAR AHORA');

      // Set the message text.
      if (data.responseText !== '') {
        formMessages.text(data.responseText);
      } else {
        formMessages.text('Ocurrio un error y tu mensaje no ha sido enviado.');
      }

      openModal();
    });
  })
}

const workWithUs = () => {
  if (!$('.work-with-us-form').length) return false;

  const form = $('.work-with-us-form');
  const button = form.find(':submit');
  const formMessages = $('.form-messages');

  form.on("submit", function(e) {
    e.preventDefault();

    button.addClass('disabled');
    button.html('ENVIANDO...');

    $.ajax({
      type: 'post',
      url: 'workwithus.php',
      data: form.serialize()
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      formMessages.removeClass('error');
      formMessages.addClass('success');

      button.removeClass('disabled');
      button.html('ENVIAR AHORA');

      // Set the message text.
      formMessages.text(response);
      openModal();

      // Clear the form.
      form[0].reset();
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      formMessages.removeClass('success');
      formMessages.addClass('error');

      button.removeClass('disabled');
      button.val('ENVIAR AHORA');

      // Set the message text.
      if (data.responseText !== '') {
        formMessages.text(data.responseText);
      } else {
        formMessages.text('Ocurrio un error y tu mensaje no ha sido enviado.');
      }

      openModal();
    });
  })
}

document.addEventListener('DOMContentLoaded', () => {
  slider();
  contact();
  workWithUs();
});
