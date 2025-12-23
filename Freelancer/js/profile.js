// Load user from localStorage if available
let user = JSON.parse(localStorage.getItem("user")) || {
  name: "John Doe",
  email: "john.doe@email.com",
  role: "Frontend Developer",
  skills: ["React", "Tailwind", "JavaScript"],
  profileStrength: 82
};

// Pre-fill input fields
const nameInput = document.querySelector("input[value='John Doe']");
const emailInput = document.querySelector("input[value='john.doe@email.com']");
const roleInput = document.querySelector("input[value='Frontend Developer']");
const skillsInput = document.querySelector("input[value='React, Tailwind, JavaScript']");

nameInput.value = user.name;
emailInput.value = user.email;
roleInput.value = user.role;
skillsInput.value = user.skills.join(", ");

// Function to show custom toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = `
    fixed bottom-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg
    flex items-center space-x-3 animate-slideIn
    z-50
  `;
  toast.innerHTML = `
    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("opacity-0", "transition", "duration-500");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Add Tailwind animation via style
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slideIn { animation: slideIn 0.4s ease-out; }
`;
document.head.appendChild(style);

// Save button functionality
document.querySelector(".btn-primary").addEventListener("click", () => {
  user.name = nameInput.value.trim();
  user.email = emailInput.value.trim();
  user.role = roleInput.value.trim();
  user.skills = skillsInput.value.split(",").map(s => s.trim());

  let filled = [user.name, user.email, user.role, user.skills.length > 0].filter(Boolean).length;
  user.profileStrength = Math.min(100, Math.round((filled / 4) * 100));

  localStorage.setItem("user", JSON.stringify(user));
  document.querySelector(".card b").textContent = user.profileStrength + "%";

  // Show custom toast
  showToast("Profile saved successfully!");
});
