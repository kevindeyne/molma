class ComplexEvent {
	constructor(eventText, conditionFunction) {
		this.eText = eventText;
		this.condition = conditionFunction;
	}
	
	get eText() {
		return this._eText;
	}

	get condition() {
		return this._condition;
	}
	
}