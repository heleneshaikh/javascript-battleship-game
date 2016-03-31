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

var controller = {
	var numberOfGuesses = 0;
	processGuess : function(guess) {

	}
}

function parseGuess(guess) { //B1
	var alphabet = ["A", "B", "C", "D", "E", "F"];
	if (guess === null || guess !== 2) {
		alert('Error! Enter a letter followed by a number');
	} else {
		firstCharacter = guess.charAt(0); //B
		var row = alphabet.indexOf(firstCharacter); //1
		var column = guess.charAt(1);

		if(isNan(row) || isNan(column)) {
			alert('This is not on the board');
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert('That is off the board');
		}
	}
}
