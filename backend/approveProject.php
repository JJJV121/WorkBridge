<?php
header("Content-Type: application/json");

// Fake delay (optional)
sleep(1);

// Simulate success / failure
$success = rand(0,1);

if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Project approved successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Project already approved"
    ]);
}
