class Eventchain {
	constructor(aliases, events, nextRoom, inventory, condition, conditionFail, conversationStart, consequence, audio) {
		var self = this;
		this.aliases = aliases;
	   	this.events = events;
		this.nextRoom = nextRoom;
		this.inventory = inventory;
		this.condition = condition;
		this.conditionFail = conditionFail;
		this.conversationStart = conversationStart;
		this.consequence = consequence;
		this.audio = audio;
	}

	playAudio() {
		Howler.volume(0.5);
		var sound = new Howl({
		  src: [this.audio]
		});
		var pl = sound.play();
		sound.rate(1.5, pl);
		console.log("Playing audio: " + this.audio);
	}
}