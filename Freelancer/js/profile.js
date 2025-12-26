// Sample user data
let user = JSON.parse(localStorage.getItem("user")) || {
  name: "John Doe",
  email: "john.doe@email.com",
  role: "Frontend Developer",
  skills: ["React", "Tailwind", "JavaScript"],
  experience: 3,
  github: "https://github.com/sample",
  linkedin: "https://linkedin.com/in/sample",
  location: "City, Country",
  profilePic: "https://i.pravatar.cc/100",
  resume: "sample_resume.pdf",
  resumeDate: "Today"
};

// Inputs
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const roleInput = document.getElementById("roleInput");
const skillsInput = document.getElementById("skillsInput");
const experienceInput = document.getElementById("experienceInput");
const githubInput = document.getElementById("githubInput");
const linkedinInput = document.getElementById("linkedinInput");
const locationInput = document.getElementById("locationInput");
const profilePicPreview = document.getElementById("profilePicPreview");
const resumeName = document.getElementById("resumeName");
const resumeDate = document.getElementById("resumeDate");

// Pre-fill form
nameInput.value = user.name;
emailInput.value = user.email;
roleInput.value = user.role;
skillsInput.value = user.skills.join(", ");
experienceInput.value = user.experience;
githubInput.value = user.github;
linkedinInput.value = user.linkedin;
locationInput.value = user.location;
profilePicPreview.src = user.profilePic;
resumeName.textContent = user.resume;
resumeDate.textContent = "Last updated: " + user.resumeDate;

// Profile picture upload
document.getElementById("profilePicUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    profilePicPreview.src = reader.result;
    user.profilePic = reader.result;
    calculateProfileStrength();
  };
  reader.readAsDataURL(file);
});

// Resume upload
document.getElementById("resumeUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  user.resume = file.name;
  user.resumeDate = new Date().toLocaleDateString();
  resumeName.textContent = user.resume;
  resumeDate.textContent = "Last updated: " + user.resumeDate;
  calculateProfileStrength();
});

// Calculate profile strength
function calculateProfileStrength() {
  let filled = 0;
  if (nameInput.value.trim()) filled++;
  if (emailInput.value.trim()) filled++;
  if (roleInput.value.trim()) filled++;
  if (skillsInput.value.trim()) filled++;
  if (experienceInput.value.trim()) filled++;
  if (githubInput.value.trim()) filled++;
  if (linkedinInput.value.trim()) filled++;
  if (locationInput.value.trim()) filled++;
  if (user.profilePic) filled++;
  if (user.resume) filled++;
  let strength = Math.min(100, Math.round((filled / 10) * 100));
  document.getElementById("profileStrength").textContent = strength + "%";
  document.getElementById("strengthBar").style.width = strength + "%";
}

// Run on load
calculateProfileStrength();

// Update dynamically
[nameInput,emailInput,roleInput,skillsInput,experienceInput,githubInput,linkedinInput,locationInput].forEach(input=>{
  input.addEventListener("input", calculateProfileStrength);
});

// Save button
document.getElementById("saveBtn").addEventListener("click", () => {
  user.name = nameInput.value.trim();
  user.email = emailInput.value.trim();
  user.role = roleInput.value.trim();
  user.skills = skillsInput.value.split(",").map(s => s.trim());
  user.experience = experienceInput.value.trim();
  user.github = githubInput.value.trim();
  user.linkedin = linkedinInput.value.trim();
  user.location = locationInput.value.trim();
  localStorage.setItem("user", JSON.stringify(user));
  calculateProfileStrength();
  alert("Profile saved successfully!");
});
