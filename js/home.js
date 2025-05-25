document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "https://glamify-backend-ten.vercel.app/product/";
  const user_id = localStorage.getItem("user_id");

  const products = (brandId = "all", searchQuery = "") => {
    const productCart = document.getElementById("product-cart");

productCart.innerHTML = `
  <div class="col-span-full flex items-center justify-center min-h-[300px]">
    <div class="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
  </div>
`;

    if (!productCart) return;
    let fetchURL = baseURL;
    const params = [];

    if (brandId !== "all") params.push(`brand=${encodeURIComponent(brandId)}`);
    if (searchQuery.trim() !== "")
      params.push(`search=${encodeURIComponent(searchQuery)}`);
    if (params.length > 0) fetchURL += "?" + params.join("&");

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => displayProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        productCart.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
      });
  };

  const displayProducts = (products) => {
    const productCart = document.getElementById("product-cart");
    if (!productCart) return;

    const getShortDescription = (text, wordLimit = 5) => {
      const words = text.split(" ");
      return (
        words.slice(0, wordLimit).join(" ") +
        (words.length > wordLimit ? "..." : "")
      );
    };

    const getShortName = (text, wordLimit = 2) => {
      const words = text.split(" ");
      return (
        words.slice(0, wordLimit).join(" ") +
        (words.length > wordLimit ? "..." : "")
      );
    };

    if (!Array.isArray(products) || products.length === 0) {
      productCart.innerHTML =
        '<p class="text-center text-gray-500">No products available.</p>';
    } else {
      productCart.innerHTML = products
        .map(
          (product) => `
          
        <div class="max-w-sm bg-white  shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden m-4">
          
        <div class="relative">
          <img class="w-full h-56 object-cover" src="${
            product.image_url
          }" alt="${product.name}" loading="lazy">
          <h1 class="absolute top-2 left-2  bg-green-500 text-white px-3 py-1 text-sm rounded-full">Hot</h1>
        </div>

        
      
          <div class="px-6 py-4">
            <p class="text-xl font-semibold mb-1">${getShortName(
              product.name
            )}</p>
            <p class="text-gray-600 text-sm mb-3">${getShortDescription(
              product.description
            )}</p>
            <p class="text-gray-500 mb-4">Brand: ${product.brand_name}</p>
            <div class="flex justify-between items-center mt-4">
              <p class="font-semibold">${product.price}৳</p>
              <a href="${
                user_id
                  ? `./product_details.html?id=${product.id}`
                  : "./login.html"
              }" class="text-sm font-semibold text-green-500  transition">
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

      const brandSelect = document.getElementById("brand-filter");
      if (brandSelect) brandSelect.value = brandId;
    };

    return btn;
  };

  const loadBrands = () => {
    const brandList = document.getElementById("brand-list");
    const brandSelect = document.getElementById("brand-filter");

    fetch("https://glamify-backend-ten.vercel.app/Brand/")
      .then((response) => response.json())
      .then((data) => {
        if (brandList) brandList.appendChild(createBrandButton("All", "all"));

        data.forEach((brand) => {
          if (brandList)
            brandList.appendChild(createBrandButton(brand.name, brand.id));

          if (brandSelect) {
            const option = document.createElement("option");
            option.value = brand.id;
            option.textContent = brand.name;
            brandSelect.appendChild(option);
          }
        });
      })
      .catch((error) => console.error("Error loading brands:", error));
  };

  const setupBrandFilter = () => {
    const brandSelect = document.getElementById("brand-filter");

    brandSelect.addEventListener("change", () => {
      const selectedBrand = brandSelect.value;
      const searchQuery = document.getElementById("search").value.trim();

      document.querySelectorAll(".brand-btn").forEach((btn) => {
        btn.classList.toggle(
          "selected",
          btn.getAttribute("data-id") === selectedBrand
        );
      });

      products(selectedBrand, searchQuery);
    });
  };

  const handleSearch = () => {
    const searchQuery = document.getElementById("search").value.trim();
    const selectedBrand = document.querySelector(".brand-btn.selected");
    const brandId = selectedBrand
      ? selectedBrand.getAttribute("data-id")
      : document.getElementById("brand-filter").value || "all";

    products(brandId, searchQuery);
  };

  products();
  loadBrands();
  setupBrandFilter();

  const searchInput = document.getElementById("search");
  if (searchInput) searchInput.addEventListener("input", handleSearch);
});
