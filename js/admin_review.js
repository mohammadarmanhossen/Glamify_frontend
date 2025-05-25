const adminReview = () => {
  const reviewBody = document.getElementById("review-body");
  reviewBody.innerHTML = `
      <div class="relative min-h-[100px]">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-6 h-6 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    `;
  fetch("https://glamify-backend-ten.vercel.app/review/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Review Data:", data);

      reviewBody.innerHTML = "";

      data.forEach((review) => {
        const row = document.createElement("tr");
        row.classList.add("border-b");

        row.innerHTML = `
                <td class="p-2">${review.id}</td>
                <td class="p-2">${review.user}</td>
                <td class="p-2">${review.email}</td>
                <td class="p-2 text-center">${review.star} ⭐</td>
                <td class="p-2">${review.body}</td>
                <td class="p-2">${review.created_time}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-2 rounded-md text-gray-100 delete-button" data-id="${review.id}">Delete</button>
                </td>
            `;

        reviewBody.appendChild(row);
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const reviewId = event.target.getAttribute("data-id");

          fetch(`https://glamify-backend-ten.vercel.app/review/${reviewId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                const row = event.target.closest("tr");
                row.remove();
              } else {
                alert("Failed to delete review.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error deleting review.");
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

adminReview();
