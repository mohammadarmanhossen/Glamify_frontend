

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

      div.innerHTML = `
<div class="min-h-screen flex items-center justify-center p-6">
  <div class="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl p-8">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
      
      <!-- Profile Image -->
      <img src="/image/arman.jpg" alt="Profile Picture" class="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover">

      <!-- Profile Info -->
      <div class="text-center md:text-left flex-1">
        <h2 class="text-2xl font-bold text-white mb-4">User Profile</h2>
        
        <p class="text-lg font-medium text-gray-300">👤 Username: <span class="font-semibold text-gray-300">${currentUser.username}</span></p>
        <p class="text-lg font-medium text-gray-300">🧑 First Name: <span class="font-semibold text-gray-300">${currentUser.first_name}</span></p>
        <p class="text-lg font-medium text-gray-300">👨‍🦱 Last Name: <span class="font-semibold text-gray-300">${currentUser.last_name}</span></p>
        <p class="text-lg font-medium text-gray-300">📧 Email: <span class="font-semibold text-gray-300">${currentUser.email}</span></p>

        <!-- Button -->
        <div class="mt-6">
          <a href="./change_password.html" class="inline-block bg-amber-700 text-black font-bold px-6 py-3 rounded-lg  transition">✏️ Edit Profile</a>
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
