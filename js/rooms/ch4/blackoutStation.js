class BlackoutStation extends RoomContent {
  constructor() {
	super();
  }
  
  entry() {
	return this.getRoom("Blackout station - Boarding hall", function(r){
		
		r.addEventchain({
			aliases: ["red"],
			events: ["You enter the red room. There is a corpse on the floor, clutching a chip."],
			exitRoom: blackoutStation.redRoom()
		});
		
		r.addEventchain({
			aliases: ["board"],
			events: ["You enter your submarine. You can set a course."],
			exitRoom: subhub.submarine()
		});
				
				
		return r;
	});
  }
   
  redRoom() {
	return this.getRoom("Blackout station - The Red Room", function(r){
				
		setTimeout(function() {
			r.addEventchain({
				aliases: Keywords.alias.LEAVE,
				events: ["You head back to boarding hall."],
				exitRoom: blackoutStation.entry()
			});
		}, 100);
		
		r.addEventchain({
			aliases: ["chip"],
			events: ["You take the chip, slide it open. It seems to contain a virus."],
			inventory: Items.redroom.virus
		});

		return r;
	});
  }
}

var blackoutStation = new BlackoutStation();