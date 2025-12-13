<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$port = 3308;          // your MySQL port
$dbname = 'workbridge'; // ✅ MUST BE workbridge

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("DB CONNECTION FAILED: " . $conn->connect_error);
}

session_start(); // ONLY HERE
