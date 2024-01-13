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

const imgPath = ".src/assets/icons/";

const cardData = [
	{
		id: 0,
		name: "Blue Eyes White Dragon",
		type: "Paper",
		img: `${imgPath}dragon.png`,
        winOf : [1],
        loseOf: [2]
	},
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        LoseOf: [0]
    },
    {
         id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        LoseOf: [2]
    }
];


async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId()
        const cardImage = await creatCardImage 
    }

} 

function init() {
    drawCards(5, "player")
    drawCards(5, "computer")
}

init();
