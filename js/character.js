class Character {
	constructor() {
		var self = this;
		this.gender = "?";
		this.inventory = {};
		this.clues = {};
		this.background = {};
	}
			
    addToInventory(key, value) {
       this.inventory[key] = value;
    }
	
	checkInventory(key){
		var self = this;
		return isNotNull(self.inventory[key.name]);
	}
	
	printInventory(){
		let p = this.inventory;
		prepReponse();
		if(p.length == 0){
			addResponse("Your current inventory is empty.");
		} else {
			addResponse("Your current inventory is: ");
			for (let key in p) {
				if (p.hasOwnProperty(key)) {
					addResponse("- " + key);
				}
			}		
		}
	}
}