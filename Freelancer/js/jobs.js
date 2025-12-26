const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    experience: "1–3 yrs",
    skills: "React, Tailwind",
    category: "Web Development",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudCore",
    location: "Bengaluru (Hybrid)",
    experience: "2–4 yrs",
    skills: "Node.js, PostgreSQL",
    category: "Web Development",
    type: "Full-time"
  },
  {
    id: 3,
    title: "UI / UX Designer",
    company: "Designify",
    location: "Remote",
    experience: "0–2 yrs",
    skills: "Figma, Wireframing",
    category: "UI / UX",
    type: "Contract"
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "DataWorks",
    location: "Remote",
    experience: "1–3 yrs",
    skills: "Python, SQL",
    category: "Data Science",
    type: "Full-time"
  },
  {
    id: 5,
    title: "ML Engineer",
    company: "AI Labs",
    location: "Remote",
    experience: "2–4 yrs",
    skills: "Model Training",
    category: "Machine Learning",
    type: "Full-time"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraStack",
    location: "Hyderabad",
    experience: "3–5 yrs",
    skills: "AWS, Docker",
    category: "DevOps",
    type: "Full-time"
  },
  {
    id: 7,
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Remote",
    experience: "1–3 yrs",
    skills: "Flutter / React Native",
    category: "Mobile Development",
    type: "Contract"
  }
];

const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderJobs(jobs) {
  jobList.innerHTML = "";

  jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "card job-card";

    card.innerHTML = `
      <h3>${job.title}</h3>

      <p class="font-medium text-sm mt-1">
        ${job.company} • ${job.location}
      </p>

      <p class="text-sm text-muted mt-1">
        Experience: ${job.experience}
      </p>

      <p class="text-sm text-muted mt-1">
        ${job.skills}
      </p>

      <div class="flex gap-2 mt-3">
        <span class="badge">${job.type}</span>
        <span class="badge">${job.category}</span>
      </div>

      <a href="apply.html?job=${job.id}" class="btn-primary mt-4 text-center">
        Apply Now
      </a>
    `;

    jobList.appendChild(card);
  });
}

function filterJobs() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = jobsData.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.skills.toLowerCase().includes(search);

    const matchesCategory =
      category === "All Categories" || job.category === category;

    return matchesSearch && matchesCategory;
  });

  renderJobs(filtered);
}

searchInput.addEventListener("keyup", filterJobs);
categoryFilter.addEventListener("change", filterJobs);

renderJobs(jobsData);
