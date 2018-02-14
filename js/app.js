var screensize = 500;
var initialstate = true;
var highscore = 0;
var allenemies_bug = [50, 173, 326, 290];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var anyrow = randomPick(0, allenemies_bug.length - 1);
    this.row = anyrow + 1;
    this.x = randomPick(-50, -500);
    this.y = allenemies_bug[anyrow];
    this.speed = randomPick(100, 300);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > screensize) {
        this.x = -100;
        this.speed = randomPick(100, 300);
        var anyrow = randomPick(0, allenemies_bug.length - 1);
        this.row = anyrow + 1;
        this.y = allenemies_bug[anyrow];
    }

    // It will Check for collision between player and enemies and reset the player
    if (this.row == player.row) {
        if (this.x + 70 >= player.x && this.x <= player.x + 70) {
            player.life -= 1;
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function randomPick(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.row = 5;
    this.score = 0;
    initialstate = true;
    this.x = 202;
    this.y = 405;
    this.life = 3;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // If you ran out of lives, then the game will stop.
    if (this.life === 0) {
        initialstate = false;
    }
    // If you reset the score will be reset to 0.
    if (this.y <= 60) {
        this.score += 1;
        this.reset();
    }
};

// this will give key inputs for moving player and reset buttons.
Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y >= 60 && initialstate) {
        this.y = this.y - 83;
        this.row += -1;
    }
    if (key == 'down' && this.y <= 399 && initialstate) {
        this.y = this.y + 83;
        this.row += 1;
    }
    if (key == 'left' && this.x >= 1 && initialstate) {
        this.x = this.x - 101;
    }
    if (key == 'right' && this.x <= 402 && initialstate) {
        this.x = this.x + 101;
    }
    if (key == 'reset') {
        this.newGame();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText('Score: ' + this.score, 410, 550);
    ctx.fillText('High Score: ' + highscore, 20, 90);
    ctx.font = '24px Times New Roman';
    ctx.fillStyle = 'black';
    if(this.score > highscore){
        highscore += 1;
    }
    if (this.life === 0) {
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', 200, 300);
    }
};

Player.prototype.newGame = function() {
    player = new Player();
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
    this.row = 5;
};

var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// This listens key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'reset'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
