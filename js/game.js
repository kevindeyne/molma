class Game {
	constructor() {
		let self = this;
		this.builder = new Builder();
		this.currentRoom = null;
		this.player = new Character();
	}

	get currentRoom() { return this._currentRoom; }
	set currentRoom(value) { this._currentRoom = value;}
	get player() { return this._player; }
	set player(value) { this._player = value;}
	
	init() {
		this.builder.init();
		changeLocation(this.currentRoom.aliases[0]);
		addResponse("You are in a car. It has stalled, its fuel tank completely empty. Outside is a cold winter storm.");
		addResponse("However, you seem to have stopped in a small town. You could probably find shelter here somewhere before the storm gets worse.");
	}
	
	handleEventchain(eventChain) {
		let self = this;
		
		prepReponse();
		for (let e of eventChain.events) {
			addResponse(e);
		}		
		if(isNotNull(eventChain.nextRoom)){
			self.currentRoom = eventChain.nextRoom;
			changeLocation(self.currentRoom.aliases[0]);
		}
		if(isNotNull(eventChain.inventory)){
			self.player.addToInventory(eventChain.inventory.name, eventChain.inventory);
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

function isNotNull(value){
	return value !== null && value !== undefined;
}

var game = new Game();