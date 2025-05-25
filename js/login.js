
const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("username").value;
  const password = getValue("password").value;
  const spinner = document.getElementById("login-spinner");

  if (username && password) {

    spinner.innerHTML = `
    <div class="relative min-h-[100px]">
         <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-6 h-6 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
    </div>
    `;

    const admindata = { username, password };

    fetch("https://glamify-backend-ten.vercel.app/account/admin/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admindata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("admin_id", data.admin_id);

          Swal.fire({
            title: "Success!",
            text: "Admin logged in successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href =
              "https://glamify-frontend.vercel.app/admin_dashbord.html";
          });
        } else {
          const userdata = { username, password };

          spinner.innerHTML = `
            <div class="relative min-h-[100px]">
                 <div class="absolute inset-0 flex items-center justify-center">
                   <div class="w-6 h-6 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                 </div>
             </div> 
          `;

          fetch("https://glamify-backend-ten.vercel.app/account/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);

                Swal.fire({
                  title: "Success!",
                  text: "Your Account has been logged in successfully.",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(() => {
                  window.location.href =
                    "https://glamify-frontend.vercel.app/index.html";
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Invalid credentials.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: "There was a problem with the login request.",
                icon: "error",
                confirmButtonText: "OK",
              });
              console.error("Error during user login:", error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem with the login request.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
 
        spinner.innerHTML = "";
      });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Please enter both username and password.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};




const showSpinner = () => {
  const spinner = document.getElementById("logout-spinner");
  if (spinner) {
    spinner.innerHTML = `
      <div class="relative min-h-[100px]">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-6 h-6 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    `;
  }
};

const hideSpinner = () => {
  const spinner = document.getElementById("logout-spinner");
  if (spinner) {
    spinner.innerHTML = "";
  }
};

const handleLogout = (event) => {
  event.preventDefault();
  showSpinner();

  const token = localStorage.getItem("token");

  fetch("https://glamify-backend-ten.vercel.app/account/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      Swal.fire({
        title: "Success!",
        text: "Your account has been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      console.error("Logout error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during logout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    })
    .finally(() => {
      hideSpinner();
    });
};

const adminLogout = (event) => {
  event.preventDefault();
  showSpinner();

  const token = localStorage.getItem("token");

  fetch("https://glamify-backend-ten.vercel.app/account/admin/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      Swal.fire({
        title: "Success!",
        text: "Your account has been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      console.error("Logout error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during logout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    })
    .finally(() => {
      hideSpinner();
    });
};


const getValue = (id) => {
  const value = document.getElementById(id);
  return value;
};
