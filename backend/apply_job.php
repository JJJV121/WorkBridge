<?php
require "auth_guard.php";

$job_id = $_POST['job_id'];
$fid = $_SESSION['user_id'];

$conn->query(
  "INSERT INTO applications (job_id,freelancer_id)
   VALUES ($job_id,$fid)"
);

echo json_encode(["success"=>true]);
