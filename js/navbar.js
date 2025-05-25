const user_id = localStorage.getItem("user_id");
const navbar = () => {
  const navbar = document.getElementById("navbarElement");
  if (user_id) {
    navbar.innerHTML = `
        <a href="/cart.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200">
           <img src="image/cart.svg" alt="Cart Icon" class="w-5 h-5">
            <span>Cart</span>
         </a>

          <div class="relative inline-block text-left px-3">
              <button class="dropdownButton inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200 ">
                  <img src="image/account.svg" alt="Account Icon" class="w-5 h-5">
                  <span>Account</span>
              </button>
            
         <div class="dropdownMenu hidden absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded text-center shadow-lg z-50 divide-y divide-gray-100">

            <a href="/profile.html" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
             👤 Profile
            </a>

             <a href="/order.html" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
              <img src="image/cart.svg" alt="Cart Icon" class="w-5 h-5"> Order
             </a>

          <form onsubmit="handleLogout(event)">
             <button type="submit" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
              <img src="image/logout.svg" alt="Signup Icon" class="w-4 h-4">Logout
            </button>
           </form>
  
        </div>

      `;
  } else {
    navbar.innerHTML = `
      <div class="flex items-center gap-4">
        <a href="login.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200">
         <img src="image/logout.svg" alt="Login Icon" class="w-5 h-5">
          <span>Login</span>
        </a>
  
       <a href="register.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200">
         <img src="image/logout.svg" alt="Signup Icon" class="w-5 h-5">
          <span>Sign up</span>
         </a>
      </div>


      `;
  }
};

const mobilenavbar = () => {
  const mobilenav = document.getElementById("mobileNavbarElement");
  if (user_id) {
    mobilenav.innerHTML = `
            <a href="/cart.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100">
              <img src="image/cart.svg" alt="Cart Icon" class="w-5 h-5">
              <span>Cart</span>
          </a>
          <div class="relative inline-block text-left">
              <button class="dropdownButton flex items-center gap-2  border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 ">
                  <img src="image/account.svg" alt="Account Icon" class="w-5 h-5">
                  <span>Account</span>
              </button>
          <div class="dropdownMenu hidden absolute right-0 mt-2 w-40  border border-gray-200  rounded z-50">
                  
            <a href="/profile.html" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
             👤 Profile
            </a>

           <a href="/order.html" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
             <img src="image/cart.svg" alt="Cart Icon" class="w-5 h-5"> Order
           </a>

        <form onsubmit="handleLogout(event)">
         <button type="submit" class="flex items-center justify-center gap-2 w-full px-6 py-2 text-black font-semibold hover:bg-gray-100 transition duration-200">
            <img src="image/logout.svg" alt="Signup Icon" class="w-4 h-4">Logout
          </button>
        </form>
          </div>
          </div>
      `;
  } else {
    mobilenav.innerHTML = `
          
    <div class="flex sm:flex-row items-center justify-center text-center gap-4 h-20">
          <a href="login.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200">
            <img src="image/logout.svg" alt="Login Icon" class="w-5 h-5">
           <span>Login</span>
          </a>
        <a href="register.html" class="inline-flex items-center gap-2 border border-gray-300 text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition duration-200">
          <img src="image/logout.svg" alt="Signup Icon" class="w-5 h-5">
          <span>Sign up</span>
        </a>
    </div>

      `;
  }
};

navbar();
mobilenavbar();

// Handle dropdown toggling
document.addEventListener("click", function (e) {
  if (e.target.closest(".dropdownButton")) {
    const dropdown = e.target
      .closest(".relative")
      .querySelector(".dropdownMenu");
    dropdown.classList.toggle("hidden");
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
