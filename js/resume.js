/*** LICENSE 
 * 
 * Copyright (c) 2013 Adam Onishi
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions 
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 **/

var sectionsArray = ["experience","education","about","skills","contact","interests"],
	pastCommands = [],
	commandLine = document.querySelector('#command-line .commands'),
	visibleSection = document.getElementById('visible-sections'),
	commandIndex = 0,
	twilio_start = false;

function keyPressHandler(e) {
	var code = (e.keyCode) ? e.keyCode: e.charCode;

	if( e.metaKey || e.ctrlKey || e.altKey )
		return;

	e.preventDefault();
	commandIndex--;

	switch(code) {
		case 8:
			backspaceKey();
			break;
		case 13:
			enterKey();
			break;
		case 32:
			addCharSpace();
			break;
		case 187:
			addCharPlusEquals(e);
			break;
		case 189:
		case 109:
			addCharDash();
			break;
		case 38:
			upArrowKey();
			break;
		case 40:
			commandIndex += 2;
			downArrowKey();
			break;
		default:
			if( e.shiftKey )
				return;

			letterKey(code);
			break
	}
}
document.addEventListener("keydown", keyPressHandler);

function enterKey() {
	var command = commandLine.innerText || commandLine.textContent;
	// Store in past commands array
	pastCommands.push(command);
	// Add the completed command to the content section
	var completed = document.createElement('div');
	completed.classList.add('completed-command');
	completed.innerHTML = document.getElementById('command-line').innerHTML;
	visibleSection.appendChild(completed);

	if( twilio_start ) {
		twilio_start = false;

		if( command.length !== 11 ) {
			appendSection('twilio-error');
			commandLine.innerHTML = '<b></b>';
			return;
		}

		if( ! isNaN(command) ) {
			marmottajax.post({
				url: "http://adamonishi.com/resume/twilio.php",
				options: { 
					to_number: command,
					twilio_go: 'go'
				}
			}).then(function(result) {
				consoe.log(result);
			});

			appendSection('twilio-in-progress');
		}

		commandLine.innerHTML = '<b></b>';
		return;
	}

	// Work out what command is running 
	switch(command) {
		case 'everything':
			appendSection('sections');
			break;
		case '--help':
			appendSection('help');
			break;
		case 'download':
			window.location = 'resume.pdf'
			break;
		case 'exit':
			window.location = 'http://adamonishi.com';
			break;
		case 'twilio':
			twilio_start = true;
			appendSection('twilio');
			break;
		default:
			if( sectionsArray.indexOf(command) >= 0 ) {
				appendSection(command);
			} else {
				appendSection('error');
			}

			break;
	}

	commandLine.innerHTML = '<b></b>';
}

function appendSection(section) {
	var newContent = document.createElement('div');
	newContent.innerHTML = document.getElementById(section).innerHTML;

	visibleSection.appendChild(newContent);
	commandLine.scrollIntoView(false);
}

function backspaceKey() {
	var str = commandLine.innerHTML;

	str = str.substring(0, str.length - 1);

	if( str.slice(-5) === '&nbsp' ) {
		str = str.substring(0, str.length - 5);		
	}

	commandLine.innerHTML = str;
}

function letterKey(code) {
	var c = '';

	if( (code > 47 && code < 58) || (code > 95 && code < 106) ) {
		// Top numbers
		c = code - 48;
		
		// Keypad numbers
		if( c > 9 ) {
			c = c - 48;
		}

	} else {
		// Letters
		code = code + 32;
		c = String.fromCharCode(code);
	}

	commandLine.innerHTML += c;
}

function addCharSpace() {
	commandLine.innerHTML += '&nbsp;';
}

function addCharDash() {
	commandLine.innerHTML += '-';
}

function addCharPlusEquals(e) {
	if(e.shiftKey) {
		commandLine.innerHTML += '+';
	} else {
		commandLine.innerHTML += '=';
	}	
}

function upArrowKey() {
	if( commandIndex < 0 ) {
		commandIndex = pastCommands.length - 1;
	}

	commandLine.innerHTML = pastCommands[commandIndex] + '<b></b>';
}

function downArrowKey() {
	// Get next command
	if( commandIndex >= pastCommands.length ) {
		commandLine.innerHTML = '<b></b>';
	} else {
		commandLine.innerHTML = pastCommands[commandIndex] + '<b></b>';
	}
}
