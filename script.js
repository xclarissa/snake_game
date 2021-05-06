
let canvas = document.getElementById('snake') //criar elemento que irá rodar o jogo
let context = canvas.getContext('2d') //retorna um contexto de desenho no canvas
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = { // posição 0 - cabeça
    x: 8 * box,
    y: 8 * box
}

let direction = "right"

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //math.floor retira o ponto flutuante do num , math.random num de 0 a 1 (num real)
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightpink"; // definindo cor (fillStyle - estilo do canvas)
    context.fillRect(0, 0, 16 * box, 16 * box)  //desenha o retângulo usando x e y e a largura e altura setadas (coordenadas)
}


function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// criando a comidinha 
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); // posição x, posição y, altura e largura
}

// controlando a cobrinha no teclado
document.addEventListener('keydown', update); //quando um evento acontece, detecta e chama uma função 

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    // cobrinha se chocando a partir do corpinho (posição 1) 

    for(i = 1 ; i < snake.length ; i++ ) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo); // parar 
            alert("GAME OVER! :(")
        } 
    }

    criarBG();
    criarCobrinha();
    drawFood();

 // POSIÇÃO
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;
 //direção que a cobrinha vai percorrer 
    if(direction == "right") snakeX += box // um quadradinho a mais 
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {  
    // se a posição de snakeX!=foodx/snakeY, vai retirar o ultimo elemento da cobrinha, caso não, a cobrinha aumenta
        snake.pop();  //retirar o ultimo elemento do array
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box; // aleatoriedade da comidinha
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }   
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //setInterval e clearInterval - manipulação de tempo 