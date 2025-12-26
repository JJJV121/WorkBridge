// Same contracts array as contracts.js
const contracts = [
  { name: "React Dashboard Revamp", client: "Startup Labs", earnings: "$1,200", progress: 70, status: "Active" },
  { name: "Landing Page Design", client: "Creative Studio", earnings: "$800", progress: 45, status: "Active" },
  { name: "API Integration", client: "TechCorp", earnings: "$1,500", progress: 90, status: "Near Completion" },
  { name: "Mobile App Development", client: "Appify", earnings: "$2,000", progress: 30, status: "Active" },
  { name: "E-commerce Website", client: "ShopNow", earnings: "$1,800", progress: 60, status: "Active" }
];

// Get contract index from URL
const params = new URLSearchParams(window.location.search);
const index = params.get("id");

const container = document.getElementById("contractDetails");

if (index !== null && contracts[index]) {
  const c = contracts[index];
  container.innerHTML = `
    <h1 class="text-2xl font-bold text-indigo-600">${c.name}</h1>
    <p class="text-sm text-slate-600">Client: <b>${c.client}</b></p>
    <p class="text-sm text-slate-600">Status: <b>${c.status}</b></p>
    <p class="text-sm text-slate-600">Earnings: <b>${c.earnings}</b></p>
    <div class="mt-4">
      <h2 class="font-semibold text-lg mb-2">Project Progress</h2>
      <progress value="${c.progress}" max="100" class="w-full"></progress>
    </div>
  `;
} else {
  container.innerHTML = `<p class="text-red-600">Contract not found.</p>`;
}
