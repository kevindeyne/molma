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
	
	printInventory(){
		let p = this.inventory;
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