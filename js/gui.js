var loadTime = 800;
$(document).ready(function() {
	init();
	keyHandler();

	loader();
	
	testData(); /***/
});

function init(){
	guiInit();
	game.init();
}

function loader(){
	$("#loader").fadeOut(loadTime);

	setTimeout(function(){
		$("#loader").remove();
	}, loadTime+100);
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
	if(text instanceof ComplexEvent){
		if(!text.condition()){ return; }
		text = text.eText;
	}
	
	$(".ss-content").append("<p class='new'>"+text+"</p>");
	scrollToBottom();
}

function changeLocation(newLocation) {
	$("#location").text(newLocation);
}

/****/
function testData(){
	setTimeout(function(){
		//apartment
		enterTestData("open door");
		enterTestData("go down");
		enterTestData("open door");
		enterTestData("go to simone");
		enterTestData("go to complex");
		enterTestData("go up");
		enterTestData("go into room");
		enterTestData("talk to man");
		enterTestData("what happened?");
		enterTestData("trigger search party");
		enterTestData("go outside");
		enterTestData("talk to officers");
		enterTestData("send them away");		
		enterTestData("go down");
		enterTestData("open door");
		enterTestData("open big gate");
		
		//city
		enterTestData("take sea elevator down");
		
		//subhub
		enterTestData("board sub");
		enterTestData("set course to blackout station");
		
		//blackout station
		enterTestData("enter the red room");
		enterTestData("take the virus chip from the dead body");
		/*enterTestData("open door");
		enterTestData("board sub");
		enterTestData("set course to hub station");
		
		//subhub
		enterTestData("take sea elevator up");
		
		//city
		enterTestData("go to hacker");
		enterTestData("talk to Ellaine Burke");
		enterTestData("ask support for attack");
		enterTestData("give virus chip");*/
		
		//do the attack stuff
				
		
	}, loadTime+50);	
}

function enterTestData(command) {
	$("#input").text(command);
	$("#input").trigger(enterKeyPress());
}

function enterKeyPress(){
	return $.Event( "keydown", { which: 13 } );
}