const proposalList = document.getElementById("proposalList");

const proposalsData = [
  { 
    role: "Frontend Developer", 
    company: "TechCorp", 
    status: "Viewed", 
    appliedDate: "2024-01-02", 
    fullName: "John Doe", 
    email: "john.doe@example.com", 
    experience: "3-5 years", 
    coverLetter: "I am very interested in this role because...", 
    optionalInfo: "Tell us anything you haven’t mentioned in your Resume." 
  },
  { 
    role: "UI/UX Designer", 
    company: "DesignHub", 
    status: "Accepted", 
    appliedDate: "2024-01-07", 
    fullName: "Jane Smith", 
    email: "jane.smith@example.com", 
    experience: "2-4 years", 
    coverLetter: "I specialize in user experience...", 
    optionalInfo: "Mentioned additional projects in portfolio." 
  },
  { 
    role: "React Engineer", 
    company: "InnovateX", 
    status: "Pending", 
    appliedDate: "2024-01-10", 
    fullName: "Alex Brown", 
    email: "alex.brown@example.com", 
    experience: "4-6 years", 
    coverLetter: "React enthusiast with 4 years of experience...", 
    optionalInfo: "Has certifications in React." 
  }
];

// Status badges (with proper colors)
function statusBadge(status) {
  if(status === "Accepted")
    return `<span class="px-3 py-1 rounded-full bg-green-500 text-white text-sm">✔ Accepted</span>`;
  if(status === "Viewed")
    return `<span class="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">👁 Viewed</span>`;
  return `<span class="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">⏳ Pending</span>`;
}

function loadProposals() {
  proposalList.innerHTML = "";

  proposalsData.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:shadow-lg transition duration-200";
    card.innerHTML = `
      <div class="mb-2 md:mb-0">
        <h3 class="font-semibold text-[var(--ink)] text-lg">${p.role}</h3>
        <p class="text-sm text-gray-500">Company: ${p.company}</p>
        <p class="text-sm text-gray-500">Applied on: ${p.appliedDate}</p>
      </div>
      <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
        ${statusBadge(p.status)}
        <a href="application.html?id=${index}" class="btn-primary text-sm px-4 py-1">View</a>
      </div>
    `;
    proposalList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProposals);
