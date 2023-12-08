class HighScoreScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="CSS/main.css">
        <div id="screen" class="defaultscreen">
            <div class="defaultrect">
                <h1>TOP TEN SCORES</h1>
                <div id="highscore-list"></div>
            </div>
            <button id="highscoreback-button" class="menubutton">Back to Menu</button>
        </div>
        `

        const backButton = this.shadowRoot.getElementById('highscoreback-button')
        this.shadowRoot.getElementById('screen').style.display="flex"
        if(window.innerWidth < 480){
            this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/SplashscreenHigh.jpg')`
        }
        else this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/Small/SplashscreenHigh.jpg')`
        getHighScores(this.shadowRoot)
        backButton.addEventListener('click', () => {
            this.style.display = 'none'
            document.getElementById('menu-game').style.display = 'flex'
        })
        function getHighScores(shadowRoot) {
            const url = 'http://localhost:4000/highscores';
            fetch(url)
            .then(response => response.json())
            .then(data => displayHighScores(data, shadowRoot))}
                
        function displayHighScores(highScores, shadowRoot) {
            console.log('High Scores:', highScores)
            const highScoreList = shadowRoot.getElementById('highscore-list')
            highScoreList.innerHTML = ''
            highScores.sort((a, b) => b.score - a.score)
            const ol = document.createElement('ol')
            for (let i = 0; i < Math.min(highScores.length, 10); i++) {
                const li = document.createElement('li')
                li.style.fontSize ="1.5vh"
                li.textContent = `Score: ${highScores[i].score} Date:${highScores[i].date}`
                ol.appendChild(li)}
            highScoreList.appendChild(ol)}    
    }
    
    
}

customElements.define('highscore-screen', HighScoreScreen);



