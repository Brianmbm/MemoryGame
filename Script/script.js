
const images =['card_1.jpg', 'card_2.jpg', 'card_3.jpg']

//Shuffle the cards before putting them in column (Fishe-Yates Shuffle, answer from Stackoverflow)


//Initialize game/gameboard
function createGameBoard() {

    const gameBoardDiv = document.getElementById('game-board');
    gameBoardDiv.classList.add('gameboard')
    
//Create two columns for the game board
    for (let i = 0; i < 2; i++) {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        let shuffledImages = shuffleCards(images);
        let counter = 0
        
//Create the cards in three rows
    for (let j = 0; j < 3; j++) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const imageName = shuffledImages[counter++];
        cardDiv.style.backgroundImage = `url('../../Resources/cardBack.jpg')`;
        cardDiv.setAttribute('data-image', imageName);
        cardDiv.addEventListener('click', () => toggleCard(cardDiv));
        columnDiv.appendChild(cardDiv);
    }
        gameBoardDiv.appendChild(columnDiv);
    }
}
document.addEventListener('DOMContentLoaded', createGameBoard);

let shuffleCards = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
function toggleCard(cardDiv) {
    const isCardBack = cardDiv.style.backgroundImage.includes('cardBack');
    const imageName = cardDiv.getAttribute('data-image');

    cardDiv.style.backgroundImage = isCardBack
        ? `url('../../Resources/${imageName}')`
        : `url('../../Resources/cardBack.jpg')`;
}