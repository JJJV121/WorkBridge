const contracts = [
  { name: "React Dashboard Revamp", client: "Startup Labs", earnings: "$1,200", progress: 70, status: "Active" },
  { name: "Landing Page Design", client: "Creative Studio", earnings: "$800", progress: 45, status: "Active" },
  { name: "API Integration", client: "TechCorp", earnings: "$1,500", progress: 90, status: "Near Completion" },
  { name: "Mobile App Development", client: "Appify", earnings: "$2,000", progress: 30, status: "Active" },
  { name: "E-commerce Website", client: "ShopNow", earnings: "$1,800", progress: 60, status: "Active" }
];

const grid = document.getElementById("contractsGrid");

contracts.forEach((c, index) => {
  const card = document.createElement("div");
  card.className = "card p-6 space-y-4 bg-white rounded-2xl shadow hover:shadow-lg transition";

  card.innerHTML = `
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-ink">${c.name}</h3>
      <span class="badge bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">${c.status}</span>
    </div>

    <p class="text-sm text-slate-600">Client: <b>${c.client}</b></p>

    <div class="flex justify-between items-center">
      <p class="font-medium text-indigo-600">Earnings: ${c.earnings}</p>
      <a href="contract-details.html?id=${index}" class="btn-primary px-3 py-1 rounded-lg text-sm">View Details</a>
    </div>
  `;
  grid.appendChild(card);
});
