// Configuration principale du jeu Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }, // Gravité pour faire retomber les éléments
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialisation du jeu
const game = new Phaser.Game(config);

function preload() {
    // Ici, nous chargerons plus tard les images et les sons
}

function create() {
    // Message de test pour vérifier que tout fonctionne
    this.add.text(400, 225, 'Le jeu se lance !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
}

function update() {
    // Boucle de jeu exécutée 60 fois par seconde
}
