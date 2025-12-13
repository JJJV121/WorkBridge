<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require "db.php"; // session_start() is ONLY here

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
    exit;
}

$name  = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$pass  = $_POST["password"] ?? "";
$role  = $_POST["role"] ?? "";

if ($name === "" || $email === "" || $pass === "" || $role === "") {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

/* Check email */
$check = $conn->prepare("SELECT id FROM users WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Email already exists"]);
    exit;
}

/* Insert user */
$hashed = password_hash($pass, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $name, $email, $hashed, $role);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => "User insert failed"]);
    exit;
}

$user_id = $stmt->insert_id;

/* Role-specific insert */
if ($role === "freelancer") {

    $skills = $_POST["skills"] ?? "";
    $rate   = floatval($_POST["hourly_rate"] ?? 0);

    $stmt2 = $conn->prepare(
        "INSERT INTO freelancer_profiles (user_id, skills, hourly_rate)
         VALUES (?, ?, ?)"
    );
    $stmt2->bind_param("isd", $user_id, $skills, $rate);
    $stmt2->execute();

} elseif ($role === "recruiter") {

    $company = $_POST["company_name"] ?? "";
    $website = $_POST["website"] ?? "";

    $stmt2 = $conn->prepare(
        "INSERT INTO recruiter_profiles (user_id, company_name, website)
         VALUES (?, ?, ?)"
    );
    $stmt2->bind_param("iss", $user_id, $company, $website);
    $stmt2->execute();
}

/* Session */
$_SESSION["user_id"] = $user_id;
$_SESSION["role"]    = $role;

echo json_encode([
    "success" => true,
    "role" => $role
]);
