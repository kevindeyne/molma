class Apartment {
  constructor() {}
  
  static get playerRoom() {
	let self = this;
	let room = new Room("Your apartment");
	
	room.addEventchain({
		aliases: Keywords.alias.LEAVE,
		events: ["You open the door and step outside into the hallway.", "Red door available to Radja's apartment, stairs down. Behind you is the blue door to your place."],
		exitRoom: Apartment.hallway
	});
	
	return room;
  }
  
  static get hallway() {
	let self = this;
	let room = new Room("Hallway");
	
	let radjaEnterKeywords = Keywords.alias.ENTER.slice(0);
	radjaEnterKeywords.push("radja");
	radjaEnterKeywords.push("red");
	
	room.addEventchain({
		aliases: radjaEnterKeywords,
		events: ["Going into radja's apartment. Radja talking to sister. You mention the problem with your augs, she tells you to find capacitor with Simone downstairs."],
		exitRoom: Apartment.radjaHome
	});
	
	room.addEventchain({
		aliases: Keywords.alias.STAIRS,
		events: ["Going down. One door, stairs back up"],
		exitRoom: Apartment.downstairs
	});
	
	setTimeout(function() {
		room.addEventchain({
			aliases: ["my place", "blue", "back"],
			events: ["Going back into my apartment. Nothing else here. Door behind me."],
			exitRoom: Apartment.hallway
		});
	}, 100);
	
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
	
	room.addEventchain({
		aliases: Keywords.alias.ENTER,
		events: ["You head out to the square. Little shack outside with Simone. Big gate."],
		exitRoom: Apartment.square
	});
	
	room.addEventchain({
		aliases: Keywords.alias.STAIRS,
		events: ["You walk up the hallway"],
		previousRoom: true
	});
	
	return room;
  }

  static get square() {
	let self = this;
	let room = new Room("Square");
	
	room.addEventchain({
		aliases: ["simone"],
		events: ["You walk up to the shack of simone. You get the capacitor here.",
		"You hear a ruckus outside.",
		"You see a trail of blood. It goes to the door of the apartment complex."],
		exitRoom: Apartment.simone
	});
		
	return room;
  }
  
  static get simone() {
	let self = this;
	let room = new Room("Simone's shack");
	
	room.addEventchain({
		aliases: ["complex", "apartment", "door"],
		events: ["You head back inside and run up the stairs. The trail of blood leads to your place."],
		previousRoom: true
	});
	
	return room;
  }
}