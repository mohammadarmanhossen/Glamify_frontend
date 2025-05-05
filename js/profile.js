// const userProfile = () => {
//   const user_id = localStorage.getItem("user_id");
//   console.log("Logged-in User ID:", user_id);

//   fetch("https://glamify-backend-tp2c.onrender.com/account/user/")
//       .then((res) => res.json())
//       .then((data) => {
//           console.log(data);
//           const currentUser = data.find((item) => item.id === parseInt(user_id));
//           const parent = document.getElementById("user_profile");

//           const div = document.createElement("div");
//           div.classList.add("user-all");
//           div.innerHTML = `
//           <div class="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//               <div class="p-6 text-center">
//                   <h1 class="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
//                    <img src="/image/arman.jpg" class="border-4 border-black rounded-full mx-auto" alt="Profile Picture" style="width: 100px; height: 100px;">
//                   <div class="mt-4 text-gray-700 space-y-2">
//                       <h5 class="font-semibold">👤 Username: ${currentUser.username}</h5>
//                       <h5>🧾 First Name: ${currentUser.first_name}</h5>
//                       <h5>🧾 Last Name: ${currentUser.last_name}</h5>
//                       <p>📧 ${currentUser.email}</p>
//                   </div>
//                   <a href="./change_password.html" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
//                       ✏️ Edit Profile
//                   </a>
//               </div>
//           </div>
//           `;

//           parent.appendChild(div);
//       });
// };

// userProfile();

// const userProfile = () => {
//     const user_id = localStorage.getItem("user_id");
//     console.log("Logged-in User ID:", user_id);

//     fetch("https://glamify-backend-tp2c.onrender.com/account/user/")
//       .then((res) => res.json())
//       .then((data) => {
//         const currentUser = data.find((item) => item.id === parseInt(user_id));
//         const parent = document.getElementById("user_profile");
//         parent.innerHTML = ""; // Clear existing content if any

//         const div = document.createElement("div");
//         div.classList.add("flex", "justify-center", "items-center", "min-h-screen", "bg-gradient-to-r", "from-blue-100", "to-purple-100", "p-4");

//         div.innerHTML = `
//         <div class="w-full md:w-3/5 bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
//           <div class="text-center">
//             <img src="/image/arman.jpg" class="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-md" alt="Profile Picture">
//             <h2 class="text-3xl font-bold text-gray-800 mt-4">${currentUser.username}</h2>
//             <p class="text-gray-500 text-sm mb-6">${currentUser.email}</p>
//           </div>

//           <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mt-4 px-4">
//             <div>
//               <h5 class="font-semibold text-lg">👤 First Name:</h5>
//               <p class="text-base">${currentUser.first_name}</p>
//             </div>
//             <div>
//               <h5 class="font-semibold text-lg">👤 Last Name:</h5>
//               <p class="text-base">${currentUser.last_name}</p>
//             </div>
//           </div>

//           <div class="text-center mt-8">
//             <a href="./change_password.html" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
//               ✏️ Edit Profile
//             </a>
//           </div>
//         </div>
//         `;

//         parent.appendChild(div);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch user:", error);
//       });
//   };

//   userProfile();

const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  fetch("https://glamify-backend-tp2c.onrender.com/account/user/")
    .then((res) => res.json())
    .then((data) => {
      const currentUser = data.find((item) => item.id === parseInt(user_id));
      const parent = document.getElementById("user_profile");
      parent.innerHTML = "";

      const div = document.createElement("div");
      div.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "min-h-screen",
        "bg-gradient-to-r",
        "from-blue-100",
        "to-purple-100",
        "p-4"
      );

      div.innerHTML = `
<div class="full-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 w-full">
  <div class="bg-white rounded-2xl shadow-xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-8">
    <div class="flex flex-col md:flex-row items-center md:items-start">
        <img src="/image/arman.jpg" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-white shadow-md">
      <div class="md:ml-6 mt-4 md:mt-0 text-center md:text-left p-10">  

        <p class="text-xl font-bold text-gray-800 pt-5">Username: ${currentUser.username}</p>
        <p class="text-xl font-bold text-gray-800 pt-5">First Name: ${currentUser.first_name}</p>
        <p class="text-xl font-bold text-gray-800 pt-5">Last Name: ${currentUser.last_name}</p>
        <p class="text-xl font-bold text-gray-800 pt-5">Email: ${currentUser.email}</p>

        <div class="mt-6 pt-5">
          <a href="./change_password.html" class="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition text-lg">✏️ Edit Profile</a>
        </div>
      </div>
    </div>
  </div>
</div>

        `;

      parent.appendChild(div);
    })
    .catch((error) => {
      console.error("Failed to fetch user:", error);
    });
};

userProfile();
