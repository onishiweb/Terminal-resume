<?php
$response = new Services_Twilio_Twiml();
$response->play('http://adamonishi.com/resume/assets/astley.mp3');
$response->say('You\'ve just been Rickrolled by Adam Onishi');
print $response;
?>