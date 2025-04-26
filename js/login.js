
// const handleLogin = (event) => {
//   event.preventDefault();

//   const username = getValue("username").value;
//   const password = getValue("password").value;

 
//   if (username && password) {
//     const admindata = {
//       username: username,
//       password: password,
//     };
//   console.log(admindata);

//     fetch("https://glamify-backend-tp2c.onrender.com/admin/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(admindata) 
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.token) {
  
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("admin_id", data.admin_id);

//         Swal.fire({
//           title: 'Success!',
//           text: 'Admin logged in successfully.',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           window.location.href = "http://127.0.0.1:5500/admin_dashbord.html"; 
//         });
//       } 


//       else {
//         const userdata = {
//           username: username,
//           password: password
//         };
//         console.log(userdata);

//         fetch("https://glamify-backend-tp2c.onrender.com/account/login/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(userdata)
//         })
//         .then(res => res.json())
//         .then(data => {
//           if (data.token && data.user_id) {
      
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user_id", data.user_id);

//             Swal.fire({
//               title: 'Success!',
//               text: 'Your Account has been logged in successfully.',
//               icon: 'success',
//               confirmButtonText: 'OK'
//             }).then(() => {
//               window.location.href = "home.html";
//             });
//           } else {
  
//             Swal.fire({
//               title: 'Error!',
//               text: 'Invalid credentials.',
//               icon: 'error',
//               confirmButtonText: 'OK'
//             });
//           }
//         })
//         .catch(error => {
//           Swal.fire({
//             title: 'Error!',
//             text: 'There was a problem with the login request.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//           console.error("Error during user login:", error);
//         });
//       }
//     })
//     .catch(error => {
//       console.error(error); 
    
//       Swal.fire({
//         title: 'Error!',
//         text: 'There was a problem with the login request.',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       });
//     });
    
//   } else {
//     Swal.fire({
//       title: 'Error!',
//       text: 'Please enter both username and password.',
//       icon: 'error',
//       confirmButtonText: 'OK'
//     });
//   }
// };




// const handleLogout = (event) => {
//   event.preventDefault();

//   console.log("Logging out...");
//   const token = localStorage.getItem("token");
//   console.log(token);
//   fetch("https://glamify-backend-tp2c.onrender.com/account/logout/", {
//     method: "GET",
//     headers: {
//       Authorization: `Token ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Logout successful", data);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_id");

//       Swal.fire({
//         title: "Success!",
//         text: "Your account has been successfully logged out.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         window.location.href = "login.html";
//       });
//     });
// };

// const adminLogout = (event) => {
//   event.preventDefault();

//   console.log("Logging out...");
//   const token = localStorage.getItem("token");
//   console.log(token);
//   fetch("https://glamify-backend-tp2c.onrender.com/admin/logout/", {
//     method: "GET",
//     headers: {
//       Authorization: `Token ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Logout successful", data);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_id");

//       Swal.fire({
//         title: "Success!",
//         text: "Your account has been successfully logged out.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         window.location.href = "login.html";
//       });
//     });
// };

// const getValue = (id) => {
//   const value = document.getElementById(id);
//   return value;
// };










const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("username").value;
  const password = getValue("password").value;

  if (username && password) {
    const loginData = { username, password };

    // Try Admin Login
    fetch("https://glamify-backend-tp2c.onrender.com/admin/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Admin Login Success
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin_id", data.admin_id);
        window.location.href = "admin_dashboard.html";
      } else {
        // If Admin Login fails, try User Login
        fetch("https://glamify-backend-tp2c.onrender.com/account/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            // User Login Success
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "home.html";
          } else {
            alert('Invalid credentials.');
          }
        })
        .catch(() => alert('Error logging in.'));
      }
    })
    .catch(() => alert('Error logging in.'));
  } else {
    alert('Please enter both username and password.');
  }
};
















const handleLogout = (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin_id") ? true : false;
  
  // Determine API based on role (admin or user)
  const logoutUrl = isAdmin 
    ? "https://glamify-backend-tp2c.onrender.com/admin/logout/"
    : "https://glamify-backend-tp2c.onrender.com/account/logout/";

  fetch(logoutUrl, {
    method: "GET",
    headers: { Authorization: `Token ${token}` },
  })
  .then(() => {
    localStorage.removeItem("token");
    localStorage.removeItem(isAdmin ? "admin_id" : "user_id");
    window.location.href = "login.html";
  })
  .catch(() => alert('Error logging out.'));
};



const getValue = (id) => document.getElementById(id).value;



























// const handleLogin = (event) => {
//   event.preventDefault();

//   const username = getValue("username").value;
//   const password = getValue("password").value;

//   const userdata = {
//     username: username,
//     password: password
//   };

//   console.log(userdata);

//   fetch("https://glamify-backend-tp2c.onrender.com/account/login/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(userdata)
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.token && data.user_id) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user_id", data.user_id);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Your Account has been logged in successfully.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         window.location.href = "home.html";
//       });
//     } 
//   });
// };




// const handleLogout = (event) => {
//   event.preventDefault();

//   console.log("Logging out...");
//   const token = localStorage.getItem("token");
//   console.log(token);

//   fetch("https://glamify-backend-tp2c.onrender.com/account/logout/", {
//     method: "GET",
//     headers: {
//       Authorization: `Token ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Logout successful", data);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_id");

//       Swal.fire({
//         title: "Success!",
//         text: "Your account has been successfully logged out.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         window.location.href = "login.html";
//       });
//     });
// };


// const getValue = (id) => {
//   const value = document.getElementById(id);
//   return value;
// };








