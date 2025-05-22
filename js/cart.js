
const loadCart = () => {
  const cartContainer = document.getElementById("cart-items");
  const totalAmountContainer = document.getElementById("total-amount");
  const ProductContainer = document.getElementById("total-product");

  if (!cartContainer) return;

  fetch("https://glamify-backend-code.onrender.com/cart/")
    .then((response) => response.json())
    .then((data) => {
      cartContainer.innerHTML = "";
      let totalAmount = 0;
      let totalProduct = 0;

      data.forEach((item) => {
        const { id, product_image, product_name, product_price, quantity } = item;

        totalAmount += product_price * quantity;
        totalProduct += quantity;

        const productCard = `

        <hr class="border-gray-200">
          <div class="flex flex-col md:flex-row items-center bg-white  gap-6  mb-4">
            <!-- Product Image -->
            <div class="w-24 h-24 md:w-32 md:h-32  overflow-hidden flex-shrink-0">
              <img src="${product_image}" alt="${product_name}" class="w-full h-full object-cover">
            </div>

            <!-- Product Info and Actions -->
            <div class="flex flex-col md:flex-row justify-between items-center w-full gap-6">
              <!-- Name and Price -->
              <div class="flex flex-col gap-1 text-center md:text-left md:w-1/4">
                <h3 class="text-lg font-semibold text-gray-800">${product_name}</h3>
                <p class="text-sm text-gray-500">৳${product_price} per item</p>
              </div>

              <!-- Quantity Selector -->
              <div class="flex items-center gap-3 md:w-1/4 justify-center">
                <button onclick="updateQuantity(${id}, ${quantity - 1})"
                  class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition">−</button>
                <span class="text-gray-800 font-semibold">${quantity}</span>
                <button onclick="updateQuantity(${id}, ${quantity + 1})"
                  class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition">+</button>
              </div>

              <!-- Quantity x Price -->
              <div class="md:w-1/4 text-center">
                <p class="text-black text-base font-medium">${quantity} × ৳${product_price}</p>
              </div>

                <div class="md:w-1/4 text-center">
                 <p class="text-lg font-bold text-gray-900">৳${(quantity * product_price).toLocaleString()}</p>
              </div>
              

              <!-- Total & Remove -->
              <div class="flex flex-col items-center md:items-end gap-2 md:w-1/4">
              
                <button onclick="removeFromCart(${id})"
                  class="text-red-600 text-sm font-medium border p-2 border-red-600">Remove</button>
              </div>
            </div>
          </div>
        `;

        cartContainer.innerHTML += productCard;
      });

      totalAmountContainer.innerText = `Total Price : ৳${totalAmount.toLocaleString()}`;
      ProductContainer.innerText = `Total Product : ${totalProduct}`;
      localStorage.setItem("checkoutTotal", totalAmount);
      localStorage.setItem("Total", totalProduct);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      cartContainer.innerHTML = `<p class="text-red-600">Failed to load cart items.</p>`;
    });
};

const updateQuantity = (cartItemId, newQuantity) => {
  if (newQuantity < 1) return;

  fetch(`https://glamify-backend-code.onrender.com/cart/${cartItemId}/`, {
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
      alert("Failed to update quantity.");
    });
};

const removeFromCart = (cartItemId) => {
  fetch(`https://glamify-backend-code.onrender.com/cart/${cartItemId}/`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        loadCart();
      } else {
        alert("Failed to remove item from cart.");
      }
    })
    .catch((error) => {
      console.error("Error removing item:", error);
      alert("Error removing item from cart.");
    });
};

loadCart();
