
const loadOrderItems = () => {
    fetch('https://glamify-backend-code.onrender.com/orderitem/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tableBody = document.getElementById('order-table-body');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('hover:bg-gray-50'); 

                row.innerHTML = `
                    <td class="px-6 py-4">${item.id}</td>
                    <td class="px-6 py-4">${item.product_name}</td>
                    <td class="px-6 py-4">${item.quantity}</td>
                    <td class="px-6 py-4">
                        <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-green-700">
                            ${item.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        ${item.is_paid
                            ? '<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Complate</span>'
                            : '<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Pending</span>'}
                    </td>
            
                     <td class="px-6 py-4">
                         <a href="checkout_details.html?checkout=${item.id}" class="bg-red-500 p-1 border-1 rounded-md text-white">Details</a>
                      </td>
                     
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching order items:', error);
        });
};

document.addEventListener('DOMContentLoaded', loadOrderItems);
