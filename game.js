let player;
let ground;
let scoreText;
let distance = 0;
let cursors;

const config = {
    type: Phaser.AUTO,
    // On fixe une résolution de base en paysage (800x450)
    width: 800,
    height: 450,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT, // S'adapte à l'écran du smartphone sans déformer
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
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
    // Rien à charger pour l'instant
}

function create() {
    // 1. Fond d'écran (bleu nuit)
    this.add.rectangle(400, 225, 800, 450, 0x1a1a2e);

    // 2. Le Sol (basé sur la taille fixe 800x450)
    ground = this.physics.add.staticRectangle(400, 420, 800, 60);
    this.add.rectangle(400, 420, 800, 60, 0x16213e);

    // 3. Le Personnage (carré rouge)
    player = this.physics.add.image(150, 300, null).setDisplaySize(40, 40);
    player.setTint(0xe94560);
    player.setCollideWorldBounds(true);

    // Collision sol / joueur
    this.physics.add.collider(player, ground);

    // 4. Contrôle tactile : un appui n'importe où fait sauter
    this.input.on('pointerdown', () => {
        jump();
    });

    // 5. Texte de distance en haut à gauche
    scoreText = this.add.text(30, 30, 'Distance : 0m', { fontSize: '24px', fill: '#ffffff' });
}

function update(time, delta) {
    // Augmente la distance avec le temps
    distance += delta * 0.01;
    scoreText.setText('Distance : ' + Math.floor(distance) + 'm');
}

function jump() {
    // Si le joueur touche le sol, il saute
    if (player.body.touching.down) {
        player.setVelocityY(-550);
    }
}
