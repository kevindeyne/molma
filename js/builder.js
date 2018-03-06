class Builder {
	constructor() {		
		this.shedInside = this.shedInsideRoom();
		this.shedOutside = this.shedOutsideRoom();
		this.houseInside = new Room("House");
		this.houseOutside = this.houseOutsideRoom();
		this.outside = this.outsideRoom();
		this.car = this.carRoom();
	}
	
    init() {
	   let self = this;
	   game.currentRoom = self.car;
    }
	
	houseOutsideRoom() {
	   let self = this;
       let outside = new Room("Outside - Next to house");
	   outside.addEventchain({
	   	   aliases: Keywords.alias.ENTER,
	   	   events: ["You open the door to the house and step inside. You completed this little demo."],
	   	   exitRoom: self.houseInside,
		   condition: function(){
			  return game.player.checkInventory(Items.shed.key);
		   },
		   conditionFail: "The door won't open. It's locked shut. You'll need to find the key."
	   });
	   outside.addEventchain({
	   	   aliases: ["shed", "left"],
	   	   events: ["You walk over to the shed, the snow softly crunching underneath your boots.", 
		   "It has a small wooden door."],
	   	   exitRoom: self.shedOutside
	   });
	   self.shedOutside.addEventchain({
	   	   aliases: ["house", "right"],
	   	   events: ["The house looms over you as you approach it. Nobody home.",
		   "A large door with a heavy lock is visible."],
	   	   exitRoom: outside
	   });
       return outside;
    }
	
	shedInsideRoom() {
	   let self = this;
       let room = new Room("Shed");
	   room.addEventchain({
	   	   aliases: ["key", "take"],
	   	   events: ["You take the bronze key."],
	   	   inventory: Items.shed.key
	   });
       return room;
    }

	shedOutsideRoom() {
	   let self = this;
       let outside = new Room("Outside - Next to shed");
	   outside.doorBlocked = true;
	   outside.addEventchain({
	   	   aliases: Keywords.alias.ENTER,
	   	   events: ["You open the door to the shed and step inside. On a small table in front of you lies a bronze key."],
	   	   exitRoom: self.shedInside,
		   condition: function(){
			  return !outside.doorBlocked;
		   },
		   conditionFail: "You can't reach the door, there is a man in the way. He won't let you pass without speaking to him."
	   });
	   outside.addEventchain({
	   	   aliases: Keywords.alias.TALK,
	   	   events: ["You greet the man with a nod. He steps closer."],
		   conversationStart: Conversations.manBlockingDoor.blockConversation
	   });
	   self.shedInside.addEventchain({
	   	   aliases: Keywords.alias.LEAVE,
	   	   events: ["You leave the shed and are back outside."],
	   	   exitRoom: outside
	   });
       return outside;
    }
	
	outsideRoom() {
	   let self = this;
       let room = new Room("Outside - Next to car");
	   room.addEventchain({
	   	   aliases: ["car"],
	   	   events: ["Unable to withstand the icy winds, you decide to get back into the car.", 
					"You know you can't stay in here long. You should find shelter."],
	   	   exitRoom: self.car
	   });
	   room.addEventchain({
	   	   aliases: ["shed", "left"],
	   	   events: ["You walk over to the shed, the snow softly crunching underneath your boots.", 
		   "It has a small wooden door, blocked by a rough looking man."],
	   	   exitRoom: self.shedOutside
	   });
	   room.addEventchain({
	   	   aliases: ["house", "right"],
	   	   events: ["The house looms over you as you approach it. Nobody home.",
		   "A large door with a heavy lock is visible."],
	   	   exitRoom: self.houseOutside
	   });
       return room;
    }
	
    carRoom() {
	   let self = this;
       let room = new Room("Inside the car");
	   room.addEventchain({
	   	   aliases: Keywords.alias.LEAVE,
	   	   events: ["You open the car door and step outside. The cold air burns on your skin.", 
					"You see a shed to your left and a house to your right."],
	   	   exitRoom: self.outside
	   });
       return room;
    }
}