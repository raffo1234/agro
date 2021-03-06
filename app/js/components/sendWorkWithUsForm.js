import { openModal } from './customModal';
import { validateForm } from './formValidation';

export function sendWorkWithUsForm() {
  if (!$('.work-with-us-form').length) return false;

  const form = $('.work-with-us-form');
  const button = form.find(':submit');
  const formMessages = $('.form-messages');

  const afterValidate = () => {
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
  }

  validateForm(form, afterValidate);
}
