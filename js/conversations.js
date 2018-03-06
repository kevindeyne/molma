class Conversations {
	
	findConversationChain(conversation, actionText){
		let self = this;
		let splitted = actionText.split(" ");
		for (let c of Object.keys(conversation)) {
			for (let split of splitted) {
				if(c.indexOf(split) !== -1){
					return conversation[c];
				}				
			}
		}
		
		return null;
	}
}

var ConversationUtils = new Conversations();

Conversations.manBlockingDoor = {};
Conversations.manBlockingDoor.blockConversation = {
	"empty house": {
		events: ["You motion towards the big house. \"Who lives in this house? It seems locked tight.\", you ask.", "He smirks. \"Most people with common sense have fled from the storm already.\""]
	},
	"move aside": {
		events: ["\"I need to get into the shed. Care to move aside?\", you ask.",
		"He nods. \"Didn't mean to be in the way, sir\". He moves aside."],
		visible: true,
		result: function() {
			game.currentRoom.doorBlocked = false;
		}
	}
}