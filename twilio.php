<?php
// Install the library via PEAR or download the .zip file to your project folder.
// This line loads the library
require('twilio/Services/Twilio.php');

$sid = "XXXXXXXX"; // Your Account SID from www.twilio.com/user/account
$token = "XXXXXXXX"; // Your Auth Token from www.twilio.com/user/account

$client = new Services_Twilio($sid, $token);

if( ! empty( $_POST ) && isset( $_POST['twilio_go'] ) ) {
	$params = array(
		'StatusCallback' => 'http://adamonishi.com/resume/twilio.php?message=1',
	);

	$call = $client->account->calls->create(
		'XXXXXXXX', // From a valid Twilio number
		$_POST['to_number'], // Text this number
		// Read TwiML at this URL when a call connects (hold music)
		'http://adamonishi.com/resume/rollingTwiML.php'
	);
}

if( isset($_GET['message']) ) {

	$message = $client->account->messages->sendMessage(
		'XXXXXXXX', // From a valid Twilio number
		'XXXXXXXX', // Text this number
		"You just got called!"
	);

}