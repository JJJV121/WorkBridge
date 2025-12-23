<!DOCTYPE html>
<html>
<head>
<title>Recruiter Dashboard</title>

<style>
body {
    font-family: Arial, sans-serif;
}

/* Chat button */
#chatBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #1e293b;
    color: white;
    font-size: 22px;
    border: none;
    cursor: pointer;
    z-index: 9999;
}

/* Chat box */
#chatBox {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 320px;
    height: 420px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    display: none;
    z-index: 9999;
}

/* Header */
#chatHeader {
    background: #1e293b;
    color: white;
    padding: 12px;
    text-align: center;
    border-radius: 12px 12px 0 0;
    font-weight: bold;
}

/* Messages */
#chatMessages {
    height: 260px;
    padding: 10px;
    overflow-y: auto;
    font-size: 14px;
    background: #f8fafc;
}

.user {
    background: #2563eb;
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    margin: 6px 0;
    max-width: 75%;
    margin-left: auto;
}

.bot {
    background: #e5e7eb;
    color: #111;
    padding: 6px 10px;
    border-radius: 10px;
    margin: 6px 0;
    max-width: 75%;
}

/* Menu buttons */
.menu-btn {
    width: 100%;
    padding: 8px;
    margin-top: 6px;
    border: none;
    border-radius: 8px;
    background: #eef2ff;
    cursor: pointer;
    text-align: left;
    font-size: 13px;
}

.menu-btn:hover {
    background: #e0e7ff;
}

/* Input */
#chatInput {
    display: flex;
    border-top: 1px solid #ddd;
}

#chatInput input {
    flex: 1;
    padding: 8px;
    border: none;
    outline: none;
}

#chatInput button {
    padding: 8px 12px;
    border: none;
    background: #2563eb;
    color: white;
    cursor: pointer;
}
</style>
</head>

<body>

<h2>Recruiter Dashboard</h2>
<p>Main dashboard page</p>

<!-- Chat Button -->
<button id="chatBtn" onclick="toggleChat()">💬</button>

<!-- Chatbot -->
<div id="chatBox">
    <div id="chatHeader">Recruiter Assistant</div>

    <div id="chatMessages">
        <div class="bot">
            Hello 👋 How can I help you today?

            <button class="menu-btn" onclick="sendMenu('post job')">📌 Post a Job</button>
            <button class="menu-btn" onclick="sendMenu('search freelancer')">🔍 Search Freelancer</button>
            <button class="menu-btn" onclick="sendMenu('reports')">📊 View Reports</button>
            <button class="menu-btn" onclick="sendMenu('contracts')">📁 Manage Contracts</button>
        </div>
    </div>

    <div id="chatInput">
        <input type="text" id="msg" placeholder="Type your message...">
        <button onclick="sendMsg()">Send</button>
    </div>
</div>

<script>
function toggleChat() {
    let box = document.getElementById("chatBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

// When menu button is clicked
function sendMenu(text) {
    document.getElementById("msg").value = text;
    sendMsg();
}

// Normal message send
function sendMsg() {
    let input = document.getElementById("msg");
    let message = input.value.trim();
    if (message === "") return;

    let chat = document.getElementById("chatMessages");

    chat.innerHTML += "<div class='user'>" + message + "</div>";
    input.value = "";

    fetch("chatbot.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "message=" + encodeURIComponent(message)
    })
    .then(res => res.text())
    .then(reply => {
        chat.innerHTML += "<div class='bot'>" + reply + "</div>";
        chat.scrollTop = chat.scrollHeight;
    });
}
</script>

</body>
</html>
