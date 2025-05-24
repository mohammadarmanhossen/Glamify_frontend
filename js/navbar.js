
const user_id = localStorage.getItem("user_id")
const navbar = () => {
  const navbar = document.getElementById("navbarElement");
  if (user_id) {
      navbar.innerHTML = `
          <a href="/cart.html" class="inline-flex items-center gap-2  bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
              <img src="image/cart.svg" alt="Cart Icon" class="w-6 h-6">
              <span>Cart</span>
          </a>
          <div class="relative inline-block text-left">
              <button class="dropdownButton flex items-center gap-2   bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
                  <img src="image/account.svg" alt="Account Icon" class="w-6 h-6">
                  <span>Account</span>
              </button>
              <div class="dropdownMenu hidden absolute right-0 mt-2 w-40 bg-gray-300 border border-gray-200 rounded-lg shadow-lg z-50">
                  <a href="/profile.html" class=" text-center block px-4 py-2 text-gray-900  font-bold hover:text-green-700 transition">Profile</a>
                  <a href="/order.html" class=" text-center block px-4 py-2 text-gray-900  font-bold  hover:text-green-700 transition">Order</a>
                  <form onsubmit="handleLogout(event)">
                      <button type="submit" class="w-full text-center px-4 py-2 text-gray-900 font-bold hover:text-green-700  transition">Logout</button>
                  </form>
              </div>
          </div>

      `;
  } else {
      navbar.innerHTML = `
          <a href="login.html" class="inline-flex items-center gap-2  bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
            
              <span>Login</span>
          </a>
          <a href="register.html" class="inline-flex items-center gap-2   bg-gray-300 hover:bg-gray-400  text-black font-semibold  px-6 py-2 rounded-3xl shadow">
             
              <span>Sing up</span>
          </a>
      `;
  }
};



const mobilenavbar = () => {
  const mobilenav = document.getElementById("mobileNavbarElement");
  if (user_id) {
      mobilenav.innerHTML = `
            <a href="/cart.html" class="inline-flex items-center gap-2  bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
              <img src="image/cart.svg" alt="Cart Icon" class="w-6 h-6">
              <span>Cart</span>
          </a>
          <div class="relative inline-block text-left">
              <button class="dropdownButton flex items-center gap-2   bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
                  <img src="image/account.svg" alt="Account Icon" class="w-6 h-6">
                  <span>Account</span>
              </button>
              <div class="dropdownMenu hidden absolute right-0 mt-2 w-40 bg-gray-300 border border-gray-200 rounded-lg shadow-lg z-50">
                  <a href="/profile.html" class=" text-center block px-4 py-2 text-gray-900  font-bold hover:text-green-700 transition">Profile</a>
                  <a href="/order.html" class=" text-center block px-4 py-2 text-gray-900  font-bold  hover:text-green-700 transition">Order</a>
                  <form onsubmit="handleLogout(event)">
                      <button type="submit" class="w-full text-center px-4 py-2 text-gray-900 font-bold hover:text-green-700  transition">Logout</button>
                  </form>
              </div>
          </div>
      `;
  } else {
      mobilenav.innerHTML = `
             <a href="login.html" class="inline-flex items-center gap-2  bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-3xl shadow">
            
              <span>Login</span>
          </a>
          <a href="register.html" class="inline-flex items-center gap-2   bg-gray-300 hover:bg-gray-400  text-black font-semibold  px-6 py-2 rounded-3xl shadow">
             
              <span>Sing up</span>
          </a>
      `;
  }
};

navbar();
mobilenavbar();


// Handle dropdown toggling
document.addEventListener('click', function (e) {
  if (e.target.closest('.dropdownButton')) {
      const dropdown = e.target.closest('.relative').querySelector('.dropdownMenu');
      dropdown.classList.toggle('hidden');
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

