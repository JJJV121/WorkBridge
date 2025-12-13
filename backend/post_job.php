<?php
require "auth_guard.php";

$title = $_POST['title'];
$desc  = $_POST['description'];
$budget= $_POST['budget'];
$type  = $_POST['job_type'];
$rid   = $_SESSION['user_id'];

$stmt = $conn->prepare(
  "INSERT INTO jobs (recruiter_id,title,description,budget,job_type)
   VALUES (?,?,?,?,?)"
);
$stmt->bind_param("issss",$rid,$title,$desc,$budget,$type);
$stmt->execute();

echo json_encode(["success"=>true]);
