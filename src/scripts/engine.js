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
	players: {
		player1: "player-cards",
		playerBox: document.querySelector("#player-cards"),
		computer: "computer-cards",
		computerBox: document.querySelector("#computer-cards"),
	},
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
		loseOf: [0],
	},
	{
		id: 2,
		name: "Exodia",
		type: "Scissors",
		img: `${imgPath}exodia.png`,
		winOf: [0],
		loseOf: [2],
	},
];

const bgm = document.getElementById("bgm");
bgm.play();

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
	cardImage.setAttribute("height", "100px");
	cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
	cardImage.setAttribute("data-id", idCard);
	cardImage.classList.add("card");

	if (fieldSide === state.players.player1) {
		cardImage.addEventListener("mouseover", () => {
			drawSelectedCard(idCard);
		});
		cardImage.addEventListener("click", () => {
			setCardField(cardImage.getAttribute("data-id"));
		});
	}

	return cardImage;
}

async function setCardField(cardId) {
	await removeAllCardsImgs();

	let computerCardId = await getRandomCardId();

	await drawFieldCards();
	await drawCardsInField(cardId, computerCardId);

	let duelResult = await checkDuelResult(cardId, computerCardId);

	await updateScore();
	await drawButtom(duelResult);
}

async function drawCardsInField(cardId, computerCardId) {
	state.fieldCards.player.src = cardData[cardId].img;
	state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function drawFieldCards() {
	state.fieldCards.player.style.display = "block";
	state.fieldCards.computer.style.display = "block";
}

async function removeAllCardsImgs() {
	let cards = state.players.playerBox;
	let imgElements = cards.querySelectorAll("img");
	imgElements.forEach((img) => img.remove());

	cards = state.players.computerBox;
	imgElements = cards.querySelectorAll("img");
	imgElements.forEach((img) => img.remove());
}

async function checkDuelResult(player, computer) {
	let duelresult = "DRAW";

	let playerCard = cardData[player];

	if (playerCard.winOf.includes(computer)) {
		duelresult = "win";
		await playAudio(duelresult);
		state.score.playerScore++;
	} else if (playerCard.loseOf.includes(computer)) {
		duelresult = "lose";
		await playAudio(duelresult);
		state.score.computerScore++;
	}

	return duelresult;
}

async function updateScore() {
	state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose ${state.score.computerScore}`;
}

async function drawCards(cardNumbers, fieldSide) {
	for (let i = 0; i < cardNumbers; i++) {
		const randomIdCard = await getRandomCardId();
		const cardImage = await createCardImage(randomIdCard, fieldSide);

		document.getElementById(fieldSide).appendChild(cardImage);
	}
}

async function drawButtom(text) {
	state.actions.button.textContent = text;
	state.actions.button.style.display = "block";
}

async function resetDuel() {
	state.cardsSprites.avatar.src = "";
	state.cardsSprites.name.innerText = "CHOOSE";
	state.cardsSprites.type.innerText = "CHOOSE";
	state.actions.button.style.display = "none";

	state.fieldCards.player.style.display = "none";
	state.fieldCards.computer.style.display = "none";

	init();
}

async function playAudio(status) {
	const audio = new Audio(`./src/assets/audios/${status}.wav`);

	audio.play();
}

function init() {
	drawCards(5, state.players.player1);
	drawCards(5, state.players.computer);
}

init();
