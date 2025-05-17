 // আজকের তারিখ নিয়ে formatted string বানানো
  const today = new Date();
  
  // format: 17 May, 2025
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // স্প্যান এ সেট করা
  document.getElementById('invoice-date').textContent = formattedDate;