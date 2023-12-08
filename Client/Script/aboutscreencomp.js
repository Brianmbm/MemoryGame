//TODO: Could not succesfully import stylesheet. Might have something to do with the display none default of defaulscreen style.Solvable with time
class AboutScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
            .defaultscreen{
                display: flex;
                background-color: #fbeace;
                background-size:cover;
                background-position:center;
                width:95vh;
                height: 85vh;
                max-width: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 1vh;
                background-image: url('../../Resources/SplashscreenAbout.jpg');
            }
            .defaultrect {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                background-color: #f2cba0;
                padding: 2vh;
                border-radius: 0.5vh;
                border-color: #2a2e31;
                border-width: 0.5vh;
                border-style:solid;
            }    
            .menubutton{
                background-image: linear-gradient(to right, #555452 0%, #64696d  51%, #2a2e31  100%);
                margin: 0.7vh;
                padding: 1vh 3vw;
                text-transform: uppercase;
                text-wrap: nowrap;
                font-size: 1.2vh;
                font-weight: bold;
                letter-spacing: 0.2vh;
                transition: 0.5s;
                background-size: 200% auto;
                color: white;            
                box-shadow: 0 0 0.5vh #000000;
                border-radius: 0.5vh;
                display: block;
              }
              .menubutton:hover {
                background-position: right center; 
                color: #fff;
              }
              @media only screen and (max-width: 480px) {
                .defaultscreen{
                    display: none;
                    background-color: #fbeace;
                    background-size:100% 500px;
                    background-position:center;
                    background-repeat: no-repeat;
                    background-image: url('../../Resources/Small/SplashscreenAbout.jpg');
                }
            }
            </style>
            <div class="defaultscreen">
                <div class="defaultrect">
                    <h2>About MEMOFUDA</h2>
                    <p>Memofuda is a Memory game with art inspired by Japanese Hanafuda card games and Japanese wood-art known as Ukiyo-e.</p>
                    <p>The game art was made with the AI Image Generator, Midjourney.</p>
                    <p>The game was created as a short Javascript-course project by Brian Bocquet</p>
                </div>
                <button id="about-back-button" class="menubutton">Back to Menu</button>
            </div>
        `;
        const backButton = this.shadowRoot.getElementById('about-back-button');
        backButton.addEventListener('click', () => {
            this.style.display = 'none';
            document.getElementById('menu-game').style.display = 'flex';
        });
    }
}

customElements.define('about-screen', AboutScreen);
