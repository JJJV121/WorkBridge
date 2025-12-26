<?php
header("Content-Type: application/json");
require "db.php";

$email = $_POST['email'];
$pass  = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

if ($user && password_verify($pass,$user['password'])) {
  $_SESSION['user_id'] = $user['id'];
  $_SESSION['role'] = $user['role'];

  echo json_encode(["success"=>true,"role"=>$user['role']]);
} else {
  echo json_encode(["success"=>false]);
}
