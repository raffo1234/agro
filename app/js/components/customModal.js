function openModal() {
  const modalEle = $('.modal');
  modalEle.addClass('active')  ;
  $('body').addClass('modal-opened');
}

function closeModal() {
  const modalEle = $('.modal');
  modalEle.removeClass('active');
  $('body').removeClass('modal-opened');
}

function init() {
  $('.modal-close').on('click', () => {
    closeModal();
  });
}

export { init, openModal, closeModal };
