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

  fetch(`https://glamify-backend-ten.vercel.app/product/${productId}/`)
    .then((response) => response.json())
    .then((product) => {
      console.log(product);

      const productHTML = `

<div class="grid grid-cols-1 md:grid-cols-2 items-center w-full h-full  border-1 border-gray-500 p-6 gap-8">

  <!-- Product Image -->
  <div class="flex items-center justify-center  p-6">
    <img src="${product.image_url}" alt="${product.name}" class="w-full md:w-[400px] h-full object-contain  transition-transform duration-300 hover:scale-105">
  </div>

  <!-- Product Details -->
  <div class="p-8 flex flex-col justify-between text-center md:text-left">

    <!-- Product Name -->
    <h1 class="text-4xl font-extrabold text-gray-800 mb-4">${product.name}</h1>

    <!-- Ratings -->
    <div class="flex items-center font-extrabold justify-center md:justify-start gap-1 mb-3 text-yellow-500">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      <span class="text-sm text-gray-500 ml-2">(6 Reviews)</span>
    </div>

    <!-- Description -->
    <p class="text-gray-600 mb-4 leading-relaxed font-bold">${product.description}</p>

    <!-- SKU -->
    <p class="text-sm text-gray-500 mb-3 font-bold">SKU: 654613612</p>

    <!-- Price -->
        <p class="text-gray-500 font-bold mb-3">Price: ৳${product.price}</p>
   
    <!-- Stock -->
    <p class="text-gray-500 font-bold mb-6">Stock: ${product.stock}</p>

      <div class="pb-5 text-gray-300">
         <hr>
    </div>
  
    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <button id="add-to-cart"
        class="w-full sm:w-auto bg-gray-800 text-gray-300 border border-gray-800 px-6 py-3 font-bold hover:bg-gray-700  transition duration-300">
        🛒 Add to Cart
      </button>
      <button id="go-to-cart"
        class="w-full sm:w-auto bg-gray-800 text-gray-300 border border-gray-800 px-6 py-3 font-bold hover:bg-gray-700  transition duration-300">
        🛍️ Go to Cart
      </button>
    </div>
    <div class="pt-5 text-gray-300">
         <hr>
    </div>
    <div class="flex space-x-4 mt-4">
                
                <a href="#" target="_blank" aria-label="Facebook">
                    <i class="fab fa-facebook-f text-gray-500 hover:text-white text-lg"></i>
                </a>
                <a href="#" target="_blank" aria-label="Twitter">
                    <i class="fab fa-twitter text-gray-500 hover:text-white text-lg"></i>
                </a>
                <a href="#" target="_blank" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in text-gray-500 hover:text-white text-lg"></i>
                </a>
                <a href="#" target="_blank" aria-label="Instagram">
                    <i class="fab fa-instagram text-gray-500 hover:text-white text-lg"></i>
                </a>
                <p class="font-bold"> ❤️Add to Wishlist</p>
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
      fetchRelatedProductsByBrand(product.id);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      productDetailsContainer.innerHTML =
        "<p class='text-red-500'>Failed to load product details.</p>";
    });
};

const addToCart = (productId) => {
  const quantity = 1;

  fetch("https://glamify-backend-ten.vercel.app/cart/", {
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
        title: "Success!",
        text: "Product added successfully .",
        icon: "success",
        confirmButtonText: "OK",
      });
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

  fetch("https://glamify-backend-ten.vercel.app/review/", {
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
        title: "Success!",
        text: "Your review successfully send.",
        icon: "success",
        confirmButtonText: "OK",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    });
};

const form = document.getElementById("reviewForm");
form.addEventListener("submit", productReview);

const fetchRelatedProductsByBrand = (productId) => {
  fetch(`https://glamify-backend-ten.vercel.app/product/${productId}/`)
    .then((res) => res.json())
    .then((currentProduct) => {
      const brandId = currentProduct.brand;

      fetch("https://glamify-backend-ten.vercel.app/product/")
        .then((res) => res.json())
        .then((allProducts) => {
          const related = allProducts.filter(
            (p) => p.brand === brandId && p.id !== currentProduct.id
          );

          const container = document.getElementById(
            "related-products-container"
          );
          container.innerHTML = "";

          if (related.length === 0) {
            container.innerHTML = "<p>No related products found.</p>";
            return;
          }

          related.forEach((product) => {
            const card = document.createElement("div");
            card.className = "bg-white border p-4  text-center";
            card.innerHTML = `
              <a href="./product_details.html?id=${product.id}">
                <img src="${product.image_url}" class="h-40 w-full object-cover mb-2 rounded">
                <h3 class="text-lg font-bold">${product.name}</h3>
                <p class="text-gray-500">৳${product.price}</p>
              </a>
            `;
            container.appendChild(card);
          });
        });
    });
};
