
const handlePasswordChange = (event) => {
  event.preventDefault();

  const old_password = getValue("old_password").value;
  const new_password = getValue("new_password").value;
  const new_password2 = getValue("new_password2").value;

  const changedata = {
    old_password: old_password,
    new_password: new_password,
  };
  console.log(changedata);

 
  if (!old_password || !new_password || !new_password2) {
    alert("⚠️ Please fill out all fields!");`
    return;`
  }

  if (old_password === new_password2) {                                                                                                                                                                                          
    alert("❌ Old passwords do not match!");
    return;
  }

  if (new_password !== new_password2) {
    alert("❌ New passwords do not match!");
    return;
  }

  
fetch(`https://glamify-backend-ten.vercel.app/account/change_password/${user_id}/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(changedata)
})
.then(response => response.json())
.then(data => {
    console.log("Server Response:", data);
    Swal.fire({
      title: 'Success!',
      text: 'Password change successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
  }).then(() => {
      window.location.href = "login.html"; 
  })
   
})
.catch(error => console.error('Old password not match:', error));

};



