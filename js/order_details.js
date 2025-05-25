const loadOrderItems = () => {
  const tableBody = document.getElementById("order-table-body");

  tableBody.innerHTML = `
    <tr>
      <td colspan="6">
        <div class="flex flex-col items-center justify-center py-10">
          <div class="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </td>
    </tr>
  `;

  fetch("https://glamify-backend-ten.vercel.app/orderitem/")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => b.id - a.id);

      tableBody.innerHTML = "";

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.classList.add("hover:bg-gray-50");

        const today = new Date();

        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);

        row.innerHTML = `
          <td class="px-6 py-4">${item.id}</td>
          <td class="px-6 py-4">${formattedDate}</td>
          <td class="px-6 py-4">${item.quantity}</td>
          <td class="px-6 py-4">
            <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-green-700">
              ${item.status}
            </span>
          </td>
          <td class="px-6 py-4">
            ${
              item.is_paid
                ? '<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Complete</span>'
                : '<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Pending</span>'
            }
          </td>
          <td class="px-6 py-4">
            <a href="checkout_details.html?checkout=${
              item.id
            }" class="bg-amber-300 p-1 border-1 font-semibold rounded-md text-gray-800">Details</a>
          </td>
        `;
        tableBody.appendChild(row);
      });

      if (data.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-gray-500 py-10">No order items found.</td>
          </tr>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching order items:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-red-500 py-10">Failed to load order items.</td>
        </tr>
      `;
    });
};

document.addEventListener("DOMContentLoaded", loadOrderItems);
