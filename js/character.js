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
}