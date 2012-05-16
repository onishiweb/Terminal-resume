function cursorAnimation()
{
  $("#command-line .commands b").animate(
  {
	opacity: 0
  }, 450, "swing").animate(
  {
	opacity: 1
  }, 1000, "swing");
}
	
$(document).ready ( function () {

	setInterval ( cursorAnimation, 1500 );

	var sectionsArray = ["experience","education","mission","skills","contact","interests"];
	var pastCommands = new Array();
	
	/*
	document.onkeydown = function () {
		alert ( "hello" );
	};
	*/
	$(window).keydown( function (e) {
		
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
			
	});	

});

