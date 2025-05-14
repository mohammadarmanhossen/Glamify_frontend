// const productDetails = () => {
//   const productDetailsContainer = document.getElementById("product-details");
//   if (!productDetailsContainer) return;

//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("id");

//   if (!productId) {
//     productDetailsContainer.innerHTML =
//       "<p class='text-red-500'>Product ID not found!</p>";
//     return;
//   }

//   fetch(`https://glamify-backend-tp2c.onrender.com/product/${productId}/`)
//     .then((response) => response.json())
//     .then((product) => {
//       console.log(product);

//       const productHTML = `




// <div class="grid grid-cols-1 md:grid-cols-2 items-center w-full h-full bg-white border-4 border-white rounded-2xl shadow-lg p-6 gap-8">

//     <!-- Product Image -->
//      <div class="product-img flex justify-center">
//         <img class="w-full md:w-96 h-auto object-cover"
//             src="${product.image_url}" alt="${product.name}">
//     </div>

//     <!-- Product Details -->
//     <div class="w-full h-full p-4 md:p-6 text-center md:text-left">
//         <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">${product.name}</h2>

//         <p class="text-gray-600 text-base md:text-lg mb-4">
//             ${product.description}
//         </p>

//         <p class="text-gray-600 text-xl md:text-2xl font-bold mb-4">
//             ৳${product.price}
//         </p>

//         <p class="text-gray-500 font-medium mb-6">
//             Stock: ${product.stock}
//         </p>

//         <!-- Action Buttons -->
//         <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
//             <button id="add-to-cart"
//                 class="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-900 hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
//                 Add to Cart
//             </button>
//             <button id="go-to-cart"
//                 class="bg-gray-400 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
//                 Go to Cart
//             </button>
//         </div>

//     </div>

// </div>






  
//               `;

//       productDetailsContainer.innerHTML = productHTML;

//       document
//         .getElementById("add-to-cart")
//         .addEventListener("click", () => addToCart(product.id));

//       document.getElementById("go-to-cart").addEventListener("click", () => {
//         window.location.href = "./cart.html";
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching product details:", error);
//       productDetailsContainer.innerHTML =
//         "<p class='text-red-500'>Failed to load product details.</p>";
//     });
// };

// const addToCart = (productId) => {
//   const quantity = 1;

//   fetch("https://glamify-backend-tp2c.onrender.com/cart/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       user: user_id,
//       product: productId,
//       quantity: quantity,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Product added to cart:", data);
//       Swal.fire({
//         title: 'Success!',
//         text: 'Product added successfully .',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       })
      
//     })
//     .catch((error) => {
//       console.error("Error adding product to cart:", error);
//       alert("Failed to add product to cart.");
//     });
// };

// productDetails();



// const productReview = (event) => {
//   event.preventDefault();

//   const user = localStorage.getItem("user_id");
//   const star = document.getElementById("rating").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const body = document.getElementById("message").value.trim();

//   const reviewData = {
//     star: star,
//     email: email,
//     body: body,
//     user: user,
//   };

//   console.log(reviewData);

//   fetch("https://glamify-backend-tp2c.onrender.com/review/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reviewData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Server Response:", data);
//       Swal.fire({
//         title: 'Success!',
//         text: 'Your review successfully send.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       })
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Failed to send message. Please try again.");
//     });
// };

// const form = document.getElementById("reviewForm");
// form.addEventListener("submit", productReview);






const productDetails = () => {
  const productDetailsContainer = document.getElementById("product-details");
  if (!productDetailsContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    productDetailsContainer.innerHTML =
      "<p class='text-red-500'>Product ID not found!</p>";
    return;
  }

  fetch(`https://glamify-backend-tp2c.onrender.com/product/${productId}/`)
    .then((response) => response.json())
    .then((product) => {
      console.log(product);

      const productHTML = `




<div class="grid grid-cols-1 md:grid-cols-2 items-center w-full h-full bg-gray-900 border border-white rounded-2xl shadow-lg p-6 gap-8">

    <!-- Product Image -->
     <div class="product-img flex justify-center">
        <img class="w-full md:w-96 h-auto object-cover"
            src="${product.image_url}" alt="${product.name}">
    </div>

    <!-- Product Details -->
    <div class="w-full h-full p-4 md:p-6 text-center md:text-left">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-300 mb-4">${product.name}</h2>

        <p class="text-gray-300 text-base md:text-lg mb-4">
            ${product.description}
        </p>

        <p class="text-gray-300 text-xl md:text-2xl font-bold mb-4">
            ৳${product.price}
        </p>

        <p class="text-gray-300 font-medium mb-6">
            Stock: ${product.stock}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button id="add-to-cart"
                class="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-amber-900 hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                Add to Cart
            </button>
            <button id="go-to-cart"
                class="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-amber-700 hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                Go to Cart
            </button>
        </div>

    </div>

  </div>


         `;

      productDetailsContainer.innerHTML = productHTML;

      document
        .getElementById("add-to-cart")
        .addEventListener("click", () => addToCart(product.id));

      document.getElementById("go-to-cart").addEventListener("click", () => {
        window.location.href = "./cart.html";
      });
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      productDetailsContainer.innerHTML =
        "<p class='text-red-500'>Failed to load product details.</p>";
    });
};

const addToCart = (productId) => {
  const quantity = 1;

  fetch("https://glamify-backend-tp2c.onrender.com/cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user_id,
      product: productId,
      quantity: quantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product added to cart:", data);
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully .',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    });
};

productDetails();



const productReview = (event) => {
  event.preventDefault();

  const user = localStorage.getItem("user_id");
  const star = document.getElementById("rating").value.trim();
  const email = document.getElementById("email").value.trim();
  const body = document.getElementById("message").value.trim();

  const reviewData = {
    star: star,
    email: email,
    body: body,
    user: user,
  };

  console.log(reviewData);

  fetch("https://glamify-backend-tp2c.onrender.com/review/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server Response:", data);
      Swal.fire({
        title: 'Success!',
        text: 'Your review successfully send.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    });
};

const form = document.getElementById("reviewForm");
form.addEventListener("submit", productReview);





