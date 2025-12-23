const contracts = [
  {
    name: "React Dashboard Revamp",
    client: "Startup Labs",
    earnings: "$1,200",
    progress: 70,
    status: "Active"
  },
  {
    name: "Landing Page Design",
    client: "Creative Studio",
    earnings: "$800",
    progress: 45,
    status: "Active"
  },
  {
    name: "API Integration",
    client: "TechCorp",
    earnings: "$1,500",
    progress: 90,
    status: "Near Completion"
  }
];

const grid = document.getElementById("contractsGrid");

contracts.forEach(c => {
  grid.innerHTML += `
    <div class="card p-6 space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">${c.name}</h3>
        <span class="badge bg-indigo-100 ">${c.status}</span>
      </div>

      <p class="text-sm text-slate-600">Client: <b>${c.client}</b></p>

      <div>
        <div class="flex justify-between text-sm mb-1 text-indigo-600">
          <span>Progress</span>
          <span>${c.progress}%</span>
        </div>
        <progress value="${c.progress}" max="100" class="w-full"></progress>
      </div>

      <p class="font-medium text-indigo-600">Earnings: <span class="text-indigo-600">${c.earnings}</span></p>
    </div>
  `;
});
