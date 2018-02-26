require('../scss/app.scss');

import { init } from './components/customModal';
import { customSlider }  from './components/customSlider';
import { sendContactForm } from './components/sendContactForm';
import { sendWorkWithUsForm } from './components/sendWorkWithUsForm';
import { addRegexValidation } from './components/formValidation';

document.addEventListener('DOMContentLoaded', (e) => {
  customSlider();
  sendContactForm();
  sendWorkWithUsForm();
  init();
  addRegexValidation();
});
