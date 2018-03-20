class ComplexEvent {
	constructor(eventText, conditionFunction) {
		this.eText = eventText;
		this.condition = conditionFunction;
	}
	
	get eText() {
		return this._eText;
	}
	set eText(value) { this._eText = value;}
	
	get condition() {
		return this._condition;
	}
	set condition(value) { this._condition = value;}
	
	
}