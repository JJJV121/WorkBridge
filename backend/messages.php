<?php
require "db.php";
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get user info from session (or use defaults for testing)
$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1; // Default to freelancer (1) for testing
$userType = isset($_SESSION['user_type']) ? $_SESSION['user_type'] : 'freelancer'; // Default to freelancer for testing

// Get conversations for user
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'conversations') {
    $query = "
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
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssssssss", $userId, $userType, $userId, $userType, $userId, $userType, $userId, $userType, $userId, $userType);
    $stmt->execute();
    $result = $stmt->get_result();

    $conversations = [];
    while ($row = $result->fetch_assoc()) {
        $conversations[] = $row;
    }

    echo json_encode($conversations);
    exit;
}

// Get messages for a conversation
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['conversation_id'])) {
    $conversationId = $_GET['conversation_id'];

    $query = "
        SELECT * FROM messages
        WHERE conversation_id = ?
        ORDER BY timestamp ASC
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $conversationId);
    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);
    exit;
}

// Send a message
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['receiverId']) || !isset($data['message']) || !isset($data['conversationId'])) {
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    $receiverId = $data['receiverId'];
    $receiverType = $data['receiverType'];
    $message = trim($data['message']);
    $conversationId = $data['conversationId'];

    if (empty($message)) {
        echo json_encode(['error' => 'Message cannot be empty']);
        exit;
    }

    $query = "
        INSERT INTO messages (sender_id, receiver_id, sender_type, receiver_type, message, conversation_id)
        VALUES (?, ?, ?, ?, ?, ?)
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssss", $userId, $receiverId, $userType, $receiverType, $message, $conversationId);

    if ($stmt->execute()) {
        $messageId = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'messageId' => $messageId,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    } else {
        echo json_encode(['error' => 'Failed to send message']);
    }
    exit;
}

// Mark messages as read
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['action']) && $_GET['action'] === 'mark_read') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['conversationId'])) {
        echo json_encode(['error' => 'Missing conversation ID']);
        exit;
    }

    $conversationId = $data['conversationId'];

    $query = "
        UPDATE messages
        SET is_read = TRUE
        WHERE conversation_id = ? AND receiver_id = ? AND receiver_type = ?
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $conversationId, $userId, $userType);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'updated' => $stmt->affected_rows]);
    } else {
        echo json_encode(['error' => 'Failed to mark messages as read']);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request']);
?>