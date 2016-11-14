# A terminal resume...

Ok, so that makes it sound worse than it is. About a year or so ago I decided to use what I had learned in jQuery to put together a page that looks and works pretty much like a terminal on Mac, and to be honest I'm rather happy with the results.

The code does need a lot of tidying up though as it's not the best example of my jQuery skills but please fell free to fork away and have a little fun with it. You can find it running at http://adamonishi.com/resume

## Update

Since it's initial conception I've completely re-written all the JavaScript to work without jQuery. I've added a few extra features like the ability to download a full PDF and I'm currently working on getting command history working properly.

**11/13/16:**
- Began adding mobile support. Only tested on iOS. Current issue is it won't autoscroll the text visible enough with keyboard open.
- Added mobile viewport meta for better display on mobile.

**Changes:**
```
<div id="commands" class="commands"></div>
```
to
```
<textarea id="commands" class="commands"></textarea>v
```
- Removed all the <b></b>.
- Minor CSS changes.

You can view a live example of mobile support here https://www.dev.jordans.io/terminal
