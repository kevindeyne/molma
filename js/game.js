class Game {
	constructor() {
		let self = this;
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
		this.currentRoom = apmt.playerRoom();
		changeLocation(this.currentRoom.aliases[0]);
		addResponse("In your apartment, one door");
		addResponse("Need to see Radja");
	}
	
	handleEventchain(eventChain) {
		let self = this;
		
		prepReponse();
		if(isNotNull(eventChain.condition) && !eventChain.condition()){
			addResponse(eventChain.conditionFail);
			console.log("Condition failed");
			return;
		}
		
		if(isNotNull(eventChain.consequence)){
			eventChain.consequence();
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
			if (typeof self.currentRoom === "function") {
				throw "Forgot to use the exitRoom as a function() in the setup, so it passed it along and now you can't load";
			}
			console.log("Change current room to:" + self.currentRoom.aliases[0]);
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

function isNotNull(value){
	return value !== null && value !== undefined;
}

function isTrueOrNull(value){
	return value === undefined || value === null || value;
}

var game = new Game();