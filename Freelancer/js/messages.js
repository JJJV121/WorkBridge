// Mock API for messaging (stores data in localStorage)
class MockMessagingAPI {
    constructor() {
        this.storageKey = 'workbridge_messages';
        this.conversationsKey = 'workbridge_conversations';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.conversationsKey)) {
            localStorage.setItem(this.conversationsKey, JSON.stringify([]));
        }
    }

    // Get all conversations for current user
    async getConversations() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conversations = JSON.parse(localStorage.getItem(this.conversationsKey) || '[]');
                // Filter conversations for current user
                const userConversations = conversations.filter(conv =>
                    conv.participants.includes(currentUser.id)
                );
                resolve(userConversations);
            }, 200); // Simulate network delay
        });
    }

    // Get messages for a conversation
    async getMessages(conversationId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const messages = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                const conversationMessages = messages.filter(msg =>
                    msg.conversationId === conversationId
                );
                resolve(conversationMessages);
            }, 200);
        });
    }

    // Send a message
    async sendMessage(messageData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const messages = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                const conversations = JSON.parse(localStorage.getItem(this.conversationsKey) || '[]');

                // Create message object
                const message = {
                    id: Date.now(),
                    senderId: messageData.senderId,
                    receiverId: messageData.receiverId,
                    senderType: messageData.senderType,
                    receiverType: messageData.receiverType,
                    message: messageData.message,
                    conversationId: messageData.conversationId,
                    timestamp: new Date().toISOString(),
                    isRead: false
                };

                // Add message to storage
                messages.push(message);
                localStorage.setItem(this.storageKey, JSON.stringify(messages));

                // Update or create conversation
                let conversation = conversations.find(c => c.conversation_id === messageData.conversationId);
                if (!conversation) {
                    conversation = {
                        conversation_id: messageData.conversationId,
                        participants: [messageData.senderId, messageData.receiverId],
                        other_user_id: messageData.receiverId,
                        other_user_type: messageData.receiverType,
                        last_message: messageData.message,
                        last_timestamp: message.timestamp,
                        unread_count: 0
                    };
                    conversations.push(conversation);
                } else {
                    conversation.last_message = messageData.message;
                    conversation.last_timestamp = message.timestamp;
                }

                localStorage.setItem(this.conversationsKey, JSON.stringify(conversations));

                resolve({
                    success: true,
                    messageId: message.id,
                    timestamp: message.timestamp
                });
            }, 300);
        });
    }

    // Mark messages as read
    async markAsRead(conversationId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const messages = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
                messages.forEach(msg => {
                    if (msg.conversationId === conversationId && msg.receiverId === currentUser.id) {
                        msg.isRead = true;
                    }
                });
                localStorage.setItem(this.storageKey, JSON.stringify(messages));
                resolve({ success: true });
            }, 100);
        });
    }
}

// Initialize mock API
const mockAPI = new MockMessagingAPI();

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.querySelector(".btn-primary");
const conversationList = document.querySelector('.space-y-3');

// Initialize Socket.IO connection
function initSocket() {
  // Socket functionality removed for simplified AJAX messaging
}

