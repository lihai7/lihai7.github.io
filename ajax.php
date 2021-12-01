<?php

$mail_to = 'yourEmail@mail.smth';

$subject = 'Обратная связь с клиентом';

$body = "
Имя: ".$_POST['name']."\r\n
Телефон: ".$_POST['phone']."\r\n
Место проведения: ".$_POST['location']."\r\n
Дата проведения: ".$_POST['eventDate']."\r\n
Количество игроков: ".$_POST['players']."\r\n
Возраст игроков: ".$_POST['playersAge']."\r\n
Email: ".$_POST['email']."\r\n
Комментарии к заявке: ".$_POST['comments']."\r\n";

$body = str_replace(array('"', "'"), '', $body);

$r = array(
    'r'=>0,
    'sdts'=>$_SERVER['REMOTE_ADDR']
);

$fromName = 'Bla-Bla Show';
$fromEmail = 'yourEmail@mail.smth';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:  ' . $fromName . ' <' . $fromEmail .'>' . " \r\n" .
    'Reply-To: '.  $fromEmail . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


if(mail($mail_to, $subject, $body, $headers))
    $r['r'] = 1;
else
    $r['r'] = 0;

echo json_encode($r);