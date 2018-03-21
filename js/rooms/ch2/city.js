class City extends RoomContent {
  constructor() {
	super();
  }
  
  centralStreet() {
	return this.getRoom("Central street", function(r){		
		r.addEventchain({
			aliases: ["elevator", "sea"],
	   	    events: ["You get into the sea elevator, scan your ticket and get sent down."],
			exitRoom: subhub.port()
		});
				
		return r;
	});
  }
}

var city = new City();