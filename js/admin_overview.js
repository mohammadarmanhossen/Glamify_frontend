
document.getElementById("menu-btn").addEventListener("click", function () {
    let menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
});

const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [1200, 1900, 3000, 2500, 3200, 2700],
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1,
            borderRadius: 8,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '৳' + value;
                    }
                }
            }
        }
    }
});