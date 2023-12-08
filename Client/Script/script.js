//TODO Prio Low: Add click to continue dialogue in startscreen
//TODO Prio Low: Add "sure you want to quit" dialogue
//TODO Prio High: Use webcomponents
//TODO Prio Med: Animations when switching views (maybe use opacitity, example in https://stackoverflow.com/questions/74831681/how-to-make-a-image-appear-and-disappear-through-simple-animation )
//TODO Prio High: Use validation PDF (verify Css, javascript, automated testing)
//FIXME Prio Low: can currently show more cards than 2 by clicking fast, can also click on card in the settimeout before gameover.
//TODO Prio Low: Fix highscore screen styling (fonts etc) 
//TODO Prio Low: Change aboutscreen so it uses constructor and shadowroot and not callback (find out how to take style from main CSS sheet)
//INFO: Do not run live server from main Memory game folder in VS as it reloads page when writing to server files. Run from Client folder.


const imagesLevelZero =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg']
const imagesLevelOne =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_5.jpg']
const imagesLevelTwo =['card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_5.jpg', 'card_6.jpg', 'card_1.jpg', 'card_2.jpg', 'card_3.jpg', 'card_4.jpg', 'card_5.jpg', 'card_6.jpg']

let selectedCards =[]
let score = 0
let roundCounter = 0;
let level = 0

const imagesByLevel = [imagesLevelZero, imagesLevelOne, imagesLevelTwo];
const columnOne = document.getElementById('column1')
const columnTwo = document.getElementById('column2')
const columnThree = document.getElementById('column3')
const columnFour = document.getElementById('column4')
const menuScreen = document.getElementById('menu-game')
const levelScreen = document.getElementById('level-screen')
const columns = [columnOne, columnTwo, columnThree, columnFour];
document.addEventListener('DOMContentLoaded', createStartScreen)

function createStartScreen(){
    const startscreenDiv = document.getElementById('start-screen')
    startscreenDiv.style.display = "flex"
    startscreenDiv.style.backgroundImage = `url('${getImageFolderPath()}SplashscreenLoading.jpg')`
    startscreenDiv.addEventListener('click', function () {
        startscreenDiv.style.display = "none"
        createMenu()})}

function createMenu(){
    menuScreen.style.display = "flex"
    menuScreen.style.backgroundImage=`url('${getImageFolderPath()}SplashscreenMenu.jpg')`
    menuScreen.style.justifyContent="start"
    document.getElementById('menu-rect').style.marginTop="6vh"
    anime({
        targets: '#turning-circle',
        rotate: '-360deg', 
        duration: 2000,
        easing: 'linear', 
        loop: true});

    const startButton = document.getElementById('start-button')
    startButton.addEventListener('click', () => createLevelScreen())
    const guideButton = document.getElementById('guide-button')
    guideButton.addEventListener('click', () => createGuideScreen())
    const aboutButton = document.getElementById('about-button');
    aboutButton.addEventListener('click', () => {
        menuScreen.style.display = 'none'
        document.querySelector('about-screen').style.display = 'flex'})
    const highscoreButton = document.getElementById('highscore-button')
    highscoreButton.addEventListener('click', () => createHighScoreScreen())
    const quitButton = document.getElementById('quit-button')
    quitButton.addEventListener('click', () => close())}

function createLevelScreen(){
    menuScreen.style.display='none'
    levelScreen.style.display = "flex"
    levelScreen.style.backgroundImage = `url('${getImageFolderPath()}Levelscreen.jpg')`
    const levelZeroButton = document.getElementById('levelzero-button')
    levelZeroButton.addEventListener('click', () => {
    level = 0
    createGameBoard()})
    const levelOneButton = document.getElementById('levelone-button')
    levelOneButton.addEventListener('click', () => {
    level = 1
    createGameBoard()})
    const levelTwoButton = document.getElementById('leveltwo-button')
    levelTwoButton.addEventListener('click', () => {
        level = 2
        createGameBoard()})}


function createGameBoard() {
    levelScreen.style.display = "none"
    const mainDiv = document.getElementById('main-game')
    mainDiv.style.display = "flex"
    mainDiv.style.height="98vh"
    mainDiv.style.width="95vw"
    let shuffledImages = shuffleCards(imagesByLevel[level])
    let counter = 0
    for (let i = 0; i < columns.length; i++) {
            columns[i].innerHTML = ""
    }
    const numColumns = level + 2
    for (let i = 0; i < numColumns; i++) {
        columns[i].style.display = "flex"
        for (let j = 0; j < 3; j++) {
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            const imageName = shuffledImages[counter++];
            cardDiv.style.backgroundImage = `url('${getImageFolderPath()}cardBack.jpg')`
            cardDiv.setAttribute('data-image', imageName);
            cardDiv.addEventListener('click', () => toggleCard(cardDiv, level))
            columns[i].appendChild(cardDiv)}}}

//Shuffle the cards before putting them in column (Fishe-Yates Shuffle, answer from Stackoverflow)
let shuffleCards = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    } return array}


