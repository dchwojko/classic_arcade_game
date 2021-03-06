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

        if (this.x > 1010) {
            this.x = -101;

            // min-max speed for enemy bugs = 100-500
            this.speed = 100 + 40 * Math.floor(Math.random() * 11);
        }

        // check for enemy-player collision
        if (player.y == this.y && player.x < this.x + 50 && player.x > this.x - 50) {
            player.lives--;
            player.updateLives(player.lives);
            player.init();
            if (player.lives == 0) {
                alert("Sorry, you lost!");
                player.init();
                player.lives = 3;
                player.updateLives(player.lives);
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Player {
    constructor() {
        this.init()
        this.currentSprite = 0;
        this.sprites = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
        this.sprite = this.sprites[this.currentSprite];
        this.lives = 3;
        this.updateLives(this.lives);
    }

    // default player position
    init() {
        this.x = 454.5;
        this.y = 871.5;
    }

    // update the number of lives (hearts) displayed in the game
    updateLives(n) {
        const hearts = document.querySelector('.hearts');
        var html = "";
        for (let i = 0; i<n; i++) {
            html += `<img src="images/Heart.png" alt="heart" />`;
        }
        hearts.innerHTML = html;
    }

    // player position checks to prevent user from moving off of the board; checks for winning condition
    update() {
        if (this.y < 0) {
            alert("WINNER!")
            this.init();
            this.lives = 3;
            this.updateLives(this.lives);
        }
        if (this.y < -41.5) {
            this.y = -41.5;
        }
        if (this.y > 871.5) {
            this.y = 871.5;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > 909) {
            this.x = 909;
        }
    }

    // render the player sprite
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handle key codes (arrows, p => player select, r => reset game)
    handleInput(keyCode) {
        const xDelta = 50.5;
        const yDelta = 41.5;

        switch(keyCode) {
            case 'left':
                this.x -= xDelta;
                break;
            case 'up':
                this.y -= yDelta;
                break;
            case 'right':
                this.x += xDelta;
                break;
            case 'down':
                this.y += yDelta;
                break;
            // change player sprite
            case 'p':
                this.currentSprite++;
                if (this.currentSprite == this.sprites.length) {
                    this.currentSprite = 0;
                }
                this.sprite = this.sprites[this.currentSprite];
                break;
            // Reset player position and lives
            case 'r':
                player.init();
                player.lives = 3;
                player.updateLives(3);
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
    new Enemy(-101,290.5),
    new Enemy(-101,373.5),
    new Enemy(-101,456.5),
    new Enemy(-101,539.5),
    new Enemy(-101,622.5),
    new Enemy(-101,705.5),
    new Enemy(-101,788.5)
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
        80: 'p',
        82: 'r'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
