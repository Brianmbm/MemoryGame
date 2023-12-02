
//TODO: revert card to cardback after two clicks if cards not same
//TODO: add two cards after three "rounds", the new cards should not be the same
//TODO: end game if no cards left or more than 3 rows of cards
//TODO: Keep track of highscore
//TODO: Rules guide view
//TODO: About info view
//TODO: Game over view
//TODO: Congratulations view
//MUSTS: Animations, webcomponents, validation.pdf to verify CSS, Javascript and automated testing. Responsive (large screen and phone screen)

const images =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg']
let selectedCards =[]
let score = 0
let roundCounter = 0;
const columnOne = document.getElementById('column1')
const columnTwo = document.getElementById('column2')

document.addEventListener('DOMContentLoaded', createStartScreen)


function createStartScreen(){
    const startscreenDiv = document.getElementById('start-screen');
    startscreenDiv.style.display = "flex"
    startscreenDiv.style.height = "71vh"
    startscreenDiv.style.width= "89vh"
    startscreenDiv.style.backgroundImage = `url('../../Resources/SplashscreenLoading.jpg')`
    //On click remove splash screen, add game board
    startscreenDiv.addEventListener('click', function () {
        startscreenDiv.style.display = "none"
        createMenu()
    })
    }

function createMenu(){
    const menuDiv =document.getElementById('menu-game')
    menuDiv.style.display = "flex"
    menuDiv.style.height = "71vh"
    menuDiv.style.width= "89vh"
    menuDiv.style.backgroundImage=`url('../../Resources/SplashscreenMenu.jpg')`
    const startButton = document.getElementById('start-button')
    startButton.addEventListener('click', function () {
        menuDiv.style.display = "none"
        createGameBoard()
    })
    const quitButton = document.getElementById('quit-button')
    quitButton.addEventListener('click', () => close())
}

//Create intial game/gameboard

function createGameBoard() {
    document.getElementById('main-game').style.display = "flex"
    const gameBoardDiv = document.getElementById('game-board')
    let shuffledImages = shuffleCards(images)
    let counter = 0


//Create two columns for the game board
for (let j = 0; j < 6; j++) {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    const imageName = shuffledImages[counter++];
    cardDiv.style.backgroundImage = `url('../../Resources/cardBack.jpg')`
    cardDiv.setAttribute('data-image', imageName);
    cardDiv.addEventListener('click', () => toggleCard(cardDiv))

    // Use an if statement to determine the column
    if (j < 3) {
        columnOne.appendChild(cardDiv);
    } else {
        columnTwo.appendChild(cardDiv);
    }
}

}
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
                    score += 50;
                    console.log(score)
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
            roundCounter++;
            console.log(roundCounter)
            if (++roundCounter % 3 === 0) {
                addNewCards();
            }
        }
    }
}
//add one card to each column after three attempts
function addNewCards() {
    for (let i = 0; i < 2; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const imageName = getCardImage();
        cardDiv.style.backgroundImage = `url('../../Resources/cardBack.jpg')`;
        cardDiv.setAttribute('data-image', imageName);
        cardDiv.addEventListener('click', () => toggleCard(cardDiv));
        if (i < 1) {
            columnOne.appendChild(cardDiv);
        } else {
            columnTwo.appendChild(cardDiv);
        }
    }
}
//Get random card to add (first from shuffled array)
function getCardImage(){
    let shuffledImages = shuffleCards(images);
    const imageName = shuffledImages[1];
    return imageName;
}
