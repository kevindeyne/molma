class Eventchain {
	constructor(aliases, events, nextRoom, inventory, condition, conditionFail, conversationStart) {
		var self = this;
		this.aliases = aliases;
	   	this.events = events;
		this.nextRoom = nextRoom;
		this.inventory = inventory;
		this.condition = condition;
		this.conditionFail = conditionFail;
		this.conversationStart = conversationStart;
	}
}