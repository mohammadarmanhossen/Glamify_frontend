const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue (৳)',
            data: [1200, 1900, 3000, 2500, 3200, 2700],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',  
                'rgba(234, 88, 12, 0.7)',    
                'rgba(132, 204, 22, 0.7)', 
                'rgba(244, 63, 94, 0.7)',   
                'rgba(79, 70, 229, 0.7)',   
                'rgba(236, 72, 153, 0.7)'   
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(234, 88, 12, 1)',
                'rgba(132, 204, 22, 1)',
                'rgba(244, 63, 94, 1)',
                'rgba(79, 70, 229, 1)',
                'rgba(236, 72, 153, 1)'
            ],
            borderWidth: 1,
            borderRadius:1,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#333',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '৳' + value;
                    },
                    color: '#374151' 
                },
                grid: {
                    color: '#E5E7EB'
                }
            },
            x: {
                ticks: {
                    color: '#374151'
                },
                grid: {
                    display: false
                }
            }
        }
    }
});
