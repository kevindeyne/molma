class Items {
	constructor() {}
}

class Item {
	constructor(name) {
		this.name = name;
	}
}

Items.shed = {};
Items.shed.key = new Item("Bronze key");