
// const handleRegistration = (event) => {
//     event.preventDefault();
  
//     const username = document.getElementById("username").value;
//     const first_name = document.getElementById("firstname").value;  
//     const last_name = document.getElementById("lastname").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const confirm_password = document.getElementById("confirm_password").value;
  
//     const info = { username, first_name, last_name, email, password,confirm_password };

//     console.log(info);
//     const spinner = document.getElementById("registration-spinner");
  
//     if (password !== confirm_password) {
//         document.getElementById("error").innerText = "Password and confirm password do not match!";
//         return;
//     }
  
//     if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
//         document.getElementById("error").innerText = "Password must be at least 8 characters long, include a letter, a number, and a special character!";
//         return;
//     }
  
//     fetch("https://glamify-backend-ten.vercel.app/account/register/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(info),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//         Swal.fire({
//             title: 'Email Confirmed!',
//             text: 'Your email has been verified successfully. Please log in to continue.',
//             icon: 'success',
//             confirmButtonText: 'OK'
//         }).then(() => {
//             window.location.href = "login.html";
//         });
//     })
//     .catch(error => console.error('Error:', error));
//   };




const handleRegistration = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    const errorDiv = document.getElementById("error");
    const spinner = document.getElementById("registration-spinner");

    // Clear error
    errorDiv.innerText = "";

    // Show spinner
    spinner.classList.remove("hidden");

    // Validation
    if (password !== confirm_password) {
        spinner.classList.add("hidden"); // Hide spinner on error
        errorDiv.innerText = "❌ Passwords do not match!";
        return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        spinner.classList.add("hidden"); // Hide spinner on error
        errorDiv.innerText = "❌ Password must be 8+ characters with letters, numbers, and symbols!";
        return;
    }

    const info = { username, first_name, last_name, email, password, confirm_password };

    fetch("https://glamify-backend-ten.vercel.app/account/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => {
            spinner.classList.add("hidden"); // Hide spinner after success
            console.log(data);

            Swal.fire({
                title: 'Email Confirmed!',
                text: 'Please login now.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "login.html";
            });
        })
        .catch((error) => {
            spinner.classList.add("hidden"); // Hide spinner on error
            console.error("Error:", error);
            errorDiv.innerText = "❌ Registration failed. Please try again!";
        });
};
