

const adminUser = () => {
    fetch('https://glamify-backend-ten.vercel.app/account/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('User Data:', data);

        const userBody = document.getElementById('user-body');
        userBody.innerHTML = '';

        data.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add('border-b');

            row.innerHTML = `
                <td class="p-2">${user.id}</td>
                <td class="p-2">${user.username}</td>
                <td class="p-2">${user.email}</td>
                <td class="p-2">${user.first_name}</td>
                <td class="p-2">${user.last_name}</td>
                <td class="p-2">
                    <button class="bg-red-500 p-1 font-semibold rounded-md text-gray-800 delete-button" data-user-id="${user.id}">Delete</button>
                </td>
            `;

            userBody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-user-id');
                deleteUser(userId);
            });
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const deleteUser = (userId) => {
    fetch(`https://glamify-backend-ten.vercel.app/account/user/${userId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.status === 204) {

            adminUser(); 
        } else {
            alert('Failed to delete user.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
    });
};

adminUser();
