document.addEventListener('DOMContentLoaded', e => {
  const inputEmail = document.querySelector("#email");
  const inputDestinatario = document.querySelector("#destinatario");
  const inputSubject = document.querySelector("#asunto");
  const inputMessage = document.querySelector("#mensaje");
  const form = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#formulario button[type='submit']");
  const btnReset = document.querySelector("#formulario button[type='reset']");
  const spinner = document.querySelector("#spinner");

  const email = {
    email: '',
    destinatario: '',
    asunto: '',
    mensaje: '',
  }

  inputEmail.addEventListener("input", e => {
    validate(e);
  });

  inputDestinatario.addEventListener("input", e => {
    validate(e);
  });

  inputSubject.addEventListener("input", e => {
    validate(e);
  });

  inputMessage.addEventListener("input", e => {
    validate(e);
  });

  btnReset.addEventListener('click', e => {
    e.preventDefault();

    resetForm();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    sendEmail();
  });

  const validate = (e) => {
    if (e.target.id !== 'destinatario' && e.target.value.trim() === '') {
      showAlert(`The input ${e.target.id} is required!`, e.target.parentElement);
      email[e.target.name] = '';
      checkEmailObj();
      return;
    }

    if (e.target.id === 'email' && !validateEmail(e.target.value)) {
      showAlert(`This isn't a valid email`, e.target.parentElement);
      email[e.target.name] = '';
      checkEmailObj();
      return;
    }

    if (e.target.id === 'destinatario' && !validateEmail(e.target.value)) {
      showAlert(`This isn't a valid email`, e.target.parentElement);
      email[e.target.name] = '';
      checkEmailObj();
      return;
    }

    clearAlert(e.target.parentElement);

    // Save values
    email[e.target.name] = e.target.value.trim().toLowerCase();

    checkEmailObj();
  }

  const showAlert = (msg, ref) => {

    // Limpia las alertas que existen
    clearAlert(ref);

    // Crea una nueva alerta
    const errorElement = document.createElement("p");
    errorElement.textContent = msg;
    errorElement.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    ref.appendChild(errorElement);
  }

  const clearAlert = (ref) => {
    // comprueba que existan alertas en el elemento wrapper de los inputs
    const alert = ref.querySelector('.bg-red-600');
    if (alert) {
      alert.remove();
    }
  }

  const validateEmail = (email) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const response = regex.test(email);
    return response;
  }

  const checkEmailObj = () => {

    const mandatoryFields = ["destinatario", "asunto", "mensaje"];

    if (mandatoryFields.some(field => email[field] === '')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  const resetForm = () => {
    email.email = '';
    email.destinatario = '';
    email.asunto = '';
    email.mensaje = '';

    form.reset();
    checkEmailObj();
  }

  const sendEmail = () => {
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');


    setTimeout(() => {
      spinner.classList.add('hidden');
      spinner.classList.remove('flex');
      resetForm();

      // create a success alert when send email
      const alertSucces = document.createElement('P');
      alertSucces.classList.add('bg-green-500', 'text-center', 'text-white', 'p-2', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertSucces.textContent = "Email send successfully!";
      form.appendChild(alertSucces);

      setTimeout(() => {
        alertSucces.remove();
      }, 3000)
    }, 3000)
  }
});