

const userProfile = () => {
  const user_id = localStorage.getItem("user_id");
  console.log("Logged-in User ID:", user_id);

  const parent = document.getElementById("user_profile");


  parent.innerHTML = `
    <div class="relative min-h-[300px]">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div class="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  `;

  fetch("https://glamify-backend-ten.vercel.app/account/user/")
    .then((res) => res.json())
    .then((data) => {
      const currentUser = data.find((item) => item.id === parseInt(user_id));
      parent.innerHTML = ""; // Clear spinner

      const div = document.createElement("div");
      div.innerHTML = `
        <section class="min-h-screen flex items-center justify-center bg-gradient-to-br py-10 px-4">
          <div class="shadow-2xl w-full max-w-4xl overflow-hidden">

            <!-- Header -->
            <div class="bg-gradient-to-r from-gray-900 to-gray-900 p-8 text-white text-center">
              <h1 class="text-2xl md:text-4xl font-extrabold">My Profile</h1>
              <p class="text-sm mt-2">Manage your personal information here</p>
            </div>

            <!-- Content -->
            <div class="p-10 grid md:grid-cols-2 gap-8">
              
              <!-- Profile Picture -->
              <div class="flex flex-col items-center justify-center">
                <img src="/image/arman.jpg" alt="Profile Picture" class="w-44 h-44 rounded-full border-4 border-gray-300 shadow-lg object-cover hover:scale-105 transition duration-300">
                <p class="mt-4 text-gray-600 font-medium">User ID: ${currentUser.id}</p>
              </div>

              <!-- Profile Info -->
              <div class="text-gray-700 space-y-4">
                <p><span class="font-semibold">👤 Username:</span> ${currentUser.username}</p>
                <p><span class="font-semibold">🧑 First Name:</span> ${currentUser.first_name}</p>
                <p><span class="font-semibold">👨‍🦱 Last Name:</span> ${currentUser.last_name}</p>
                <p><span class="font-semibold">📧 Email:</span> ${currentUser.email}</p>
              </div>
            </div>

            <!-- Footer / Button -->
            <div class="px-10 pb-10">
              <a href="./change_password.html" class="block text-center w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 transition duration-300">
                Edit Profile
              </a>
            </div>
          </div>
        </section>
      `;

      parent.appendChild(div);
    })
    .catch((error) => {
      parent.innerHTML = `<p class="text-red-500 text-center mt-10">Failed to load profile: ${error.message}</p>`;
      console.error("Failed to fetch user:", error);
    });
};

userProfile();
