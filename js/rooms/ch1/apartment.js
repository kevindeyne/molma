class Apartment {
  constructor() {
    this.rooms = {};
  }

/**TODO ROOM generics**/
  getRoom(roomName, builder){
	if(this.rooms[roomName] === undefined){
		let room = new Room(roomName);
		this.rooms[roomName] = builder(room);
	}
	return this.rooms[roomName];
  }

  extraKeywords(){
	let array = Array.prototype.slice.call(arguments)[0].slice(0);
  
	for(var i = 1; i < arguments.length; i++) {
		array.push(arguments[i]);
	}
	return array;
  }
/**END TODO ROOM generics**/
  
  playerRoom() {
	return this.getRoom("Your apartment", function(r){
		r.addEventchain({
			aliases: Keywords.alias.LEAVE,
			events: ["You open the door and step outside into the hallway.", "Red door available to Radja's apartment, stairs down. Behind you is the blue door to your place."],
			exitRoom: apmt.hallway()
		});
		return r;
	});
  }

  hallway() {
	let self = this;
	return this.getRoom("Hallway", function(r){
		r.addEventchain({
			aliases: self.extraKeywords.apply(this, [Keywords.alias.ENTER, "radja", "red"]),
			events: ["Going into radja's apartment. Radja talking to sister. You mention the problem with your augs, she tells you to find capacitor with Simone downstairs."],
			exitRoom: apmt.radjaHome()
		});
		
		r.addEventchain({
			aliases: Keywords.alias.STAIRS,
			events: ["Going down. One door, stairs back up"],
			exitRoom: apmt.downstairs()
		});
		
		setTimeout(function() {
			r.addEventchain({
				aliases: ["my place", "blue", "back"],
				events: ["Going back into my apartment. Nothing else here. Door behind me."],
				exitRoom: apmt.hallway()
			});
		}, 100);

		return r;
	});
  }

  radjaHome() {
	return this.getRoom("Radja apartment", function(r){
		r.addEventchain({
			aliases: Keywords.alias.LEAVE,
			events: ["You return to the hallway"]
		});		
		return r;
	});
  }

  downstairs() {
	return this.getRoom("Downstairs", function(r){
		r.addEventchain({
			aliases: Keywords.alias.ENTER,
			events: ["You head out to the square. Little shack outside with Simone. Big gate."],
			exitRoom: apmt.square()
		});
		
		setTimeout(function() {
			r.addEventchain({
				aliases: Keywords.alias.STAIRS,
				events: ["You walk up the hallway"],
				exitRoom: apmt.hallway()
			});
		}, 100);
		return r;
	});
  }

  square() {
	return this.getRoom("Square", function(r){		
		r.addEventchain({
			aliases: ["simone"],
			events: ["You walk up to the shack of simone. You the capacitor here.",
			"You hear a ruckus outside.",
			"You see a trail of blood. It goes to the door of the apartment complex."],
			exitRoom: apmt.simone()
		});
		return r;
	});
  }

  simone() {
	return this.getRoom("Simone's shack", function(r){		
		setTimeout(function() {
			r.addEventchain({
				aliases: ["complex", "apartment", "door"],
				events: ["You head back inside. The trail of blood leads up the stairs."],
				exitRoom: apmt.downstairs()
			});
		}, 100);
		return r;
	});
  }
}

var apmt = new Apartment();