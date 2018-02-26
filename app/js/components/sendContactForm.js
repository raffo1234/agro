import { openModal } from './customModal';
import { validateForm } from './formValidation';

export function sendContactForm() {
  if (!$('.contact-form').length) return false;

  const form = $('.contact-form');
  const button = form.find(':submit');
  const formMessages = $('.form-messages');

  const afterValidate = () => {
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
  }

  validateForm(form, afterValidate);
}
