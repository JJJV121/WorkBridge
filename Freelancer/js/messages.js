// Mock conversations data
const conversations = {
  "TechCorp": [
    { from: "Client - TechCorp", text: "Can you complete milestone 2 by Friday?" },
    { from: "You", text: "Yes, I’ll deliver it by Thursday evening." },
    { from: "Client - TechCorp", text: "Great, looking forward to it." }
  ],
  "DesignStudio": [
    { from: "Client - DesignStudio", text: "Please share updated wireframes." },
    { from: "You", text: "Sure, sending them by EOD today." },
    { from: "Client - DesignStudio", text: "Thanks! Looking forward to it." }
  ]
};

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.querySelector(".btn-primary");
let currentConversation = "TechCorp";

function renderMessages() {
  chatBox.innerHTML = "";
  const messages = conversations[currentConversation];
  messages.forEach(m => {
    const msgDiv = document.createElement("div");
    msgDiv.className = `flex ${m.from === "You" ? "justify-end" : "justify-start"}`;

    const timestamp = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    msgDiv.innerHTML = `
      <div class="flex flex-col ${m.from === "You" ? "items-end" : "items-start"}">
        <p class="text-xs text-slate-500">${m.from}</p>
        <div class="mt-1 px-4 py-2 rounded-2xl max-w-xs ${
          m.from === "You" ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md" : "bg-gray-200 text-gray-800 shadow-sm"
        } transition-transform transform hover:scale-105">
          ${m.text}
        </div>
        <p class="text-xs text-gray-400 mt-1">${timestamp}</p>
      </div>
    `;
    chatBox.appendChild(msgDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Initial render
renderMessages();

// Send message
sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (!text) return;
  conversations[currentConversation].push({ from: "You", text });
  messageInput.value = "";
  renderMessages();
});

// Send message on Enter key
messageInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Conversation switch
const conversationCards = document.querySelectorAll(".conversation-card");
conversationCards.forEach(div => {
  div.addEventListener("click", () => {
    currentConversation = div.querySelector("b").textContent;
    document.querySelector(".md\\:col-span-2 h3").textContent = `Client – ${currentConversation}`;

    // Highlight active
    conversationCards.forEach(card => card.classList.remove("bg-indigo-50"));
    div.classList.add("bg-indigo-50");

    renderMessages();
  });
});
