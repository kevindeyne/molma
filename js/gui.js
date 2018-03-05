$(document).ready(function() {
	init();
	keyHandler();
});

function init(){
	guiInit();
	game.init();
}

function guiInit() {
	SimpleScrollbar.initEl(document.querySelector("#tbody"));
	$("#input").focus();
	scrollToBottom();
}

function keyHandler(){
	$("#input").on('keydown', function(e) {
	if (e.which == 13) {
	        e.preventDefault();
			game.action($("#input").text());
			$("#input").html("").focus();
	    }
	});	
}

function scrollToBottom(){
	setTimeout(function(){
		$(".ss-content").scrollTop($(".ss-content").height() + 999);
	}, 50);
}

function addResponse(text){
	$(".ss-content").append("<p>"+text+"</p>");
	scrollToBottom();
}

function changeLocation(newLocation) {
	$("#location").text(newLocation);
}