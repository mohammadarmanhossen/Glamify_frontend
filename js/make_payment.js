

const totalAmountContainer = document.getElementById('total-amount');
const checkoutTotal = localStorage.getItem('checkoutTotal');
totalAmountContainer.innerText = `Total Price : ${checkoutTotal}৳`;


const totalProductContainer = document.getElementById('total-product');
const checkoutProduct = localStorage.getItem('Total');


totalProductContainer.innerText = `Total Product : ${checkoutProduct}`;

console.log(checkoutProduct);  
console.log(checkoutTotal); 


let orderitem_id = null; 


// const orderAndPayment = async (event) => {
//     event.preventDefault();

//     const user_id = localStorage.getItem("user_id");
//     const amount = localStorage.getItem("checkoutTotal");
//     const quantity = parseInt(localStorage.getItem("Total"));
//     const product_id= document.getElementById("product").value;

//     const orderitemData = {
//         product_name: product_id,
//         quantity: quantity,
//         created_at: new Date().toISOString(),
//         status: "success",
//         is_paid: false,
//     };
//     console.log(orderitemData);

//     try {
//         const orderResponse = await fetch("https://glamify-backend-code.onrender.com/orderitem/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(orderitemData),
//         });

//         if (!orderResponse.ok) {
//             throw new Error("Failed to create order item.");
//         }

//         const orderData = await orderResponse.json();
//         const orderitem_id = orderData.id;
//         console.log("✅ Order item created:", orderitem_id);


//         const paymentResponse = await fetch("https://glamify-backend-code.onrender.com/payment/create_payment/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 user: user_id,
//                 total_amount: amount,
//                 orderitem_id: orderitem_id,
//             }),
//         });

//         const paymentData = await paymentResponse.json();
//         console.log("💰 Payment response:", paymentData);

//         if (paymentData.payment_url) {
//             window.location.href = paymentData.payment_url; 
//         } else {
//             alert("Payment session creation failed.");
//         }
//     }
//      catch (error) {
//         console.error("❌ Error in checkout and payment:", error);
//         alert("Something went wrong: " + error.message);
//     }
// };



const orderAndPayment = (event) => {
    event.preventDefault();

    // Get values from localStorage
    const user_id = localStorage.getItem("user_id");
    const amount = parseFloat(localStorage.getItem("checkoutTotal"));
    const quantity = parseInt(localStorage.getItem("Total"));
    const product_id = document.getElementById("product").value;

    if (!user_id || !amount || !quantity || !product_id) {
        alert("Missing required data. Please check all fields.");
        return;
    }

    const orderitemData = {
        product_id: product_id,
        quantity: quantity,
        created_at: new Date().toISOString(),
        status: "success",
        is_paid: false,
    };

    console.log("📦 Order Item Data:", orderitemData);

    // Step 1: Create Order Item
    fetch("https://glamify-backend-code.onrender.com/orderitem/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderitemData),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error("Failed to create order item: " + text);
            });
        }
        return response.json();
    })
    .then(orderData => {
        const orderitem_id = orderData.id;
        console.log("✅ Order item created with ID:", orderitem_id);

        // Step 2: Create Payment
        return fetch("https://glamify-backend-code.onrender.com/payment/create_payment/", {
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
    })
    .then(paymentResponse => {
        if (!paymentResponse.ok) {
            return paymentResponse.text().then(text => {
                throw new Error("Failed to create payment session: " + text);
            });
        }
        return paymentResponse.json();
    })
    .then(paymentData => {
        console.log("💰 Payment response:", paymentData);
        if (paymentData.payment_url && paymentData.payment_url.trim() !== "") {
            window.location.href = paymentData.payment_url;
        } else {
            alert("Payment session creation failed: No valid payment URL.");
        }
    })
    .catch(error => {
        console.error("❌ Error in order and payment flow:", error);
        alert("Something went wrong: " + error.message);
    });
};
