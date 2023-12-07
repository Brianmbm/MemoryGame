class AboutScreen extends HTMLElement {
    connectedCallback() {
        this.classList.add('defaultscreen'); 
        this.style.backgroundImage = `url('${this.getImageFolderPath()}SplashscreenAbout.jpg')`;

        const aboutRect = document.createElement('div');
        aboutRect.classList.add('defaultrect');
        aboutRect.innerHTML = `
            <h2>About MEMOFUDA</h2>
            <p>Memofuda is a Memory game with art inspired by Japanese Hanafuda card games and Japanese wood-art known as Ukiyo-e.</p>
            <p>The game art was made with the AI Image Generator, Midjourney.</p>
            <p>The game was created as a short Javascript-course project by Brian Bocquet</p>
        `;

        const backButton = document.createElement('button');
        backButton.id = 'about-back-button';
        backButton.classList.add('menubutton');
        backButton.textContent = 'Back to Menu';
        backButton.addEventListener('click', () => {
            this.style.display = 'none';
            document.getElementById('menu-game').style.display="flex";
        });

        this.appendChild(aboutRect);
        this.appendChild(backButton);}

    getImageFolderPath() {
        return window.innerWidth < 480 ? '../../Resources/Small/' : '../../Resources/';}
}

customElements.define('about-screen', AboutScreen);
