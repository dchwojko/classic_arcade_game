// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
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
const allEnemies = [new Enemy(-101,41.5,500), new Enemy(-101,124.5, 100), new Enemy(-101,207.5,100)]
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
