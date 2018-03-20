class RoomContent {
  constructor() {
    this.rooms = {};
  }

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
}