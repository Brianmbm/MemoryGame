//TODO: Add level one and two code
//TODO: Game over view, add button to back to menu
//TODO: On win screen, add button to save highscore and button to go back to menu
//TODO: Add bonuses at end of round, show them in win screen
//TODO: Add "sure you want to quit" dialogue
//FIXME: can currently show more cards than 2 by clicking fast
//FIXME: Background image responsive but not in a good way.
//FIXME: Need time pause after last selection before game won/game over screen
//MUSTS: Animations, webcomponents, validation.pdf to verify CSS, Javascript and automated testing. Responsive (large screen and phone screen)

const imagesLevelZero =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg']
const imagesLevelOne =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg']
const imagesLevelTwo =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_5.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_5.jpg']
let selectedCards =[]
let score = 0
let roundCounter = 0;
const columnOne = document.getElementById('column1')
const columnTwo = document.getElementById('column2')
const columnThree = document.getElementById('column3')
const columnFour = document.getElementById('column4')
const menuScreen = document.getElementById('menu-game')
const levelScreen = document.getElementById('level-screen')

document.addEventListener('DOMContentLoaded', createStartScreen)

function createStartScreen(){
    const startscreenDiv = document.getElementById('start-screen');
    startscreenDiv.style.display = "flex"
    startscreenDiv.style.backgroundImage = `url('../../Resources/SplashscreenLoading.jpg')`
    //On click remove splash screen, add game board
    startscreenDiv.addEventListener('click', function () {
        startscreenDiv.style.display = "none"
        createMenu()
    })
}

function createMenu(){
    menuScreen.style.display = "flex"
    menuScreen.style.backgroundImage=`url('../../Resources/SplashscreenMenu.jpg')`
    menuScreen.style.justifyContent="start"
    document.getElementById('menu-rect').style.marginTop="10vh"
    const startButton = document.getElementById('start-button')
    startButton.addEventListener('click', () => createLevelScreen())
    const guideButton = document.getElementById('guide-button')
    guideButton.addEventListener('click', () => createGuideScreen())
    const aboutButton = document.getElementById('about-button')
    aboutButton.addEventListener('click', () => createAboutScreen())
    const highscoreButton = document.getElementById('highscore-button')
    highscoreButton.addEventListener('click', () => createHighScoreScreen())
    const quitButton = document.getElementById('quit-button')
    quitButton.addEventListener('click', () => close())
}

function createLevelScreen(){
    menuScreen.style.display='none'
    levelScreen.style.display = "flex"
    levelScreen.style.backgroundImage = `url('../../Resources/Levelscreen.jpg')`
    const levelZeroButton = document.getElementById('levelzero-button')
    levelZeroButton.addEventListener('click', () => createGameBoard())
}

//Create intial game/gameboard
function createGameBoard() {
    levelScreen.style.display = "none"
    const mainDiv = document.getElementById('main-game')
    mainDiv.style.display = "flex"
    mainDiv.style.height="98vh"
    mainDiv.style.width="95vw"
    const gameBoardDiv = document.getElementById('game-board')
    let shuffledImages = shuffleCards(imagesLevelZero)
    let counter = 0
    columnOne.style.display = "flex"
    columnTwo.style.display = "flex"


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
                    if (score >= 150) {
                        createWinScreen();
                    }
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
            if (columnOne.childElementCount > 3 || columnTwo.childElementCount > 3) {
                createGameOverScreen();
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
    let shuffledImages = shuffleCards(imagesLevelZero);
    const imageName = shuffledImages[1];
    return imageName;
}
function createWinScreen(){
    document.getElementById('main-game').style.display='none'
    const winScreen = document.getElementById('win-screen')
    winScreen.style.display = "flex"
    winScreen.style.backgroundImage = `url('../../Resources/SplashscreenWon.jpg')`
}
function createGameOverScreen(){
    document.getElementById('main-game').style.display='none'
    const gameoverScreen = document.getElementById('gameover-screen');
    gameoverScreen.style.display = "flex"
    gameoverScreen.style.backgroundImage = `url('../../Resources/SplashscreenGameOver.jpg')`
}
function createGuideScreen(){
    menuScreen.style.display='none'
    const guideScreen = document.getElementById('guide-screen')
    guideScreen.style.display = "flex"
    guideScreen.style.backgroundImage = `url('../../Resources/SplashscreenGuide.jpg')`
    document.getElementById('guide-back-button').addEventListener('click', function () {
        guideScreen.style.display = 'none';
        menuScreen.style.display = "flex"
    });
}
function createAboutScreen(){
    menuScreen.style.display='none'
    const aboutScreen = document.getElementById('about-screen')
    aboutScreen.style.display = "flex"
    aboutScreen.style.backgroundImage = `url('../../Resources/SplashscreenAbout.jpg')`
    document.getElementById('about-back-button').addEventListener('click', function () {
        aboutScreen.style.display = 'none';
        menuScreen.style.display = "flex"
    });
}
function createHighScoreScreen(){
    menuScreen.style.display='none'
    const highScreen = document.getElementById('highscore-screen')
    highScreen.style.display = "flex"
    highScreen.style.backgroundImage = `url('../../Resources/SplashscreenHigh.jpg')`
}
