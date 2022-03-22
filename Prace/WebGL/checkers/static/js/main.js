import UiControler from './ui/index.js'
import GameManager from './game.js'

document.addEventListener('DOMContentLoaded', () => {
    new GameManager();
    new UiControler();
})
