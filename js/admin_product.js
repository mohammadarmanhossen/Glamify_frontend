

const adminProduct = () => {
    fetch('https://glamify-backend-ten.vercel.app/product/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        const productBody = document.getElementById('product-body');
        productBody.innerHTML = '';

        data.forEach(product => {
            const row = document.createElement('tr');
            row.classList.add('border-b');

            row.innerHTML = `
                <td class="p-2">${product.id}</td>
                <td class="p-2">${product.name}</td>
                <td class="p-2">${product.description}</td>
                <td class="p-2">${product.price}</td>
                <td class="p-2">${product.stock}</td>
                <td class="p-2"><img src="${product.image_url}" alt="${product.name}" class="w-16 h-16 object-cover"></td>
                <td class="p-2">${product.brand_name}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-id="${product.id}">Delete</button>
                </td>
           
               
            `;

            productBody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

function deleteProduct(productId) {
    fetch(`https://glamify-backend-code.onrender.com/product/${productId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.ok) {
            adminProduct(); 
        } else {
            alert('Failed to delete product.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the product.');
    });
}

adminProduct();






document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        image_url: document.getElementById('image_url').value,
        brand: document.getElementById('brand').value
    };
    console.log(productData);

    fetch('https://glamify-backend-code.onrender.com/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Added product successfully ",
                icon: "success",
                confirmButtonText: "OK",
              })
            adminProduct(); 
            e.target.reset();
        } else {
            alert('Failed to add product');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding product');
    });
});


