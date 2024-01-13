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

const imgPath = "./src/assets/icons/";

const cardData = [
	{
		id: 0,
		name: "Blue Eyes White Dragon",
		type: "Paper",
		img: `${imgPath}dragon.png`,
		winOf: [1],
		loseOf: [2],
	},
	{
		id: 1,
		name: "Dark Magician",
		type: "Rock",
		img: `${imgPath}magician.png`,
		winOf: [2],
		LoseOf: [0],
	},
	{
		id: 2,
		name: "Exodia",
		type: "Scissors",
		img: `${imgPath}exodia.png`,
		winOf: [0],
		LoseOf: [2],
	},
];

async function drawSelectedCard(index) {
	state.cardsSprites.avatar.src = cardData[index].img;
	state.cardsSprites.name.innerText = cardData[index].name;
	state.cardsSprites.type.innerText = "atributte: " + cardData[index].type;
}

async function getRandomCardId() {
	const randomIndex = Math.floor(Math.random() * cardData.length);
	return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
	const cardImage = document.createElement("img");
	cardImage.setAttribute("heigth", "100px");
	cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
	cardImage.setAttribute("data-id", idCard);
	cardImage.classList.add("card");

	if (fieldSide === players.player1) {
		cardImage.addEventListener("click", () => {
			setCardField(cardImage.getAttribute("data-id"));
		});
	}

	cardImage.addEventListener("mouseover", () => {
		drawSelectedCard(idCard);
	});

	return cardImage(idCard);
}

async function drawCards(cardNumbers, fieldSide) {
	for (let i = 0; i < cardNumbers; i++) {
		const randomIdCard = await getRandomCardId();
		const cardImage = await createCardImage(randomIdCard, fieldSide);

		document.getElementById(fieldSide).appendChild(cardImage);
	}
}

function init() {
	drawCards(5, players.player1);
	drawCards(5, players.player2);
}

init();
