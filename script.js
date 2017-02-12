console.log('Success.');
log = console.log;

var o_o = (function() {
	var parent = null;
	var interest = [];
	var objectClone = {};
	var clients = [];
	
	return {
		// select parent container
		insideOf(parent) {
			this.parent = document.body.querySelector(parent);
			return this;
		},
		// track these elements' inners 
		observe(domElements) {
			this.interest = $(this.parent).find(domElements);			
			return this;
		},
		// Bind data in domElements ^ to JS object properties
		cacheTo(object) {
			if(object) {				
				this.objectClone = object;
			}
			// Add object members corresponding to <tags> we track
			this.interest.each((i, el) => {	
				// If <tag> has id attr use it as a key, otherwise use an index #
				var key = (el.id) ? el.id : i;
				// return <tag id value> --> {"id" : tag.value} --> object.id  
				// assign object.id = newVal --> {"id" : tag.value = newVal} --> <tag id val = newVal>		
				Object.defineProperty(this.objectClone, key, {
				get: function() { return el.value; }, 
				set: function(newValue) { el.value = newValue; },
				configurable: true,
				enumerable: true
				});
			});
			return this;
		},
		streamToView(spectators) {			
			// Synchronize 
			this.clients = $(spectators);			
			this.parent.addEventListener("keyup", () => this.broadcast());
			this.parent.addEventListener("click", () => this.broadcast());	
			
			return this;
			
		},
		streamToModel() {
			this.parent.addEventListener("keyup", () => log(this.getFields()) );
			return this;
		},
		getFields() {			
			var input = {};
			for(field in this.objectClone) {
				input[field] = this.objectClone[field];
			}
			return input;
		},
		broadcast() {	
			var input = this.getFields();
			for (var i = 0; i < this.clients.length; i++) {
				this.clients[i].innerHTML = JSON.stringify(input);				
			}				 
		}
	};
}())	

var taskForm = {}; // An object whose properties are bound to getFields of a form
var o = o_o.insideOf('#form').observe('input, textarea, :checkbox')
			.cacheTo(taskForm) // Optional
			.streamToModel()
			.streamToView("#screen, #screen2");