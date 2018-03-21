class Blacksite extends RoomContent {
  constructor() {
	super();
  }
  
  centralStreet() {
	return this.getRoom("blackout station", function(r){
		r.addEventchain({
			aliases: Keywords.alias.LEAVE,
			events: ["You open the door and step outside into the hallway.", "Red door available to Radja's apartment, stairs down. Behind you is the blue door to your place.",
			new ComplexEvent("Officers arive", function(){ return apmt.searchPartyActive; })],
			exitRoom: apmt.hallway()
		});
		
		r.addEventchain({
			aliases: Keywords.alias.TALK,
	   	    events: ["You talk to the wounded man. He mentions something about the Visitor, begs you to hide him."],
		    conversationStart: Conversations.apartment.woundedMan,
			condition: function(){
			  return apmt.bloodTrail;
		    }
		});
				
		return r;
	});
  }
}

var attackSite = new Blacksite();