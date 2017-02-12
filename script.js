<<<<<<< HEAD
console.log('Success.');

log = console.log;
user = {};


var o_o = (function() {
	var log = console.log;
	var parent = null;
	var interest = [];
	var objectClone = {};
	var clients = [];
	
	return {
		// select parent container
		insideOf: function(query) {
			this.parent = document.body.querySelector(query);
			return this;
		},
		// track these elements' inners 
		observe: function(string) {
			this.interest = $(this.parent).find(string);			
			return this;
		},
		// clone data to a JS object
		cacheTo: function(object) {
			if(object) {				
				this.objectClone = object;
			}
			// add var members corresponding to <tags> we track
			this.interest.each((i, el) => {	
				var key = (el.id) ? el.id : i;
				// add property to the cloneObject
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
		streamToView: function(spectators) {			
			this.clients = $(spectators);
			
			this.parent.addEventListener("keyup", () => this.broadcast());			
			// this.parent.addEventListener("change", c => broadcast(c));
			// this.parent.addEventListener("click", c => broadcast(c));
			
		},
		streamToModel: function() {
			this.parent.addEventListener("keyup", () => log(this.getFields()) );
			return this;
		},
		getFields: function() {			
			var input = {};
			for(field in this.objectClone) {
				input[field] = this.objectClone[field];
			}
			return	input;
		},
		broadcast: function() {	
			for (var i = 0; i < this.clients.length; i++) {
				this.clients[i].innerHTML = JSON.stringify(this.objectClone);				
			}				 
		}
	};
}())	

var taskForm = {}; // An object whose properties are bound to getFields of a form

var o = o_o.insideOf('#form').observe('input, textarea, :checkbox').cacheTo(taskForm)
				.streamToModel().streamToView("#screen, #screen2");
=======
console.log('Success.');

log = console.log;
user = {};


var o_o = (function() {
	var log = console.log;
	var parent = null;
	var interest = [];
	var objectClone = {};
	var clients = [];
	
	return {
		// select parent container
		insideOf: function(query) {
			this.parent = document.body.querySelector(query);
			return this;
		},
		// track these elements' inners 
		observe: function(string) {
			this.interest = $(this.parent).find(string);			
			return this;
		},
		// clone data to a JS object
		cacheTo: function(object) {
			if(object) {				
				this.objectClone = object;
			}
			// add var members corresponding to <tags> we track
			this.interest.each((i, el) => {	
				var key = (el.id) ? el.id : i;
				// add property to the cloneObject
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
		streamToView: function(spectators) {			
			this.clients = $(spectators);
			
			this.parent.addEventListener("keyup", () => this.broadcast());			
			// this.parent.addEventListener("change", c => broadcast(c));
			// this.parent.addEventListener("click", c => broadcast(c));
			
		},
		streamToModel: function() {
			this.parent.addEventListener("keyup", () => log(this.getFields()) );
			return this;
		},
		getFields: function() {			
			var input = {};
			for(field in this.objectClone) {
				input[field] = this.objectClone[field];
			}
			return	input;
		},
		broadcast: function() {	
			for (var i = 0; i < this.clients.length; i++) {
				this.clients[i].innerHTML = JSON.stringify(this.objectClone);				
			}				 
		}
	};
}())	

var taskForm = {}; // An object whose properties are bound to getFields of a form

var o = o_o.insideOf('#form').observe('input, textarea, :checkbox').cacheTo(taskForm)
				.streamToModel().streamToView("#screen, #screen2");
>>>>>>> 4d89db0b71af0b7a0787a17e17d6b4f3a34fd61a
