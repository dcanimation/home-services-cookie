/* Javascript Cookies */

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/* -------------------------------------------------------------- */

/* Creating the div in the HTML will give more control. 
This function was orginally created when I thought I needed to call it on each button click. */
/*
var div = 0;
function serviceNotifier(serviceName) {
	if ( div == 0 ){
		$('body').append("<div class=\"service-notifier\"><ul></ul></div>");
		listDisplay();
	}
	div = $('.service-notifier').length;
}
*/

function listDisplay() {
	for( i=0; i < serviceArray.length; i++ ){
		$('.service-notifier').children('ul').append("<li>" + serviceArray[i] + "</li>");
	}
}

function checkForm(){
	var cboxes = $('input[type=checkbox]');
	for ( var j = 0; j < cboxes.length; j++) {
		var serviceVal = cboxes[j].value;
		if ( jQuery.inArray( serviceVal, serviceArray) > -1 ){
			console.log(serviceVal);
			cboxes[j].checked = true;
		}
	}
}

var services = readCookie("bundle");
var serviceArray = [];
var newservice;
if (!services){
	services = "";
} else {
	serviceArray = services.split(",");
}

$('button').click(function(){
	newservice = $(this).data("service");
	if (!newservice) return;
	if (jQuery.inArray( newservice, serviceArray) === -1 ){
		serviceArray.push(newservice);
		$('.service-notifier').children('ul').append("<li>" + newservice + "</li>");
	}
	createCookie("bundle", serviceArray, 1);
	
	var cooky = readCookie("bundle");
	console.log(cooky);
});

/* depracated function */
//serviceNotifier();

listDisplay();

$(document).ready(function(){
	checkForm();
});

