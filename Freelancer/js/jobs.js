// jobs.js

// Mock jobs dataset
const jobsData = [
  { id: 1, title: "Frontend Developer", company: "LinkedIn", role: "Frontend", status: "Interviewed", applied_date: "2024-01-02" },
  { id: 2, title: "Backend Developer", company: "Referral", role: "Backend", status: "Hired", applied_date: "2024-01-05", hired_date: "2024-01-20", recruiter: "Rahul" },
  { id: 3, title: "UI/UX Designer", company: "Website", role: "UI/UX", status: "Rejected", applied_date: "2024-01-07" },
  { id: 4, title: "Full Stack Developer", company: "LinkedIn", role: "Full Stack", status: "Hired", applied_date: "2024-01-10", hired_date: "2024-01-25", recruiter: "Anita" },
  { id: 5, title: "Data Analyst", company: "DataWorks", role: "Analytics", status: "Interviewed", applied_date: "2024-02-01" },
  { id: 6, title: "Machine Learning Engineer", company: "AI Labs", role: "ML/AI", status: "Rejected", applied_date: "2024-02-03" },
  { id: 7, title: "DevOps Engineer", company: "CloudTech", role: "DevOps", status: "Hired", applied_date: "2024-02-05", hired_date: "2024-02-20", recruiter: "Sonia" },
  { id: 8, title: "Mobile App Developer", company: "AppWorks", role: "Mobile", status: "Interviewed", applied_date: "2024-02-07" },
  { id: 9, title: "Product Manager", company: "StartupHub", role: "Management", status: "Rejected", applied_date: "2024-02-10" },
  { id: 10, title: "Cloud Architect", company: "Tech Solutions", role: "Cloud", status: "Hired", applied_date: "2024-02-12", hired_date: "2024-02-28", recruiter: "Vikram" },
  { id: 11, title: "QA Engineer", company: "QualitySoft", role: "QA", status: "Interviewed", applied_date: "2024-02-15" },
  { id: 12, title: "React Developer", company: "Webify", role: "Frontend", status: "Hired", applied_date: "2024-02-18", hired_date: "2024-03-05", recruiter: "Meera" }
];

// DOM Elements
const jobList = document.getElementById("jobList");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Function to render jobs
function renderJobs(jobs) {
  jobList.innerHTML = ""; // clear previous

  if (jobs.length === 0) {
    jobList.innerHTML = `<p class="text-gray-500 col-span-full">No jobs found</p>`;
    return;
  }

  jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200 flex flex-col gap-2 border border-gray-200";

    // Color-coded status badges
    let statusClass = "";
    if (job.status === "Hired") statusClass = "bg-green-100 text-green-700";
    else if (job.status === "Interviewed") statusClass = "bg-yellow-100 text-yellow-700";
    else if (job.status === "Rejected") statusClass = "bg-red-100 text-red-700";

    jobCard.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-900">${job.title}</h3>
      <p class="text-gray-600 text-sm">${job.role} • ${job.company}</p>
      <p class="text-gray-500 text-xs">Applied: ${job.applied_date}</p>
      ${job.hired_date ? `<p class="text-green-600 font-medium text-sm">Hired on: ${job.hired_date}</p>` : ""}
      <span class="inline-block mt-2 px-2 py-1 text-sm rounded-full ${statusClass}">${job.status}</span>
      <button class="mt-3 btn-primary w-full">Apply Now</button>
    `;

    jobList.appendChild(jobCard);
  });
}

// Filter jobs based on status and search
function filterJobs() {
  const selectedStatus = statusFilter.value; // All, Hired, Interviewed, Rejected
  const searchText = searchInput.value.toLowerCase();

  const filteredJobs = jobsData.filter(job => {
    const matchesStatus = selectedStatus === "" || job.status === selectedStatus;
    const matchesSearch = job.title.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.role.toLowerCase().includes(searchText);
    return matchesStatus && matchesSearch;
  });

  renderJobs(filteredJobs);
}

// Initial render
renderJobs(jobsData);

// Event listeners
statusFilter.addEventListener("change", filterJobs);
searchBtn.addEventListener("click", filterJobs);
searchInput.addEventListener("keyup", function(e) {
  if (e.key === "Enter") filterJobs();
});
