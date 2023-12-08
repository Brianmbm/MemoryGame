class GuideScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="CSS/main.css">
        <div id="screen" class="defaultscreen">
            <div class="defaultrect">
                <h2>Game Play Rules:</h2>
                <p>1. Match 2 cards to earn 50 points, and the matched cards disappear.</p>
                <p>2. After the 3rd turn (2 card picks, counts as one turn), one new card for each column drop down.</p>
                <p>3. Game over occurs when any column has 4 cards high.</p>
                <p>4. Complete the game when you reach 150 points for level zero, 250 for level one, or 350 for level two.</p>
                <h2>Game Over:</h2>
                <p>Game over for any case where one column has 4 cards high.</p>
                <h2>Completed Game:</h2>
                <p>Complete the game as soon as you reach the required score</p>
                <h2>Bonus Points:</h2>
                <p>For every empty row on height 3: 50 points for every empty row in each column.</p>
                <p>For every empty row on height 2: 100 points for every empty row in each column.</p>
                <p>For every empty row on height 1: 150 points for every empty row in each column.</p>
            </div>
            <button id="guide-back-button" class="menubutton">Back to Menu</button>
        </div>`

        const backButton = this.shadowRoot.getElementById('guide-back-button')
        this.shadowRoot.getElementById('screen').style.display="flex"
        if(window.innerWidth < 480){
            this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/SplashscreenGuide.jpg')`
        }
        else this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/Small/SplashscreenGuide.jpg')`
        backButton.addEventListener('click', () => {
            this.style.display = 'none'
            document.getElementById('menu-game').style.display = 'flex'
            
        })
        
    }
    
}

customElements.define('guide-screen', GuideScreen);
