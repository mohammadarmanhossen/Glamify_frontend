const contact = () => {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        Swal.fire({
          title: "Login Required",
          text: "Please login to send a message.",
          icon: "warning",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./login.html";
          }
        });
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        Swal.fire({
          title: "Error!",
          text: "All fields are required.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const userData = {
        name: name,
        email: email,
        message: message,
        user: user_id,
      };

      console.log(userData);

      fetch("https://glamify-backend-ten.vercel.app/account/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server Response:", data);
          Swal.fire({
            title: "Success!",
            text: "Your message was successfully sent.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send message. Please try again.");
        });
    });
};

contact();

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = !answer.classList.contains("hidden");

    document.querySelectorAll(".faq-answer").forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    });

    if (!isOpen) {
      answer.classList.remove("hidden");
      setTimeout(() => {
        answer.classList.add("opacity-100");
        answer.classList.remove("opacity-0");
      }, 10);
    }
  });
});
