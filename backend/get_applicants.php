<?php
require "auth_guard.php";

$rid = $_SESSION['user_id'];

$res = $conn->query(
  "SELECT users.name, applications.status, jobs.title
   FROM applications
   JOIN users ON users.id=applications.freelancer_id
   JOIN jobs ON jobs.id=applications.job_id
   WHERE jobs.recruiter_id=$rid"
);

echo json_encode($res->fetch_all(MYSQLI_ASSOC));
