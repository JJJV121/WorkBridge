<?php
require "db.php";

$email = $_POST['email'];
$res = $conn->query("SELECT id FROM users WHERE email='$email'");

if ($res->num_rows > 0) {
  echo json_encode(["success"=>true,"msg"=>"Reset link sent (demo)"]);
} else {
  echo json_encode(["success"=>false,"msg"=>"Email not found"]);
}
