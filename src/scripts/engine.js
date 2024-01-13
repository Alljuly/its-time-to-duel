const state = {
	score: {
		playerScore: 0,
		computerScore: 0,
		scoreBox: document.getElementById("score_points"),
	},
	cardsSprites: {
		avatar: document.getElementById("card-image"),
		name: document.getElementById("card-name"),
		type: document.getElementById("card-type"),
	},
	fieldCards: {
		player: document.getElementById("player-field-card"),
		computer: document.getElementById("computer-field-card"),
	},
	actions: {
		button: document.getElementById("next-duel"),
	},
};

const players = {
	player1: "player-cards",
	player2: "computer-cards",
};



function init() {}

init();
