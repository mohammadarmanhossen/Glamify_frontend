
const getValue = (id) => {
  return document.getElementById(id);
};


const showLoginSpinner = () => {
  const spinner = document.getElementById("login-spinner");
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

const hideLoginSpinner = () => {
  const spinner = document.getElementById("login-spinner");
  if (spinner) {
    spinner.innerHTML = "";
  }
};


const showLogoutSpinner = () => {
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

const hideLogoutSpinner = () => {
  const spinner = document.getElementById("logout-spinner");
  if (spinner) {
    spinner.innerHTML = "";
  }
};


const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("username").value;
  const password = getValue("password").value;

  if (username && password) {
    showLoginSpinner();

    const admindata = { username, password };


    fetch("https://glamify-backend-ten.vercel.app/account/admin/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admindata),
    })
      .then((res) => res.json())
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
            window.location.href = "admin_dashbord.html";
          });
        } else {
   
          const userdata = { username, password };
          showLoginSpinner();

          return fetch(
            "https://glamify-backend-ten.vercel.app/account/login/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userdata),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);

                Swal.fire({
                  title: "Success!",
                  text: "Your account has been logged in successfully.",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(() => {
                  window.location.href = "index.html";
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Invalid credentials.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem with the login request.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        hideLoginSpinner();
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



const handleLogout = (event) => {
  event.preventDefault();
  showLogoutSpinner();

  const token = localStorage.getItem("token");

  fetch("https://glamify-backend-ten.vercel.app/account/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      Swal.fire({
        title: "Success!",
        text: "You have been successfully logged out.",
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
      hideLogoutSpinner();
    });
};

const adminLogout = (event) => {
  event.preventDefault();
  showLogoutSpinner();

  const token = localStorage.getItem("token");

  fetch("https://glamify-backend-ten.vercel.app/account/admin/logout/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin_id");

      Swal.fire({
        title: "Success!",
        text: "Admin has been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      console.error("Admin logout error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during logout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    })
    .finally(() => {
      hideLogoutSpinner();
    });
};
