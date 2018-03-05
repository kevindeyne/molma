class Game {
	constructor() {
		let self = this;
		this.currentRoom = self.carRoom();
	}

	get currentRoom() {
		return this._currentRoom;
	}
	set currentRoom(value) {
		this._currentRoom = value;
	}
	
	init() {
		changeLocation(this.currentRoom.aliases[0]);
		addResponse("You are in a car. Outside is a cold winter storm.");
	}
	
	handleEventchain(eventChain) {
		let self = this;		
		for (let e of eventChain.events) {
			addResponse(e);
		}		
		if(eventChain.nextRoom !== null){
			self.currentRoom = eventChain.nextRoom;
			changeLocation(self.currentRoom.aliases[0]);
		}
	}
	
	action(actionText) {
		let eventChain = this.currentRoom.findEventChain(actionText);
		if(eventChain !== null){
			this.handleEventchain(eventChain);
		} else {
			return false;
		}
	}
	
	/* Rooms */
    carRoom() {
       let room = new Room("Inside the car");
	   room.addEventchain({
		   exitRoom: null,
	   	   aliases: ["door", "exit", "leave"],
	   	   events: ["You open the car door and step outside. The cold air burns on your skin.", 
					"You see a shed to your left and a house to your right."] 
	   });
	   
	   let exitRoom = new Room("Outside");
	   room.eventChains[0].nextRoom = exitRoom;
       return room;
    }
}

var game = new Game();