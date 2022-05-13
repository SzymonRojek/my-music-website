import emailjs from "@emailjs/browser";

export function sendMessage(configParams) {
  const $form = document.querySelector(".form");
  const { SERVICE_ID, TEMPLATE_ID, USER_ID } = process.env;

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, configParams, USER_ID)
    .then((response) => {
      if (response.status === 200) {
        showSuccessModal();
        $form.reset();
      }
    })
    .catch((error) => showErrorModal(error));
}

export function showSuccessModal() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your  message has been sent",
    text: "I will respond soon 👋",
    timer: 3000,
    color: "#2c2323",
    confirmButtonColor: "green",
  });
}

export function showErrorModal(error) {
  Swal.fire({
    icon: "error",
    title: "Email has not been sent 😕",
    text: `${
      error.text ? error.text : "Something went wront, please send it again"
    }`,
    confirmButtonColor: "crimson",
  });
}
