const adminContact = () => {
  const contactBody = document.getElementById("contact-body");
contactBody.innerHTML = `
  <tr>
    <td colspan="7">
      <div class="flex justify-center items-center h-[100px] w-full">
        <div class="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </td>
  </tr>
`;
  fetch("https://glamify-backend-ten.vercel.app/account/contact/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Contact Data:", data);

      contactBody.innerHTML = "";

      data.forEach((contact) => {
        const row = document.createElement("tr");
        row.classList.add("border-b-2", "border-gray-700", "hover:bg-gray-800");

        row.innerHTML = `
         
        <td class="p-2 text-gray-200">${contact.id}</td>
        <td class="p-2 text-gray-200">${contact.user}</td>
        <td class="p-2 text-gray-200">${contact.name}</td>
        <td class="p-2 text-gray-200">${contact.email}</td>
        <td class="p-2 text-gray-200">${contact.message}</td>
        <td class="p-2 text-gray-200">
            <button class="bg-red-500 p-2 rounded-md text-gray-100 delete-button" data-id="${contact.id}">
                Delete
            </button>
        </td>
    </tr>
            `;

        contactBody.appendChild(row);
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const contactId = event.target.getAttribute("data-id");

          fetch(
            `https://glamify-backend-ten.vercel.app/account/contact/${contactId}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => {
              console.log("Delete response:", response);
              if (response.ok) {
                const row = event.target.closest("tr");
                row.remove();
              } else {
                alert("Failed to delete contact.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error deleting contact.");
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

adminContact();
