let player;
let ground;
let scoreText;
let distance = 0;

const config = {
    type: Phaser.AUTO,
    // On s'adapte à la taille de l'écran du smartphone
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT, // Ajuste proprement le jeu à l'écran sans le déformer
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 }, // Gravité un peu plus forte pour un meilleur feeling tactile
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Rien pour l'instant
}

function create() {
    // 1. Fond d'écran adapté à la taille dynamique
    this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0x1a1a2e);

    // 2. Le Sol (basé sur la hauteur de l'écran)
    const groundHeight = 80;
    ground = this.physics.add.staticRectangle(config.width / 2, config.height - (groundHeight / 2), config.width, groundHeight);
    
    // Visuel du sol
    this.add.rectangle(config.width / 2, config.height - (groundHeight / 2), config.width, groundHeight, 0x16213e);

    // 3. Le Personnage
    player = this.physics.add.image(150, config.height - 200, null).setDisplaySize(50, 50);
    player.setTint(0xe94560);
    player.setCollideWorldBounds(true);

    // Collision sol/joueur
    this.physics.add.collider(player, ground);

    // 4. Contrôle tactile unique : Appuyer n'importe où sur l'écran fait sauter
    this.input.on('pointerdown', () => {
        jump();
    });

    // 5. Score / Distance
    scoreText = this.add.text(30, 30, 'Distance : 0m', { fontSize: '24px', fill: '#ffffff' });
}

function update(time, delta) {
    // Incrémenter la distance
    distance += delta * 0.01;
    scoreText.setText('Distance : ' + Math.floor(distance) + 'm');
}

function jump() {
    // Si le joueur touche le sol, il saute
    if (player.body.touching.down) {
        player.setVelocityY(-650);
    }
}
