var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext('2d');

class Snake {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;

        this.tail = [{x: this.x, y: this.y}]
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        var newRect;
        if(this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y,
            }
        } else if(this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y,
            }
        } else if(this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size,
            }
        } else if(this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size,
            }
        }   

        this.tail.shift();
        this.tail.push(newRect);
    }
};


class Apple{
    constructor() {
        var isTouching;
        while(true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;

            for(var i = 0; i < snake.tail.length; i++){
                if(this.x == snake.tail[i].x && this.y == this.tail[i].y){
                    isTouching = true;
                }
            }

            this.color = "red";
            this.size = snake.size;

            if(!isTouching){
                break;
            }
        }
    }
};

var snake = new Snake(20, 20, 20);
var fruit = new Apple();

window.onload = () => {
    gameLoop();
}


function gameLoop() {
    setInterval(show, 1000/15) //means 15 fps.
}


function show() {
    update();
    draw();
}


const keys = {
    a:{
        pressed: false,
    },
    d:{
        pressed: false,
    },
    w:{
        pressed: false,
    },
    s:{
        pressed: false,
    },
}


function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    eatApple();
}


function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == fruit.x 
    && snake.tail[snake.tail.length - 1].y == fruit.y) {
        snake.tail[snake.tail.length] = {x: fruit.x, y: fruit.y};
        fruit = new Apple();
       }
}


function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height, "black");

    for(var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
        snake.size - 5, snake.size - 5, "white"); 
    }

    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("SCORE: " + (snake.tail.length - 1),
    (canvas.width - 120), 18);
    createRect(fruit.x, fruit.y, fruit.size, fruit.size, fruit.color);
}


function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color; // = canvasContext.fillstyle = "black";
    canvasContext.fillRect(x, y, width, height);
}


window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if(event.key == "a" && snake.rotateX != 1) {
            keys.a.pressed = true;
            snake.rotateX = -1;
            snake.rotateY = 0;
        } else if(event.key == "w" && snake.rotateY != 1) {
            keys.s.pressed = true;
            snake.rotateX = 0;
            snake.rotateY = -1;
        } else if(event.key == "d" && snake.rotateX != -1) {
            keys.d.pressed = true;
            snake.rotateX = 1;
            snake.rotateY = 0;
        } else if(event.key == "s" && snake.rotateY != -1) {
            keys.w.pressed = true;
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1)
});