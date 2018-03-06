class Game {
	constructor() {
		let self = this;
		this.builder = new Builder();
		this.currentRoom = null;
		this.player = new Character();
		this.currentConversation = null;
	}

	get currentRoom() { return this._currentRoom; }
	set currentRoom(value) { this._currentRoom = value;}
	get player() { return this._player; }
	set player(value) { this._player = value;}
	get currentConversation() { return this._currentConversation; }
	set currentConversation(value) { this._currentConversation = value;}
	
	init() {
		this.builder.init();
		changeLocation(this.currentRoom.aliases[0]);
		addResponse("You are in a car. It has stalled, its fuel tank completely empty. Outside is a cold winter storm.");
		addResponse("However, you seem to have stopped in a small town. You could probably find shelter here somewhere before the storm gets worse.");
	}
	
	handleEventchain(eventChain) {
		let self = this;
		
		prepReponse();
		if(isNotNull(eventChain.condition) && !eventChain.condition()){
			addResponse(eventChain.conditionFail);
			console.log("Condition failed");
			return;
		}
		
		for (let e of eventChain.events) {
			addResponse(e);
		}
		
		let conversation = eventChain.conversationStart;
		if(isNotNull(conversation)){
			this.showTopicsToDiscuss(conversation);
			self.currentConversation = conversation;			
		}
		
		if(isNotNull(eventChain.nextRoom)){
			self.currentRoom = eventChain.nextRoom;
			console.log("Change current room to:" + game._currentRoom.aliases[0]);
			changeLocation(self.currentRoom.aliases[0]);
			self.currentConversation = null;
		}
		
		if(isNotNull(eventChain.inventory)){
			self.player.addToInventory(eventChain.inventory.name, eventChain.inventory);
		}
	}
	
	handleConversation(conversation) {
		if(isNotNull(conversation)){
			let self = this;
			if(isTrueOrNull(conversation.visible)){
				prepReponse();
				for (let e of conversation.events) {
					addResponse(e);
				}
				this.showTopicsToDiscuss(game.currentConversation);
				
				if(isNotNull(conversation.result)){
					conversation.result();
				}
			}
		}
	}
		
	action(actionText) {
		console.log("> " + actionText);
		
		let conversation = null;
		if(isNotNull(this.currentConversation)){
			conversation = ConversationUtils.findConversationChain(this.currentConversation, actionText);
			this.handleConversation(conversation);
		}
		
		if(null === conversation){
			let eventChain = this.currentRoom.findEventChain(actionText);
			if(isNotNull(eventChain)){
				this.handleEventchain(eventChain);
			} else {
				return false;
			}
		}
	}
	
	showTopicsToDiscuss(conversation) {
		let topics = "{ Topics to discuss: ";
		let topicKeys = Object.keys(conversation);
		let joiner = ", ";
		for (let topicKey of topicKeys) {
			let isVisible = conversation[topicKey].visible;
			if(isTrueOrNull(isVisible)){
				topics = topics + "'" + topicKey + "'" + joiner;
			}
		}
		topics = topics.slice(0, -2) + " }";
		addResponse(topics);
	}
}

function findEventChain(eventChains, actionText){
	let splitted = actionText.split(" ");
	for (let e of eventChains) {
		for (let split of splitted) {
			let foundAlias = e.aliases.find( alias => alias === split );
			if(foundAlias !== undefined){
				return e;
			}				
		}
	}
	
	return null;
}

function isNotNull(value){
	return value !== null && value !== undefined;
}

function isTrueOrNull(value){
	return value === undefined || value === null || value;
}

var game = new Game();