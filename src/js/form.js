const $form = document.querySelector(".form");
const $submitFormButton = document.querySelector(".js-submitButton");

init();

function init() {
  $form.addEventListener("submit", onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();

  const { name, subject, email, description } = Object.fromEntries(
    new FormData($form).entries()
  );

  const templateParams = {
    name,
    subject,
    email,
    description,
  };

  sendMessage(templateParams);
}

function sendMessage(config) {
  emailjs
    .send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, config)
    .then((response) => {
      if (response.status === 200) {
        showSuccessModal();
      }
    })
    .catch((error) => showErrorModal(error));
}

function showSuccessModal() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Email has been sent",
    showConfirmButton: false,
    timer: 2000,
    color: "#2c2323",
  });
}

function showErrorModal(error) {
  Swal.fire({
    icon: "error",
    title: "Email has not been sent",
    text: `${
      error.text ? error.text : "Something went wront, please send it again"
    }`,
    confirmButtonColor: "crimson",
  });
}
