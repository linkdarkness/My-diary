const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: function() {},
        create: function() {
            // On ajoute juste un fond vert pour voir si le moteur démarre
            this.add.rectangle(400, 300, 800, 600, 0x00ff00);
            this.add.text(100, 100, 'Le moteur fonctionne !', { fontSize: '32px', fill: '#000' });
        },
        update: function() {}
    }
};

const game = new Phaser.Game(config);
