var view = {
	displayMessage: function(msg) {
		var message = document.getElementById('message');
		message.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	}
};

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
