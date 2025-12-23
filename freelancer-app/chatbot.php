<?php
$message = strtolower($_POST['message'] ?? "");

if ($message == "") {
    echo "Please choose an option or type a message.";
}
elseif ($message == "post job") {
    echo "📌 You can post a new job by adding role, skills, duration, and payment details.";
}
elseif ($message == "search freelancer") {
    echo "🔍 You can search freelancers based on skills, experience, and hourly rate.";
}
elseif ($message == "reports") {
    echo "📊 Reports show total jobs posted, payments made, and pending amounts.";
}
elseif ($message == "contracts") {
    echo "📁 Contracts help you manage active and completed freelancer work.";
}
else {
    echo "I’m here to assist you with hiring, searching freelancers, and reports.";
}
?>
