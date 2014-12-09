<?php
// Install the library via PEAR or download the .zip file to your project folder.
// This line loads the library
require('twilio/Services/Twilio.php');

$response = new Services_Twilio_Twiml();
$response->play('http://adamonishi.com/resume/assets/astley.mp3');
$response->say('You\'ve just been Rickrolled by Adam Onishi');
print $response;
?>