class Apartment {
  constructor() {}
  
  static get playerRoom() {
	let self = this;
	let room = new Room("Your apartment");
	
	room.addEventchain({
		aliases: Keywords.alias.LEAVE,
		events: ["You open the door and step outside into the hallway.", "One door available to Radja's apartment, stairs down."],
		exitRoom: Apartment.hallway
	});
	
	return room;
  }
  
  static get hallway() {
	let self = this;
	let room = new Room("Hallway");
	
	let radjaEnterKeywords = Keywords.alias.ENTER.slice(0);
	radjaEnterKeywords.push("radja");
	
	room.addEventchain({
		aliases: radjaEnterKeywords,
		events: ["Going into radja's apartment. Radja talking to sister. You mention the problem with your augs, she tells you to find capacitor with Simone downstairs."],
		exitRoom: Apartment.radjaHome
	});
	
	room.addEventchain({
		aliases: Keywords.alias.STAIRS,
		events: ["Going down."],
		exitRoom: Apartment.downstairs
	});
	
	return room;
  }
  
  static get radjaHome() {
	let self = this;
	let room = new Room("Radja apartment");
	
    room.addEventchain({
		aliases: Keywords.alias.LEAVE,
		events: ["You return to the hallway"],
		previousRoom: true
	});
		
	return room;
  }
  
  static get downstairs() {
	let self = this;
	let room = new Room("Downstairs");
	
	return room;
  }
  
}