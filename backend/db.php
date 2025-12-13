<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$port = 3308;        // MySQL port
$dbname = 'aidvault'; // Database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Start session
session_start();
?>
