<?php
// Install the library via PEAR or download the .zip file to your project folder.
// This line loads the library
require('twilio/Services/Twilio.php');

$sid = "AC0a3bbfa6d489e0d7af3a9b5ea3edffa0"; // Your Account SID from www.twilio.com/user/account
$token = "750a7416c78b0b90e1a55253ee6c9628"; // Your Auth Token from www.twilio.com/user/account

$client = new Services_Twilio($sid, $token);

if( ! empty( $_POST ) && isset( $_POST['twilio_go'] ) ) {
	$params = array(
		'StatusCallback' => 'http://adamonishi.com/resume/twilio.php?message=1',
	);

	$call = $client->account->calls->create(
		'441915802812', // From a valid Twilio number
		$_POST['to_number'], // Text this number
		// Read TwiML at this URL when a call connects (hold music)
		'http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient'
	);
}

if( isset($_GET['message']) ) {

	$message = $client->account->messages->sendMessage(
		'441915802812', // From a valid Twilio number
		'447412555187', // Text this number
		"You just got called!"
	);

}