class Game {
	constructor() {
		let self = this;
		this.builder = new Builder();
		this.currentRoom = null;
	}

	get currentRoom() {
		return this._currentRoom;
	}
	set currentRoom(value) {
		this._currentRoom = value;
	}
	
	init() {
		this.builder.init();
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
}

var game = new Game();