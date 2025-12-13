<?php
require "auth_guard.php";

$rid = $_SESSION['user_id'];

$jobs = $conn->query(
  "SELECT COUNT(*) c FROM jobs WHERE recruiter_id=$rid"
)->fetch_assoc()['c'];

$app = $conn->query(
  "SELECT COUNT(*) c FROM applications
   JOIN jobs ON jobs.id=applications.job_id
   WHERE recruiter_id=$rid"
)->fetch_assoc()['c'];

echo json_encode([
  "jobs"=>$jobs,
  "applications"=>$app
]);
