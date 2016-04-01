'use strict';

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

var model = {
	boardSize: 7,
	numberOfShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [
					{ locations: ["06", "16", "26"], hits: ['', '', ''] },
				  { locations: ["24", "34", "44"], hits: ['', '', ''] },
					{ locations: ["10", "11", "12"], hits: ['', '', ''] }
	],

	fire: function(guess) {
		for (var i = 0 ; i < this.numberOfShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess); //search for guess in locations array of that particular ship

			if (index >=0) {
				ship.hits[index] = "hit"; //mark the hit at the same spot
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
						view.displayMessage("You sank my battleship!");
						this.shipsSunk++;
					}
					return true;
				}
			}
			view.displayMiss(guess);
			view.displayMessage("You missed.");
			return false;
		},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	}
};
/* TEST fire function */
model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");

var controller = {

}

function parseGuess(guess) { //B1
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2) {
		alert('Error! Enter a letter followed by a number');
	} else {
		var firstCharacter = guess.charAt(0); //B
		var row = alphabet.indexOf(firstCharacter); //1
		var column = guess.charAt(1);

		if(isNaN(row) || isNaN(column)) {
			alert('This is not on the board');
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert('That is off the board');
		} else {
			return row + column; //concatenation
		}
	}
	return null;
}

/* TEST parseGuess function */
console.log(parseGuess("A0")); //00
console.log(parseGuess("B6")); //16
console.log(parseGuess("G3")); //63
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));

/* TEST processGuess function */
controller.processGuess("A0");

	/* you sank my battleship: */
controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

	/* you sank my battleship: */
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

	/* you sank my battleship: */
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");
