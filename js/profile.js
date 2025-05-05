
const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  fetch("https://glamify-backend-tp2c.onrender.com/account/user/")
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          const currentUser = data.find((item) => item.id === parseInt(user_id));
          const parent = document.getElementById("user_profile");

          const div = document.createElement("div");
          div.classList.add("user-all");
          div.innerHTML = `
          <div class="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="p-6 text-center">
                  <h1 class="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
                   <img src="/image/arman.jpg" class="border-4 border-black rounded-full mx-auto" alt="Profile Picture" style="width: 100px; height: 100px;">
                  <div class="mt-4 text-gray-700 space-y-2">
                      <h5 class="font-semibold">👤 Username: ${currentUser.username}</h5>
                      <h5>🧾 First Name: ${currentUser.first_name}</h5>
                      <h5>🧾 Last Name: ${currentUser.last_name}</h5>
                      <p>📧 ${currentUser.email}</p>
                  </div>
                  <a href="./change_password.html" class="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                      ✏️ Edit Profile
                  </a>
              </div>
          </div>
          `;

          parent.appendChild(div);
      });
};

userProfile();
