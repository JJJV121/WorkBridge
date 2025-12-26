// Earnings data
const monthlyEarnings = [1200, 900, 1500, 1800, 2100, 2450];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const available = 2450;
const pending = 1200; // replaced 'inEscrow' with 'pending'
const withdrawn = 6800;

// ----- Monthly Earnings Bar Chart -----
new Chart(document.getElementById("earningsChart"), {
  type: "bar",
  data: {
    labels: months,
    datasets: [{
      data: monthlyEarnings,
      backgroundColor: "#6366f1",
      borderRadius: 6
    }]
  },
  options: {
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

// ----- Income Breakdown Pie Chart -----
new Chart(document.getElementById("incomeBreakdownChart"), {
  type: "pie",
  data: {
    labels: ["Available", "Pending", "Withdrawn"],
    datasets: [{
      data: [available, pending, withdrawn],
      backgroundColor: ["#6366f1", "#facc15", "#ef4444"]
    }]
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: ctx => `$${ctx.raw}` } }
    },
    responsive: true
  }
});

// ----- Cumulative Earnings Line Chart -----
new Chart(document.getElementById("earningsTrendChart"), {
  type: "line",
  data: {
    labels: months,
    datasets: [{
      label: "Earnings Trend",
      data: monthlyEarnings.map((v, i) => monthlyEarnings.slice(0, i + 1).reduce((a,b)=>a+b,0)),
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 4
    }]
  },
  options: {
    plugins: { legend: { display: true }, tooltip: { callbacks: { label: ctx => `$${ctx.raw}` } } },
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

// ----- Monthly Earnings Distribution Doughnut Chart -----
new Chart(document.getElementById("monthlyDistributionChart"), {
  type: "doughnut",
  data: {
    labels: months,
    datasets: [{
      data: monthlyEarnings,
      backgroundColor: ["#6366f1", "#10b981", "#facc15", "#ef4444", "#8b5cf6", "#22d3ee"],
      borderWidth: 2
    }]
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: $${ctx.raw}` } }
    },
    responsive: true
  }
});
