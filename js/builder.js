class Builder {
	constructor() {
		this.shedOutside = new Room("Outside - Next to shed");
		this.houseOutside = new Room("Outside - Next to house");
		this.outside = this.outsideRoom();
		this.car = this.carRoom();
	}
	
    init() {
	   let self = this;
	   game.currentRoom = self.car;
    }
	
	outsideRoom() {
	   let self = this;
       let room = new Room("Outside - Next to car");
	   room.addEventchain({
	   	   aliases: ["car"],
	   	   events: ["Unable to withstand the icy winds, you decide to get back into the car.", 
					"You know you can't stay in here long. You should find shelter."],
	   	   exitRoom: self.car
	   });
	   room.addEventchain({
	   	   aliases: ["shed"],
	   	   events: ["You walk over to the shed, the snow softly crunching underneath your boots."],
	   	   exitRoom: self.shedOutside
	   });
	   room.addEventchain({
	   	   aliases: ["house"],
	   	   events: ["The house looms over you as you approach it. Nobody home."],
	   	   exitRoom: self.houseOutside
	   });
       return room;
    }
	
    carRoom() {
	   let self = this;
       let room = new Room("Inside the car");
	   room.addEventchain({
	   	   aliases: ["door", "exit", "leave", "out"],
	   	   events: ["You open the car door and step outside. The cold air burns on your skin.", 
					"You see a shed to your left and a house to your right."],
	   	   exitRoom: self.outside
	   });
       return room;
    }
}