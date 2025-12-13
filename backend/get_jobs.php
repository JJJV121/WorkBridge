<?php
require "auth_guard.php";

$res = $conn->query(
  "SELECT jobs.*, users.name AS company
   FROM jobs JOIN users ON users.id=jobs.recruiter_id"
);

echo json_encode($res->fetch_all(MYSQLI_ASSOC));
