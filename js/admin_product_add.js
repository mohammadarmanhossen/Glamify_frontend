

document.getElementById("add-product-form").addEventListener("submit", function (e) {e.preventDefault();
    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      price: parseFloat(document.getElementById("price").value),
      stock: parseInt(document.getElementById("stock").value),
      image_url: document.getElementById("image_url").value,
      brand: document.getElementById("brand").value,
    };
    console.log(productData);

    fetch("https://glamify-backend-ten.vercel.app/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Added product successfully ",
            icon: "success",
            confirmButtonText: "OK",
          });
          adminProduct();
          e.target.reset();
        } else {
          alert("Failed to add product");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
