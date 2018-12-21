// Enemies our player must avoid
class Enemy {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed = 100 + 40 * Math.floor(Math.random() * 11);
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > 505) {
            this.x = -101;

            // min-max speed for enemy bugs = 100-500
            this.speed = 100 + 40 * Math.floor(Math.random() * 11);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Player {
    constructor() {
        this.x = 202;
        this.y = 373.5;
        this.currentSprite = 0;
        this.sprites = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
        this.sprite = this.sprites[this.currentSprite];
    }

    update() {
        if (this.y < 0) {
            console.log('WINNER!');
        }
        if (this.y < -41.5) {
            this.y = -41.5;
        }
        if (this.y > 373.5) {
            this.y = 373.5;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > 404) {
            this.x = 404;
        }
    }

    render() {
        console.log(`${this.x},${this.y}`)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        switch(keyCode) {
            case 'left':
                this.x -= 50.5;
                break;
            case 'up':
                this.y -= 83/2;
                break;
            case 'right':
                this.x += 50.5;
                break;
            case 'down':
                this.y += 83/2;
                break;
            case 'p':
                this.currentSprite++;
                if (this.currentSprite == this.sprites.length) {
                    this.currentSprite = 0;
                }
                this.sprite = this.sprites[this.currentSprite];
                break;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
    new Enemy(-101,41.5),
    new Enemy(-101,124.5),
    new Enemy(-101,207.5),
    new Enemy(-101,290.5)
]
const player = new Player()


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