// Load conversations
async function loadConversations() {
  try {
    conversations = await mockAPI.getConversations();

    // If no conversations exist, create a default one for testing
    if (conversations.length === 0) {
      conversations = [{
        conversation_id: 'default_conv_1',
        other_user_id: 2,
        other_user_type: 'recruiter',
        last_message: 'Start a conversation...',
        last_timestamp: new Date().toISOString(),
        unread_count: 0
      }];
    }

    renderConversationList();

    // Auto-select the first conversation
    if (conversations.length > 0) {
      selectConversation(conversations[0]);
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
  }
}

// Load messages for a conversation
async function loadMessages(conversationId) {
  try {
    const messages = await mockAPI.getMessages(conversationId);
    renderMessages(messages);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Render conversation list
function renderConversationList() {
  conversationList.innerHTML = '<h3 class="font-semibold mb-2 text-indigo-600">Conversations</h3>';

  if (conversations.length === 0) {
    conversationList.innerHTML += '<p class="text-gray-500 text-sm">No conversations yet</p>';
    return;
  }

  conversations.forEach(conv => {
    const convDiv = document.createElement('div');
    convDiv.className = 'conversation-card flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-50 transition';
    convDiv.dataset.conversationId = conv.conversation_id;

    const unreadBadge = conv.unread_count > 0 ? `<span class="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${conv.unread_count}</span>` : '';

    convDiv.innerHTML = `
      <img src="https://i.pravatar.cc/40?u=${conv.other_user_id}" class="w-10 h-10 rounded-full"/>
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <b class="block">User ${conv.other_user_id}</b>
          ${unreadBadge}
        </div>
        <p class="text-sm text-slate-600 truncate">${conv.last_message || 'No messages yet'}</p>
      </div>
    `;

    convDiv.addEventListener('click', (e) => selectConversation(conv, e));
    conversationList.appendChild(convDiv);
  });
}

// Select a conversation
function selectConversation(conversation, event) {
  currentConversation = conversation.conversation_id;

  // Update UI
  document.querySelectorAll('.conversation-card').forEach(card => {
    card.classList.remove('bg-indigo-50');
  });
  event.currentTarget.classList.add('bg-indigo-50');

  document.querySelector('.md\\:col-span-2 h3').textContent = `Chat with User ${conversation.other_user_id}`;

  // Load messages
  loadMessages(currentConversation);

  // Mark as read
  markMessagesAsRead(currentConversation);
}

// Render messages in chat box
function renderMessages(messages) {
  chatBox.innerHTML = '';

  messages.forEach(message => {
    addMessageToChat(message, false);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add a message to the chat box
function addMessageToChat(message, animate = true) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `flex ${message.senderId == currentUser.id ? 'justify-end' : 'justify-start'}`;

  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  msgDiv.innerHTML = `
    <div class="flex flex-col ${message.senderId == currentUser.id ? 'items-end' : 'items-start'}">
      <p class="text-xs text-slate-500">${message.senderId == currentUser.id ? 'You' : `User ${message.senderId}`}</p>
      <div class="mt-1 px-4 py-2 rounded-2xl max-w-xs ${
        message.senderId == currentUser.id
          ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md'
          : 'bg-gray-200 text-gray-800 shadow-sm'
      } ${animate ? 'animate-fade-in' : ''}">
        ${message.message}
      </div>
      <p class="text-xs text-gray-400 mt-1">${timestamp}</p>
    </div>
  `;

  chatBox.appendChild(msgDiv);

  if (animate) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Send message
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  // If no conversation is selected, use the default one
  if (!currentConversation) {
    currentConversation = 'default_conv_1';
  }

  // Find the current conversation to get receiver info
  const currentConv = conversations.find(c => c.conversation_id === currentConversation);
  const receiverId = currentConv ? currentConv.other_user_id : 2;
  const receiverType = currentConv ? currentConv.other_user_type : 'recruiter';

  const messageData = {
    senderId: currentUser.id,
    receiverId: receiverId,
    senderType: currentUser.type,
    receiverType: receiverType,
    message: text,
    conversationId: currentConversation
  };

  try {
    const result = await mockAPI.sendMessage({
      senderId: currentUser.id,
      receiverId: receiverId,
      senderType: currentUser.type,
      receiverType: receiverType,
      message: text,
      conversationId: currentConversation
    });

    if (result.success) {
      // Add the message to the chat immediately
      const messageObj = {
        id: result.messageId,
        senderId: currentUser.id,
        receiverId: receiverId,
        senderType: currentUser.type,
        receiverType: receiverType,
        message: text,
        conversationId: currentConversation,
        timestamp: result.timestamp,
        isRead: false
      };

      addMessageToChat(messageObj);
      messageInput.value = '';

      // Reload conversations to update the list
      loadConversations();
    } else {
      alert('Failed to send message: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Error sending message. Check console for details.');
  }

// Mark messages as read
async function markMessagesAsRead(conversationId) {
  try {
    await mockAPI.markAsRead(conversationId);
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}

// Show typing indicator
function showTypingIndicator(data) {
  // Implementation for typing indicator
}

// Event listeners
if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
} else {
  console.error('Send button not found!');
}

messageInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission
    sendMessage();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadConversations();
});
