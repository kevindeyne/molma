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
		
		setTimeout(function() {
			r.addEventchain({
				aliases: ["elevator"],
				events: ["You get into the elevator and zoom up above the water."],
				exitRoom: city.centralStreet()
			});	
		}, 100);
						
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
	
		setTimeout(function() {
			r.addEventchain({
				aliases: ["hub"],
				events: ["You walk into the submarine port. The elevator can take you up."],
				exitRoom: subhub.port()
			});	
		}, 100);
		
		return r;
	});
  }
}

var subhub = new Subhub();