class Room {
	constructor(alias) {
		let self = this;
		this.aliases = [alias];
		this.eventChains = [];
	}
	
	get eventChains() {
		return this._eventChains;
	}
	set eventChains(value) {
		this._eventChains = value;
	}
			
    addEventchain(data) {
		let self = this;
		
		if(null !== data.exitRoom){
			self.exits.push(data.exitRoom);
		}
		
		this.eventChains.push(new Eventchain(data.aliases, data.events));
    }
	
	findEventChain(actionText) {
		let self = this;
		let splitted = actionText.split(" ");
		for (let e of self.eventChains) {
			for (let split of splitted) {
				let foundAlias = e.aliases.find( alias => alias === split );
				if(foundAlias !== undefined){
					return e;
				}				
			}
		}
		
		return null;
	}
}

function checkAliasPresent(string){
	
}