function toggleCard(cardDiv) {
    const isCardBack = cardDiv.style.backgroundImage.includes('cardBack')
    const imageName = cardDiv.getAttribute('data-image')

    if (isCardBack) {
        cardDiv.style.backgroundImage = `url('${getImageFolderPath()}${imageName}')`
        selectedCards.push({ div: cardDiv, name: imageName });

        if (selectedCards.length === 2) {
            if (selectedCards[0].name === selectedCards[1].name) {
                setTimeout(() => {
                    score += 50;
                    if(level === 0 && score >= 150){
                            score+=calculateBonus()
                            createWinScreen()}
                    else if(level === 1 && score >= 250){
                            score+=calculateBonus()
                            createWinScreen()}
                    else if(level === 2 && score >= 350) {
                            score+=calculateBonus()
                            createWinScreen()}
                }, 1000)
                setTimeout(() => {selectedCards.forEach((card) => card.div.remove())
                selectedCards = [];}, 500)} 

            else {setTimeout(() => {
                    selectedCards.forEach((card) => {
                        card.div.style.backgroundImage = `url('${getImageFolderPath()}cardBack.jpg')`});
                    selectedCards = [];}, 1000);}


            roundCounter++
            setTimeout(() => {
            if (level === 0 && roundCounter % 3 === 0) {
                if (score < 150) {
                    roundCounter=0
                    addNewCards(level);}} 
            else if (level === 1 && roundCounter % 5 === 0) {
                if (score < 250) {
                    roundCounter=0
                    addNewCards(level);}} 
            else if (level === 2 && roundCounter % 7 === 0) {
                if (score < 350) {
                    roundCounter=0
                    addNewCards(level);}}
                   
            const numColumns = level + 2
            for (let i = 0; i < numColumns; i++) {
                if (columns[i].childElementCount > 3) {
                    setTimeout(()=>{createGameOverScreen()}, 1000)
                    return; 
                }
            }},1000)
        }
    }
}

//Add one card to each column after three attempts
function addNewCards() {
    const numColumns = level + 2
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < 1; j++) {
            const cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            const imageName = getCardImage(level)
            cardDiv.style.backgroundImage = `url('${getImageFolderPath()}cardBack.jpg')`
            cardDiv.setAttribute('data-image', imageName);
            cardDiv.addEventListener('click', () => toggleCard(cardDiv))
            columns[i].appendChild(cardDiv)}}}

//Get random card to add (first from shuffled array)
function getCardImage(){
    const shuffledImages = shuffleCards(imagesByLevel[level]);
    const imageName = shuffledImages[0];
    return imageName;}

function createWinScreen(){
    document.getElementById('main-game').style.display='none'
    const winScreen = document.getElementById('win-screen')
    winScreen.style.display = "flex"
    winScreen.style.backgroundImage = `url('${getImageFolderPath()}SplashscreenWon.jpg')`

    document.getElementById("win-score").textContent=`Final score: ${score}`
    
    winbackButton = document.getElementById('winback-button')
    sendHighScoreToServer(score)
    winbackButton.style.margin = "2vh"
    winbackButton.addEventListener('click', ()=>  {
        score = 0
        roundCounter=0
        winScreen.style.display = 'none'
        menuScreen.style.display = "flex"})}

function createGameOverScreen(){
    document.getElementById('main-game').style.display='none'
    const gameoverScreen = document.getElementById('gameover-screen')
    gameoverScreen.style.display = "flex"
    gameoverScreen.style.backgroundImage = `url('${getImageFolderPath()}SplashscreenGameOver.jpg')`
    gameoverScreen.style.justifyContent = "start"
    losebackButton = document.getElementById('loseback-button')
    losebackButton.style.alignSelf = "start"
    losebackButton.style.margin = "2vh"
    losebackButton.addEventListener('click', ()=>  {
        score = 0
        roundCounter=0
        gameoverScreen.style.display = 'none'
        menuScreen.style.display = "flex"})}

function createGuideScreen(){
    menuScreen.style.display='none'
    const guideScreen = document.getElementById('guide-screen')
    guideScreen.style.display = "flex"
    guideScreen.style.backgroundImage = `url('${getImageFolderPath()}SplashscreenGuide.jpg')`
    document.getElementById('guide-back-button').addEventListener('click', function () {
        guideScreen.style.display = 'none'
        menuScreen.style.display = "flex" })}

function createHighScoreScreen(){
    menuScreen.style.display='none'
    getHighScores()
    const highScreen = document.getElementById('highscore-screen')
    highScreen.style.display = "flex"
    highScreen.style.backgroundImage = `url('${getImageFolderPath()}SplashscreenHigh.jpg')`
    document.getElementById('highscoreback-button').addEventListener('click', function () {
        highScreen.style.display = 'none'
        menuScreen.style.display = "flex"})}

function getImageFolderPath() {
    return window.innerWidth < 480 ? '../../Resources/Small/' : '../../Resources/';
}
function calculateBonus() {
    let bonus = 0
    const numColumns = columns.length

    for (let i = 0; i < numColumns; i++) {
        const columnHeight = columns[i].childElementCount
        if (columnHeight === 0) {
            bonus += 150; 
        } else if (columnHeight === 1) {
            bonus += 100; 
        } else if (columnHeight === 2) {
            bonus += 50; 
        }
    } return bonus;}   

function sendHighScoreToServer(score) {
    const url = 'http://localhost:4000/highscores'; 
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),})
    .then(response => {return response.json()})
    .then(data => {console.log('High score sent successfully:', data)})}

function getHighScores() {
    const url = 'http://localhost:4000/highscores';
    fetch(url)
    .then(response => response.json())
    .then(data => displayHighScores(data))}

function displayHighScores(highScores) {
    console.log('High Scores:', highScores)
    const highScoreList = document.getElementById('highscore-list')
    highScoreList.innerHTML = ''
    highScores.sort((a, b) => b.score - a.score)
    const ol = document.createElement('ol')
    for (let i = 0; i < Math.min(highScores.length, 10); i++) {
        const li = document.createElement('li')
        li.textContent = `Score: ${highScores[i].score} Date:${highScores[i].date}`
        ol.appendChild(li)}
    highScoreList.appendChild(ol)}

