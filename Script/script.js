
//TODO: revert card to cardback after two clicks if cards not same
//TODO: add two cards after three "rounds", the new cards should not be the same
//TODO: end game if no cards left or more than 3 rows of cards
//TODO: Keep track of highscore
//TODO: Initial loading splash screen view
//TODO: Rules guide view
//TODO: About info view
//TODO: Game over view
//TODO: Congratulations view
//FIXME: Currently three cards shuffled and dealt to individual column, shuffle six cards divide amongst both columns
//MUSTS: Animations, webcomponents, validation.pdf to verify CSS, Javascript and automated testing. Responsive (large screen and phone screen)


const images =['card_1.jpg', 'card_2.jpg', 'card_3.jpg']
let selectedCards =[]

//Create intial game/gameboard
function createGameBoard() {

    const gameBoardDiv = document.getElementById('game-board');
    gameBoardDiv.classList.add('gameboard')
    
//Create two columns for the game board
    for (let i = 0; i < 2; i++) {
        const columnDiv = document.createElement('div')
        columnDiv.classList.add('column')
        let shuffledImages = shuffleCards(images)
        let counter = 0
        
//Create the cards in three rows
    for (let j = 0; j < 3; j++) {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        const imageName = shuffledImages[counter++];
        cardDiv.style.backgroundImage = `url('../../Resources/cardBack.jpg')`
        cardDiv.setAttribute('data-image', imageName);
        console.log(imageName)
        cardDiv.addEventListener('click', () => toggleCard(cardDiv))
        columnDiv.appendChild(cardDiv)
    }
        gameBoardDiv.appendChild(columnDiv);
    }
}
//Add game board to DOM on start
document.addEventListener('DOMContentLoaded', createGameBoard)

//Shuffle the cards before putting them in column (Fishe-Yates Shuffle, answer from Stackoverflow)
let shuffleCards = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
    return array
}
//Show cards when clicked
function toggleCard(cardDiv) {
    const isCardBack = cardDiv.style.backgroundImage.includes('cardBack')
    const imageName = cardDiv.getAttribute('data-image')

    if (isCardBack) {
        cardDiv.style.backgroundImage = `url('../../Resources/${imageName}')`;
        selectedCards.push({ div: cardDiv, name: imageName });

        if (selectedCards.length === 2) {
            //Match Found
            if (selectedCards[0].name === selectedCards[1].name) {
                setTimeout(() => {
                    selectedCards.forEach((card) => card.div.remove());
                    selectedCards = [];
                }, 1000); 
            //Match not found
            } else {
                setTimeout(() => {
                    selectedCards.forEach((card) => {
                        card.div.style.backgroundImage = `url('../../Resources/cardBack.jpg')`;
                    });
                    selectedCards = [];
                }, 1000); 
            }
        }
    }
}