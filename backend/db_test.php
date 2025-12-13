<?php
require "db.php";

$res = $conn->query("SELECT COUNT(*) AS total FROM users");
$row = $res->fetch_assoc();

echo "USERS TABLE OK. COUNT = " . $row['total'];
