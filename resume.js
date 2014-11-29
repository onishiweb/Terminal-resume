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
	visibleSection = document.getElementById('visible-sections');

function keyPressHandler(e) {
	var code = (e.keyCode) ? e.keyCode: e.charCode;

	if( e.metaKey || e.ctrlKey || e.altKey )
		return;

	e.preventDefault();

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

	// Work out what command is running 
	switch(command) {
		case 'everything':
			appendSection('sections');
			break;
		case '--help':
			appendSection('help');
			break;
		case 'exit':
			window.location = "http://adamonishi.com";
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
	// Get previous command
}

function downArrowKey() {
	// Get next command
}
	








$(document).ready ( function () {

	var sectionsArray = ["experience","education","mission","skills","contact","interests"];
	var pastCommands = new Array();
	
	// $(window).keydown( 
	function old (e) {
		
		var code = (e.keyCode) ? e.keyCode: e.charCode;
		
		if(code == 8) // backspace
		{
			e.preventDefault();

			var str = $("#command-line .commands").text();

			str = str.substring(0, str.length - 1);

			$("#command-line .commands").html("<b> </b>");
			$("#command-line .commands").append(str);
		}
		else if( code == 13 ) // enter
		{
			e.preventDefault();

			var command = $("#command-line .commands").text();

			command = command.replace(/\s/g, "");
			pastCommands.push(command);
			
			// Do stuff here to show all of the bits and bobs :)
			$("#visible-sections").append("<div class=\"completed-command\">" + $("#command-line").html() + "</div>");
			
			if(command == "everything")
			{
				$("#visible-sections").append($("#sections").html());
			}
			else if(command == "--help")
			{
				$("#visible-sections").append($("#help").html());
			}
			else if (command == "about")
			{
				$("#visible-sections").append($("#mission").html());
			}
			else if( $.inArray(command, sectionsArray) != -1 )
			{		
				$("#visible-sections").append($("#"+command).html());
			}
			else if( command == "exit")
			{
				window.location = "http://onishiweb.co.uk/"
			}			
			else
			{
				$("#visible-sections").append("<p class=\"error\">&gt;&gt; Sorry that command could not be found, please try again or try using --help</p>");
			}
			
			$("#command-line .commands").html("<b> </b>");
			$("body").animate({ scrollTop: $("#visible-sections").height() }, 1500);
		}
		else
		{
			e.preventDefault();
			
			if( code > 64 && code < 91 )
			{
				code = code + 32;
			
				var c = String.fromCharCode(code);

				$("#command-line .commands").append(c);
			}
			else if ( code == 32 )
			{
				$("#command-line .commands").append(" ");
			}
			else if ( code == 189 || code == 109 )
			{	
				$("#command-line .commands").append("-");
			}
			// 38 = up arrow, 40 = down arrow!
			else if ( code == 38 || code == 40 )
			{
				alert("sorry this feature is not active yet, give me some time");
			}
		}
			
	};	

});

