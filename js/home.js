document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://glamify-backend-code.onrender.com/product/";
  const user_id = localStorage.getItem("user_id");
  console.log("User_id:", user_id);

  const products = (brandId = "all", searchQuery = "") => {
    const productCart = document.getElementById("product-cart");
    if (!productCart) return;

    productCart.innerHTML =
      '<p class="text-center text-blue-500">Loading products...</p>';

    let fetchURL = baseURL;
    const params = [];

    if (brandId !== "all") {
      params.push(`brand=${encodeURIComponent(brandId)}`);
    }

    if (searchQuery.trim() !== "") {
      params.push(`search=${encodeURIComponent(searchQuery)}`);
    }

    if (params.length > 0) {
      fetchURL += "?" + params.join("&");
    }

    console.log("Fetching URL:", fetchURL);

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const products = Array.isArray(data) ? data : [];
        displayProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        productCart.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
      });
  };


  const displayProducts = (products) => {
    console.log(products);

    const productCart = document.getElementById("product-cart");
    if (!productCart) return;

      const getShortDescription = (text, wordLimit = 5) => {
        const words = text.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };

      const getShortName = (text, wordLimit = 2) => {
        const words = text.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };

    if (!Array.isArray(products) || products.length === 0) {
      productCart.innerHTML =
        '<p class="text-center text-gray-500">No products available.</p>';
    } else {
      productCart.innerHTML = products.map((product) => `
    
    <div class="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden m-4">

          <img class="w-full h-56 object-cover" src="${product.image_url}" alt="${ product.name}" loading="lazy">
          <div class="px-6 py-4">
         <p class="text-xl md:text-xl font-semibold  mb-1">${getShortName(product.name)}</p>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">${getShortDescription(product.description)}</p>
         <p class="md:font-semibold text-gray-500 mb-4">Brand: ${ product.brand_name}</p>
      <div class="flex justify-between items-center mt-4">
  <p class=" font-semibold">${product.price}৳</p>
  <a href="${ user_id ? `./product_details.html?id=${product.id}` : './login.html' }" class="text-sm font-semibold text-amber-700 hover:underline transition">
    View Details
  </a>
</div>

      

  </div>
</div>


            `
        )
        .join("");
    }
  };

  const brand = () => {
    const brandList = document.getElementById("brand-list");
    if (!brandList) return;

    brandList.innerHTML = "";

    fetch("https://glamify-backend-tp2c.onrender.com/Brand/")
      .then((response) => response.json())
      .then((data) => {
        const allButton = createBrandButton("All", "all");
        brandList.appendChild(allButton);

        data.forEach((brand) => {
          const brandButton = createBrandButton(brand.name, brand.id);
          brandList.appendChild(brandButton);
        });
      })
      .catch((error) => {
        console.error("Error fetching brand data:", error);
      });
  };

  const createBrandButton = (text, brandId) => {
    const btn = document.createElement("button");
    btn.classList.add(
      "bg-gray-600",
      "rounded",
      "p-2",
      "m-1",
      "text-white",
      "brand-btn"
    );
    btn.textContent = text;
    btn.setAttribute("data-id", brandId);

    btn.onclick = () => {
      document
        .querySelectorAll(".brand-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      const searchQuery = document.getElementById("search").value.trim();
      products(brandId, searchQuery);
    };

    return btn;
  };

  const handleSearch = () => {
    const searchQuery = document.getElementById("search").value.trim();
    const selectedBrand = document.querySelector(".brand-btn.selected");
    const brandId = selectedBrand
      ? selectedBrand.getAttribute("data-id") || selectedBrand.textContent
      : "all";
    products(brandId, searchQuery);
  };

  products();
  brand();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
});
