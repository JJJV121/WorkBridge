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

// Track the current conversation
let currentConversation = "TechCorp";

// Render messages for the current conversation
function renderMessages() {
  chatBox.innerHTML = "";
  const messages = conversations[currentConversation];
  messages.forEach(m => {
    const msgDiv = document.createElement("div");
    msgDiv.className = m.from === "You" ? "text-right" : "text-left";

    msgDiv.innerHTML = `
      <p class="text-sm text-slate-500">${m.from}</p>
      <div class="inline-block mt-1 px-3 py-2 rounded ${
        m.from === "You" ? "bg-indigo-600 text-white" : "bg-slate-100"
      }">
        ${m.text}
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
  if (text === "") return;

  conversations[currentConversation].push({ from: "You", text });
  messageInput.value = "";
  renderMessages();
});

// Send message on Enter key
messageInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Handle conversation switch
document.querySelectorAll(".card div.p-3").forEach(div => {
  div.addEventListener("click", () => {
    const name = div.querySelector("b").textContent;
    currentConversation = name;

    // Update chat header
    document.querySelector(".md\\:col-span-2 h3").textContent = `Client – ${currentConversation}`;

    renderMessages();
  });
});

// Handle conversation switch
const conversationCards = document.querySelectorAll(".card div.p-3");

conversationCards.forEach(div => {
  div.addEventListener("click", () => {
    const name = div.querySelector("b").textContent;
    currentConversation = name;

    // Update chat header
    document.querySelector(".md\\:col-span-2 h3").textContent = `Client – ${currentConversation}`;

    // Remove highlight from all cards
    conversationCards.forEach(card => card.classList.remove("bg-indigo-50"));
    conversationCards.forEach(card => card.classList.remove("hover:bg-slate-50"));
    
    // Add highlight to the clicked card
    div.classList.add("bg-indigo-50");

    renderMessages();
  });
});
