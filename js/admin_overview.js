const areaCtx = document.getElementById("areaChart").getContext("2d");
new Chart(areaCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (৳)",
        data: [1200, 1900, 3000, 2500, 3200, 2700],
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(59, 130, 246, 1)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Revenue: ৳${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `৳${value}`;
          },
          color: "#4B5563",
          font: {
            size: 11,
            weight: '300',
          },
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
          font: {
            size: 11,
            weight: '300',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  },
});


const ctx = document.getElementById("salesChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (৳)",
        data: [1200, 1900, 3000, 2500, 3200, 2700],
        backgroundColor: [
          "#3B82F6",
          "#F97316",
          "#22C55E",
          "#EF4444",
          "#6366F1",
          "#EC4899",
        ],
        borderColor: [
          "#1D4ED8",
          "#C2410C",
          "#15803D",
          "#B91C1C",
          "#4F46E5",
          "#BE185D",
        ],

        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
            weight: 100,
          },
          color: "#333", 
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "৳" + value;
          },
          color: "#374151",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#374151",
        },
        grid: {
          display: false,
        },
      },
    },
  },
});





const animateCount = (element, target, duration = 1000) => {
  let start = 0;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  const step = () => {
    start += 1;
    element.textContent = start;
    if (start < target) {
      setTimeout(step, stepTime);
    } else {
      element.textContent = target;
    }
  };
  step();
};

const countUser = () => {
  fetch('https://glamify-backend-ten.vercel.app/account/user/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-users'), count);
    })
    .catch(() => {
      document.getElementById('total-users').textContent = 'Error';
    });
};

const countProduct = () => {
  fetch('https://glamify-backend-ten.vercel.app/product/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-products'), count);
    })
    .catch(() => {
      document.getElementById('total-products').textContent = 'Error';
    });
};

const countOrder = () => {
  fetch('https://glamify-backend-ten.vercel.app/orderitem/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const count = Array.isArray(data) ? data.length : 0;
      animateCount(document.getElementById('total-orders'), count);
    })
    .catch(() => {
      document.getElementById('total-orders').textContent = 'Error';
    });
};

countUser();
countProduct();
countOrder();
