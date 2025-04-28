const loadCart = () => {
  const cartContainer = document.getElementById("cart");
  const totalAmountContainer = document.getElementById("total-amount");
  const ProductContainer = document.getElementById("total-product");

  if (!cartContainer) return;

  fetch("https://glamify-backend-tp2c.onrender.com/cart/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cartContainer.innerHTML = "";
      let totalAmount = 0;
      let totalProduct = 0;

      data.forEach((item) => {
        totalAmount += item.product_price * item.quantity;
        totalProduct += item.quantity;

        const productCard = `


    <div class="bg-gray shadow-lg rounded-lg overflow-hidden p-4 flex flex-col md:flex-row items-center w-full gap-6">
    <!-- Product Image -->
    <div class="w-32 h-32 md:w-64 md:h-64 flex-shrink-0">
        <img class="w-full h-full object-cover rounded-md" src="${
          item.product_image
        }" alt="${item.product_name}">
    </div>

    <!-- Product Details -->
    <div class="flex flex-col md:flex-row flex-grow items-center justify-between w-full gap-5">
        <!-- Product Name -->
        <h5 class="text-lg md:text-xl font-semibold text-gray-800 text-center md:text-left">${
          item.product_name
        }</h5>

        <!-- Quantity Update -->
        <div class="flex items-center gap-3">
            <button onclick="updateQuantity(${item.id}, ${
          item.quantity - 1
        })" class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition">
                −
            </button>
            <p class="text-gray-600 text-lg font-semibold">${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, ${
          item.quantity + 1
        })" class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition">
                +
            </button>
        </div>

        <!-- Total Price -->
        <p class="text-black text-lg font-bold px-4">${item.quantity} x ৳${
          item.product_price
        }</p>

        <!-- Remove Button -->
        <button onclick="removeFromCart(${
          item.id
        })" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Remove
        </button>
    </div>
</div>


                `;

        cartContainer.innerHTML += productCard;
      });

      totalAmountContainer.innerText = `Price : ৳${totalAmount}`;
      localStorage.setItem("checkoutTotal", totalAmount);

      ProductContainer.innerHTML = `Product : ${totalProduct}`;
      localStorage.setItem("Total", totalProduct);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
};

const updateQuantity = (cartItemId, newQuantity) => {
  if (newQuantity < 1) return;

  fetch(`https://glamify-backend-tp2c.onrender.com/cart/${cartItemId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: newQuantity }),
  })
    .then((response) => response.json())
    .then(() => {
      loadCart();
    })
    .catch((error) => {
      console.error("Error updating quantity:", error);
    });
};

const removeFromCart = (cartItemId) => {
  fetch(`https://glamify-backend-tp2c.onrender.com/cart/${cartItemId}/`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        loadCart();
      } else {
        alert("Failed to remove item");
      }
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
      alert("Error removing item");
    });
};

loadCart();
