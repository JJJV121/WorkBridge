// ---------------------------
// Proposals Sent vs Accepted (Doughnut)
// ---------------------------
const proposalsChart = new Chart(document.getElementById("proposalsChart"), {
  type: "doughnut",
  data: {
    labels: ["Sent", "Accepted", "Rejected"],
    datasets: [{
      data: [40, 15, 10],
      backgroundColor: ["#6366f1", "#10b981", "#ef4444"],
      hoverOffset: 20
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: function(ctx) {
            return `${ctx.label}: ${ctx.raw}`;
          }
        }
      }
    },
    animation: { animateRotate: true, animateScale: true }
  }
});

// ---------------------------
// Active vs Completed Contracts (Pie)
// ---------------------------
const contractsChart = new Chart(document.getElementById("contractsChart"), {
  type: "pie",
  data: {
    labels: ["Active", "Completed"],
    datasets: [{
      data: [3, 7],
      backgroundColor: ["#6366f1", "#10b981"],
      hoverOffset: 15
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    animation: { animateRotate: true, animateScale: true }
  }
});

// ---------------------------
// Tasks Completed (Horizontal Bar)
// ---------------------------
const tasksChart = new Chart(document.getElementById("tasksChart"), {
  type: "bar",
  data: {
    labels: ["Design", "Development", "Testing", "Deployment"],
    datasets: [{
      label: "Tasks Completed",
      data: [12, 18, 9, 6],
      backgroundColor: ["#6366f1", "#facc15", "#10b981", "#ef4444"],
      borderRadius: 6
    }]
  },
  options: {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` }
      }
    },
    scales: { x: { beginAtZero: true } },
    animation: { duration: 1000, easing: "easeOutQuart" }
  }
});

// ---------------------------
// Weekly Activity (Line Chart)
// ---------------------------
const weeklyActivityChart = new Chart(document.getElementById("weeklyActivityChart"), {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Activities",
      data: [5, 7, 6, 8, 9, 5, 6],
      tension: 0.3,
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.2)",
      fill: true,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: "#6366f1"
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
    animation: { duration: 1200, easing: "easeOutQuart" }
  }
});

// ---------------------------
// Client Interactions (Stacked Bar)
// ---------------------------
const clientsChart = new Chart(document.getElementById("clientsChart"), {
  type: "bar",
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      { label: "Messages", data: [20, 25, 18, 30], backgroundColor: "#6366f1" },
      { label: "Milestones", data: [2, 3, 1, 2], backgroundColor: "#10b981" },
      { label: "Approvals", data: [1, 2, 1, 3], backgroundColor: "#facc15" }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    },
    animation: { duration: 1200, easing: "easeOutQuart" }
  }
});
