$(document).ready(function() {
	init();
	keyHandler();
	
	testData(); /***/
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
			
			let a = $("#input").text();
			if(a === "inv" || a === "inventory"){
				game.player.printInventory();
			} else {
				game.action(a);	
			}
			
			$("#input").html("").focus();
	    }
	});
}

function scrollToBottom(){
	setTimeout(function(){
		$(".ss-content").scrollTop($(".ss-content").height() + 999);
	}, 50);
}

function prepReponse(){
	$("#tbody p.new").removeAttr("class");
}

function addResponse(text){	
	$(".ss-content").append("<p class='new'>"+text+"</p>");
	scrollToBottom();
}

function changeLocation(newLocation) {
	$("#location").text(newLocation);
}

/****/
function testData(){
	setTimeout(function(){
		enterTestData("open door");
		enterTestData("go down");
		enterTestData("open door");
		enterTestData("go to simone");
		enterTestData("go to complex");
	}, 110);	
}

function enterTestData(command) {
	$("#input").text(command);
	$("#input").trigger(enterKeyPress());
}

function enterKeyPress(){
	return $.Event( "keydown", { which: 13 } );
}