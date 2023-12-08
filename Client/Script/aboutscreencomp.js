class AboutScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="CSS/main.css">
        <div id="screen" class="defaultscreen">
            <div class="defaultrect">
                <h2>About MEMOFUDA</h2>
                <p>Memofuda is a Memory game with art inspired by Japanese Hanafuda card games and Japanese wood-art known as Ukiyo-e.</p>
                <p>The game art was made with the AI Image Generator, Midjourney.</p>
                <p>The game was created as a short Javascript-course project by Brian Bocquet</p>
            </div>
            <button id="about-back-button" class="menubutton">Back to Menu</button>
        </div>`

        const backButton = this.shadowRoot.getElementById('about-back-button')
        this.shadowRoot.getElementById('screen').style.display="flex"
        if(window.innerWidth < 480){
            this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/SplashscreenAbout.jpg')`
        }
        else this.shadowRoot.getElementById('screen').style.backgroundImage=`url('../../Resources/Small/SplashscreenAbout.jpg')`
        backButton.addEventListener('click', () => {
            this.style.display = 'none'
            document.getElementById('menu-game').style.display = 'flex'
            
        })
        
    }
    
}

customElements.define('about-screen', AboutScreen);
