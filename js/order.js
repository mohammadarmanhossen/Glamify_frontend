
const totalAmountContainer = document.getElementById('total-amount');
const checkoutTotal = localStorage.getItem('checkoutTotal');
totalAmountContainer.innerText = `Total : ৳${checkoutTotal}`;


const totalProductContainer = document.getElementById('total-product');
const checkoutProduct = localStorage.getItem('Total');

totalProductContainer.innerText = `Product : ${checkoutProduct}`;

console.log(checkoutProduct);  
console.log(checkoutTotal);  




const checkoutporduct = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const zip = document.getElementById("zip").value;

    const checkout = {
        name: name,
        email: email,
        address: address,
        zip_code: zip,
        total_amount: checkoutTotal,     
        quantity: checkoutProduct, 
    };

    console.log(checkout);
 
    fetch("https://glamify-backend-tp2c.onrender.com/order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(checkout),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Order submitted successfully:", data);
    })
    .catch((error) => {
        console.error("Error submitting order:", error);
    });
};
