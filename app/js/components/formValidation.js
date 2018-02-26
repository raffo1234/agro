import validation from 'jquery-validation';

function validateForm(formEl, callback) {
  formEl.validate({
    submitHandler: function(form) {
      callback();
    }
  });
}

function addRegexValidation() {
  $.validator.addMethod(
    'regex',
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    'Please check your input.'
  );
}

export { validateForm, addRegexValidation }
