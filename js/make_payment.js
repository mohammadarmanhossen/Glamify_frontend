

const totalAmountContainer = document.getElementById('total-amount');
const checkoutTotal = localStorage.getItem('checkoutTotal');
totalAmountContainer.innerText = `Total:৳${checkoutTotal}`;


const totalProductContainer = document.getElementById('total-product');
const checkoutProduct = localStorage.getItem('Total');


totalProductContainer.innerText = `Product(${checkoutProduct})`;

console.log(checkoutProduct);  
console.log(checkoutTotal); 


let orderitem_id = null; 


const orderAndPayment = async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const amount = localStorage.getItem("checkoutTotal");
    const quantity = parseInt(localStorage.getItem("Total"));
    const product_id= document.getElementById("product").value;

    const orderitemData = {
        product_name: product_id,
        quantity: quantity,
        created_at: new Date().toISOString(),
        status: "success",
        is_paid: false,
    };
    console.log(orderitemData);

    try {
        const orderResponse = await fetch("https://glamify-backend-tp2c.onrender.com/orderitem/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderitemData),
        });

        if (!orderResponse.ok) {
            throw new Error("Failed to create order item.");
        }

        const orderData = await orderResponse.json();
        const orderitem_id = orderData.id;
        console.log("✅ Order item created:", orderitem_id);


        const paymentResponse = await fetch("https://glamify-backend-tp2c.onrender.com/payment/create_payment/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user_id,
                total_amount: amount,
                orderitem_id: orderitem_id,
            }),
        });

        const paymentData = await paymentResponse.json();
        console.log("💰 Payment response:", paymentData);

        if (paymentData.payment_url) {
            window.location.href = paymentData.payment_url; 
        } else {
            alert("Payment session creation failed.");
        }
    }
     catch (error) {
        console.error("❌ Error in checkout and payment:", error);
        alert("Something went wrong: " + error.message);
    }
};



