class Subhub extends RoomContent {
  constructor() {
	super();
  }
  
  port() {
	return this.getRoom("Submarine port", function(r){
		
		r.addEventchain({
			aliases: ["board"],
			events: ["You enter the submarine. You can set a course."],
			exitRoom: subhub.submarine()
		});
						
		return r;
	});
  }
  
  submarine() {
	return this.getRoom("Submarine", function(r){
		
		setTimeout(function() {
			r.addEventchain({
				aliases: ["blackout"],
				events: ["You set course for the blackout station."],
				exitRoom: blackoutStation.entry()
			});
		}, 100);
		
				
		return r;
	});
  }
}

var subhub = new Subhub();