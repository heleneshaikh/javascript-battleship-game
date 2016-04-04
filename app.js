//Math.random()*5 => generate 5 numbers starting from 0. So from 0 to 4.

var model = {
	boardSize: 7,
	numberOfShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

	fire: function(guess) {
		for (var i = 0; i < this.numberOfShips; i++) {
			var ship = this.ships[i]; //take one ship at a time
			var index = ship.locations.indexOf(guess); //look if you guess appears in the locations array of that ship

			if (ship.hits[index] === "hit") {
				view.displayMessage("Location already hit!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit"; //give that location a hit property if it hasn't been hit yet
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
		view.displayMessage("MISS!");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numberOfShips; i++) { //for every ship, we want to generate locations
			do {
				locations = this.generateShip();
			} while (this.collision(locations)); //if collision, need to keep regenerating locations
			this.ships[i].locations = locations; //add to model array
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal ship code
			row = Math.floor(Math.random() * this.boardSize); //horizontal ship can be located in any row
			col = Math.floor(Math.random() * (this.boardSize - 3));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - 3)); //must start at row 0-4 to leave room for the next two locations
			col = Math.floor(Math.random() * this.boardSize); //can be located in any col
		}

		var newShipLocations = []; //start empty, add locations one by one
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col); //+ is concatenation not addition, so we get a string.
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numberOfShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("message");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location); //fire method returns true if it's hit
			if (hit && model.shipsSunk === model.numberOfShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
}

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Doesn't exist");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Off the board!");
		} else {
			return row + column;  //concatenation
		}
	}
	return null;
}

// event handlers

function handleFireButton() { // get the player's guess from the form + get it to the controller.
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = ""; //resets the form input. Don’t have to explicitly select the text and delete it before entering the next guess.

}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}


// init - called when the page has completed loading

window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}
