let player;
let ground;
let cursors;
let scoreText;
let distance = 0;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }, // Une bonne gravité pour un saut réactif
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
    // Pas d'images externes pour l'instant, on utilise des formes générées par code
}

function create() {
    // 1. Ciel (Fond d'écran)
    this.add.rectangle(400, 225, 800, 450, 0x1a1a2e);

    // 2. Création du Sol (statique, ne bouge pas)
    ground = this.physics.add.staticRectangle(400, 420, 800, 60);
    // On dessine visuellement le sol
    let groundGraphics = this.add.rectangle(400, 420, 800, 60, 0x16213e);
    
    // 3. Création du Personnage (un carré rouge vif)
    // Il commence à la position x: 150, y: 300
    player = this.physics.add.image(150, 300, null).setDisplaySize(40, 40);
    player.setTint(0xe94560); // Couleur rouge/rose
    player.setCollideWorldBounds(true); // Empêche le joueur de sortir de l'écran par le haut

    // Collision entre le joueur et le sol
    this.physics.add.collider(player, ground);

    // 4. Activer les touches du clavier (Espace ou Flèche du haut)
    cursors = this.input.keyboard.createCursorKeys();
    // Permettre aussi de sauter en cliquant/touchant l'écran
    this.input.on('pointerdown', () => {
        jump();
    });

    // 5. Affichage du score / de la distance parcourue en haut à gauche
    scoreText = this.add.text(20, 20, 'Distance : 0m', { fontSize: '20px', fill: '#ffffff' });
}

function update(time, delta) {
    // Le joueur saute si on appuie sur Espace ou Flèche du Haut ET qu'il touche le sol
    if ((cursors.space.isDown || cursors.up.isDown)) {
        jump();
    }

    // Incrémenter la distance parcourue avec le temps
    distance += delta * 0.01;
    scoreText.setText('Distance : ' + Math.floor(distance) + 'm');
}

// Fonction de saut mutualisée (clavier ou clic)
function jump() {
    // body.touching.down vérifie si le personnage est bien posé sur le sol
    if (player.body.touching.down) {
        player.setVelocityY(-550); // Impulsion vers le haut
    }
}
