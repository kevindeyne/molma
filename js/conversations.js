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

Conversations.apartment = {};
Conversations.apartment.woundedMan = {
	"what happened": {
		events: ["Some exposition."]
	},
	"trigger search party": {
		events: ["Triggering search party, should be coming into the apartment now."],
		visible: !apmt.searchPartyActive,
		result: function() {
			apmt.searchPartyActive = true;
		}
	}
}

Conversations.apartment.officers = {
	"send them away": {
		events: ["Some exposition. Some consequences.", "Better head into the city."],
		result: function() {
			apmt.searchPartyActive = false;
		}
	}
}