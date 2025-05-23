
  const today = new Date();
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  document.getElementById('invoice-date').textContent = formattedDate;



document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const checkoutId = params.get('checkout');
    if (checkoutId) {
      fetch(`https://glamify-backend-ten.vercel.app/checkout/${checkoutId}/`)
        .then(res => res.json())
        .then(checkout => {
          document.getElementById('name').textContent = checkout.name;
          document.getElementById('email').textContent = checkout.email;
          document.getElementById('address').textContent = checkout.address;
          document.getElementById('zip_code').textContent = checkout.zip_code;
          document.getElementById('quantity').textContent = checkout.quantity;
          document.getElementById('total_amount').textContent = checkout.total_amount;
        })
        .catch(err => {
          console.error('Failed to load checkout:', err);
          alert('Error loading checkout details.');
        });
    } else {
      alert('No checkout ID provided in URL.');
    }
  });