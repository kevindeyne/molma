class BlackoutStation extends RoomContent {
  constructor() {
	super();
  }
  
  entry() {
	return this.getRoom("Blackout station", function(r){
		
		r.addEventchain({
			aliases: ["red"],
			events: ["You enter the red room. There is a corpse on the floor, clutching a chip."],
			exitRoom: blackoutStation.redRoom()
		});
				
		return r;
	});
  }
   
  redRoom() {
	return this.getRoom("The Red Room", function(r){
		
		r.addEventchain({
			aliases: ["red"],
			events: ["You enter the red room. There is a corpse on the floor, clutching a chip."]
		});
		
		r.addEventchain({
			aliases: ["chip"],
			events: ["You take the chip, slide it open. It seems to contain a virus."]
		});
				
		return r;
	});
  }
}

var blackoutStation = new BlackoutStation();