const state = {
  user: {
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    skills: ["React", "JavaScript", "Tailwind"],
    profileStrength: 82,
    rating: 4.8
  },

  earnings: {
    available: 2450,
    escrow: 1200,
    withdrawn: 10000,
    monthly: [1200, 1800, 2400, 2100, 2800, 3200]
  },

  notifications: [
    "New job invitation from TechCorp",
    "Payment released for React App",
    "Client replied to your message"
  ]
};

// =============================
// TAB SWITCHING FUNCTION
// =============================
function showTab(tabId) {
  // Hide all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.add("hidden"));

  // Show selected tab
  const selected = document.getElementById(tabId);
  if(selected) selected.classList.remove("hidden");
}

// Show default tab on page load
document.addEventListener("DOMContentLoaded", () => {
  showTab("overview");
});
