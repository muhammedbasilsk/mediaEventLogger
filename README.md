mediaEventsLogger
================

Dynamically binds media events and display log


Usage : 

Add mediaEventsLogger plugin just below the jQuery plugin script.

<script>
       $.mediaEventsLogger({
       popupLogginDirection:'down',//loggin direction
       consoleLogging: false,//enable console logging (true or false)
       popupLogging:true //enable popup logging (true or false)
       });
</script>

//For better performance, add jQuery core and mediaEventLogger plugin top of the page.
//As it's against the coding conventions (Adding scripts bottom of the page), But improves performance
//Honeslty I'm saying it from experience :)
//If we are dealing with HTML5 audio/ video elements, obviously there will be a drastic change.

