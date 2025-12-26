const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'workbridge',
  port: 3308
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create messages table if it doesn't exist
const createMessagesTable = `
  CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    sender_type ENUM('freelancer', 'recruiter') NOT NULL,
    receiver_type ENUM('freelancer', 'recruiter') NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    conversation_id VARCHAR(255) NOT NULL,
    INDEX idx_conversation (conversation_id),
    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id)
  )
`;

db.query(createMessagesTable, (err) => {
  if (err) {
    console.error('Error creating messages table:', err);
  } else {
    console.log('Messages table ready');
  }
});

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins their room
  socket.on('join', (userData) => {
    console.log('Join event received:', userData); // Debug log
    const userId = userData.userId || userData.id;
    const userType = userData.userType || userData.type;
    const roomId = `${userType}_${userId}`;
    socket.join(roomId);
    connectedUsers.set(socket.id, { userId, userType, roomId });
    console.log(`User ${userId} (${userType}) joined room ${roomId}`);
  });

  // Handle sending message
  socket.on('sendMessage', (messageData) => {
    const { senderId, receiverId, senderType, receiverType, message, conversationId } = messageData;

    // Save message to database
    const query = `
      INSERT INTO messages (sender_id, receiver_id, sender_type, receiver_type, message, conversation_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [senderId, receiverId, senderType, receiverType, message, conversationId], (err, result) => {
      if (err) {
        console.error('Error saving message:', err);
        socket.emit('messageError', { error: 'Failed to save message' });
        return;
      }

      const messageId = result.insertId;
      const messageObj = {
        id: messageId,
        senderId,
        receiverId,
        senderType,
        receiverType,
        message,
        conversationId,
        timestamp: new Date(),
        isRead: false
      };

      // Send to receiver if online
      const receiverRoom = `${receiverType}_${receiverId}`;
      io.to(receiverRoom).emit('newMessage', messageObj);

      // Send confirmation to sender
      socket.emit('messageSent', messageObj);
    });
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const { conversationId, isTyping } = data;
    socket.to(conversationId).emit('userTyping', { userId: connectedUsers.get(socket.id)?.userId, isTyping });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const userData = connectedUsers.get(socket.id);
    if (userData) {
      console.log(`User ${userData.userId} (${userData.userType}) disconnected`);
      connectedUsers.delete(socket.id);
    }
  });
});

// API endpoint to get messages for a conversation
app.get('/api/messages/:conversationId', (req, res) => {
  const { conversationId } = req.params;

  const query = `
    SELECT * FROM messages
    WHERE conversation_id = ?
    ORDER BY timestamp ASC
  `;

  db.query(query, [conversationId], (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }

    res.json(results);
  });
});

// API endpoint to get conversations for a user
app.get('/api/conversations/:userId/:userType', (req, res) => {
  const { userId, userType } = req.params;

  const query = `
    SELECT DISTINCT
      conversation_id,
      CASE
        WHEN sender_id = ? AND sender_type = ? THEN receiver_id
        ELSE sender_id
      END as other_user_id,
      CASE
        WHEN sender_id = ? AND sender_type = ? THEN receiver_type
        ELSE sender_type
      END as other_user_type,
      (SELECT message FROM messages WHERE conversation_id = m.conversation_id ORDER BY timestamp DESC LIMIT 1) as last_message,
      (SELECT timestamp FROM messages WHERE conversation_id = m.conversation_id ORDER BY timestamp DESC LIMIT 1) as last_timestamp,
      (SELECT COUNT(*) FROM messages WHERE conversation_id = m.conversation_id AND receiver_id = ? AND receiver_type = ? AND is_read = FALSE) as unread_count
    FROM messages m
    WHERE (sender_id = ? AND sender_type = ?) OR (receiver_id = ? AND receiver_type = ?)
    ORDER BY last_timestamp DESC
  `;

  db.query(query, [userId, userType, userId, userType, userId, userType, userId, userType, userId, userType], (err, results) => {
    if (err) {
      console.error('Error fetching conversations:', err);
      return res.status(500).json({ error: 'Failed to fetch conversations' });
    }

    res.json(results);
  });
});

// API endpoint to mark messages as read
app.put('/api/messages/read/:conversationId/:userId/:userType', (req, res) => {
  const { conversationId, userId, userType } = req.params;

  const query = `
    UPDATE messages
    SET is_read = TRUE
    WHERE conversation_id = ? AND receiver_id = ? AND receiver_type = ?
  `;

  db.query(query, [conversationId, userId, userType], (err, result) => {
    if (err) {
      console.error('Error marking messages as read:', err);
      return res.status(500).json({ error: 'Failed to mark messages as read' });
    }

    res.json({ success: true, updated: result.affectedRows });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Real-time server running on port ${PORT}`);
});