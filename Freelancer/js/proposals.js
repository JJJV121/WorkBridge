const proposalList = document.getElementById("proposalList");

const proposalsData = [
  { role: "Frontend Developer", status: "Viewed", appliedDate: "2024-01-02" },
  { role: "UI/UX Designer", status: "Accepted", appliedDate: "2024-01-07" },
  { role: "React Engineer", status: "Pending", appliedDate: "2024-01-10" }
];

// Status badges (keep colors as-is or light gray)
function statusBadge(status){
  if(status === "Accepted")
    return `<span class="badge" style="background: var(--accent); color: white;">✔ Accepted</span>`;
  if(status === "Viewed")
    return `<span class="badge" style="background: var(--accent-soft); color: var(--accent);">👁 Viewed</span>`;
  return `<span class="badge" style="background: var(--accent-soft); color: var(--accent); opacity:0.7;">⏳ Pending</span>`;
}

function loadProposals(){
  proposalList.innerHTML = "";
  proposalsData.forEach(p => {
    const card = document.createElement("div");
    card.className = "card flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:shadow-lg transition duration-200";
    card.innerHTML = `
      <div class="mb-2 md:mb-0">
        <h3 class="font-semibold text-[var(--ink)] text-lg">${p.role}</h3>
        <p class="text-sm text-gray-500">Applied on: ${p.appliedDate}</p>
      </div>
      <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
        ${statusBadge(p.status)}
        <button class="btn-primary text-sm px-4 py-1">View</button>
      </div>
    `;
    proposalList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProposals);
