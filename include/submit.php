<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') 
{
    echo json_encode(['status' => 'error']);
    exit;
}

include '../PHPMailer/src/PHPMailer.php';
include '../PHPMailer/src/SMTP.php';
include '../PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

// echo "princess";

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';            // SMTP Host
    $mail->SMTPAuth   = true;
    $mail->Username   = 'preciousprople@gmail.com';  // SMTP Email
    $mail->Password   = 'yytdakchkqoxevux';          // App Password 
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Email content
    $mail->setFrom('preciousprople@gmail.com', $_POST['name']);  // Sender
    $mail->addReplyTo($_POST['email'], $_POST['name']);          // Reply to Sender
    $mail->addAddress('preciousprople@gmail.com');               // Receiver 

    $mail->Subject = 'New Quote';
    $mail->Body    = "
    Name:          {$_POST['name']}
    Company:       {$_POST['company']}
    Mobile Number: {$_POST['number']}
    Email:         {$_POST['email']}
    Service:       {$_POST['service']}
    Color:         {$_POST['color']}
    Volume:        {$_POST['volume']}
    ";

    $mail->send();
    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error']);
}