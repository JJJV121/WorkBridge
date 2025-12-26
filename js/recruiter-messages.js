// Simple messaging for recruiter dashboard (mock API)
let currentUser = {
  id: 2, // This should come from session/user auth
  type: 'recruiter'
};
let currentConversation = null;
let conversations = [];

// DOM elements
// const messagesSection = document.getElementById('messages'); // Moved to init function

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
            }, 200);
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

// Load conversations
async function loadRecruiterConversations() {
  try {
    conversations = await mockAPI.getConversations();

    // If no conversations exist, create a default one for testing
    if (conversations.length === 0) {
      conversations = [{
        conversation_id: 'default_conv_2',
        other_user_id: 1,
        other_user_type: 'freelancer',
        last_message: 'Start a conversation...',
        last_timestamp: new Date().toISOString(),
        unread_count: 0
      }];
    }

    renderRecruiterConversationList();

    // Auto-select the first conversation
    if (conversations.length > 0) {
      selectRecruiterConversation(conversations[0]);
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
  }
}

// Load messages for a conversation
async function loadRecruiterMessages(conversationId) {
  try {
    const messages = await mockAPI.getMessages(conversationId);
    renderRecruiterMessages(messages);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Render conversation list
function renderRecruiterConversationList() {
  const messagesSection = document.getElementById('messages');
  const conversationList = messagesSection.querySelector('.space-y-2');
  conversationList.innerHTML = '';

  if (conversations.length === 0) {
    conversationList.innerHTML = '<p class="text-gray-500 text-sm p-3">No conversations yet</p>';
    return;
  }

  conversations.forEach(conv => {
    const convDiv = document.createElement('div');
    convDiv.className = 'p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors conversation-item';
    convDiv.dataset.conversationId = conv.conversation_id;

    const unreadBadge = conv.unread_count > 0 ? `<div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>` : '';

    convDiv.innerHTML = `
      ${unreadBadge}
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center space-x-2">
          <img src="https://picsum.photos/32?random=${conv.other_user_id}" class="w-8 h-8 rounded-full">
          <div>
            <div class="font-medium text-sm">User ${conv.other_user_id}</div>
            <div class="text-xs text-gray-600">Freelancer</div>
          </div>
        </div>
        <div class="text-xs text-gray-500">${new Date(conv.last_timestamp).toLocaleDateString()}</div>
      </div>
      <div class="text-sm text-gray-700 truncate">${conv.last_message || 'No messages yet'}</div>
    `;

    convDiv.addEventListener('click', () => selectRecruiterConversation(conv));
    conversationList.appendChild(convDiv);
  });
}

// Select a conversation
function selectRecruiterConversation(conversation) {
  const messagesSection = document.getElementById('messages');
  currentConversation = conversation.conversation_id;

  // Update UI
  messagesSection.querySelectorAll('.conversation-item').forEach(item => {
    item.classList.remove('bg-indigo-50', 'border-indigo-200');
    item.classList.add('border-gray-200');
  });
  event.currentTarget.classList.add('bg-indigo-50', 'border-indigo-200');
  event.currentTarget.classList.remove('border-gray-200');

  // Update chat header
  const chatHeader = messagesSection.querySelector('.border-b');
  chatHeader.innerHTML = `
    <div class="flex items-center space-x-3 p-4">
      <img src="https://picsum.photos/40?random=${conversation.other_user_id}" class="w-10 h-10 rounded-full">
      <div>
        <div class="font-medium">User ${conversation.other_user_id}</div>
        <div class="text-sm text-gray-600">Freelancer • Online</div>
      </div>
      <div class="ml-auto flex space-x-2">
        <button class="action-btn text-gray-600 hover:text-gray-900 p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Load messages
  loadRecruiterMessages(currentConversation);

  // Mark as read
  markRecruiterMessagesAsRead(currentConversation);
}

// Render messages in chat box
function renderRecruiterMessages(messages) {
  const messagesSection = document.getElementById('messages');
  const chatBox = messagesSection.querySelector('.overflow-y-auto');
  chatBox.innerHTML = '';

  messages.forEach(message => {
    addMessageToRecruiterChat(message, false);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add a message to the chat box
function addMessageToRecruiterChat(message, animate = true) {
  const messagesSection = document.getElementById('messages');
  const chatBox = messagesSection.querySelector('.overflow-y-auto');
  const msgDiv = document.createElement('div');
  msgDiv.className = `flex ${message.senderId == currentUser.id ? 'justify-end' : 'justify-start'}`;

  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  msgDiv.innerHTML = `
    <div class="bg-${message.senderId == currentUser.id ? 'indigo-600 text-white' : 'gray-100'} rounded-lg px-4 py-2 max-w-xs">
      <div class="text-sm">${message.message}</div>
      <div class="text-xs ${message.senderId == currentUser.id ? 'text-indigo-200' : 'text-gray-500'} mt-1">${timestamp}</div>
    </div>
  `;

  chatBox.appendChild(msgDiv);

  if (animate) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Send message
async function sendRecruiterMessage() {
  const messagesSection = document.getElementById('messages');
  const input = messagesSection.querySelector('input[type="text"]');
  const text = input.value.trim();
  if (!text) return;

  // If no conversation is selected, use the default one
  if (!currentConversation) {
    currentConversation = 'default_conv_2';
  }

  // Find the current conversation to get receiver info
  const currentConv = conversations.find(c => c.conversation_id === currentConversation);
  const receiverId = currentConv ? currentConv.other_user_id : 1;
  const receiverType = currentConv ? currentConv.other_user_type : 'freelancer';

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

      addMessageToRecruiterChat(messageObj);
      input.value = '';

      // Reload conversations to update the list
      loadRecruiterConversations();
    } else {
      alert('Failed to send message: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Error sending message. Check console for details.');
  }
}

// Mark messages as read
async function markRecruiterMessagesAsRead(conversationId) {
  try {
    await mockAPI.markAsRead(conversationId);
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}

// Event listeners for recruiter messages
function initRecruiterMessageEvents(messagesSection) {
  const sendBtn = messagesSection.querySelector('button.action-btn.bg-indigo-600');
  const input = messagesSection.querySelector('input[type="text"]');

  if (sendBtn) {
    sendBtn.addEventListener('click', sendRecruiterMessage);
  }

  if (input) {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default form submission
        sendRecruiterMessage();
      }
    });
  }
}

// Initialize when messages section is shown
function initRecruiterMessages() {
  const messagesSection = document.getElementById('messages');
  loadRecruiterConversations();
  initRecruiterMessageEvents(messagesSection);
}