const musicaDeFundo = new Audio("music/slay3r.mp3")
const somGameOver = new Audio("music/tafodido.mp3")
const somMover = new Audio("music/vam.mp3")
const somComer = new Audio("music/leoleopika.mp4")


var direcao = {x: 0, y: 0}
var cobrinha = [
    {x: 5, y: 5, }
]
var fruta = {  
    x: Math.floor(Math.random() * 16) + 2, 
    y: Math.floor(Math.random() * 16) + 2, 
}
var pontos = 0;
var ultimaVezAtualizada = 0;
var VELOCIDADE = 5;

function principal (tempoAtual){
    window.requestAnimationFrame(principal);
    if((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / VELOCIDADE){
        return;
    }
    
    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function colisao(){
    for(var i = 1; i < cobrinha.length; i++){
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }

    var cabeca = cobrinha[0];
    if(cobrinha[0].x >= 18 || cobrinha[0].x < 0 || cobrinha[0].y >= 18 || cobrinha[0].y < 0){
        return true;
    }
}

function comeuAfruta(){
    if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
        somComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + " ポイント"
        fruta = {x: Math.floor(Math.random() * 16) + 2, y: Math.floor(Math.random() * 16) + 2}
        cobrinha.unshift(
            {x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y}
            )
       VELOCIDADE += 1;
    }
}
    

function atualizaGame(){
    musicaDeFundo.pause()

    var colidiu = colisao();
        if(colidiu == true){
            musicaDeFundo.pause();
            somGameOver.play();
            alert("GAME OVER VACILÃO")
            cobrinha = [{x: 5, y: 5}]
            direcao.x = 0;           
            direcao.y = 0; 
            pontos = 0; 
            musicaDeFundo.play()          
        }
   
        comeuAfruta();

for (var i = cobrinha.length - 2; i >= 0; i--){
      cobrinha[i + 1] = {...cobrinha[i]}

}
cobrinha[0].y += direcao.y;
cobrinha[0].x += direcao.x;

board.innerHTML = "";
for(var i = 0; i < cobrinha.length; i++){
    var cobrinhaParte = document.createElement('div');
    cobrinhaParte.style.gridRowStart = cobrinha[i].y
    cobrinhaParte.style.gridColumnStart = cobrinha[i].x

    if(i == 0){
        cobrinhaParte.classList.add("head");

    }else {
        cobrinhaParte.classList.add("snake");
    }

    board.appendChild(cobrinhaParte)
}

var frutinha = document.createElement("div");
frutinha.style.gridRowStart = fruta.y;
frutinha.style.gridColumnStart = fruta.x;
frutinha.classList.add("fruta");
board.appendChild(frutinha);


}

window.addEventListener('keydown', function (e){
  
   somMover.play()
   
   switch(e.code){
       case 'KeyW':
           direcao.x = 0;
           direcao.y = -1;
           break;
       case 'KeyS':
        direcao.y = 1;
        direcao.x = 0;
           break;
       case 'KeyA':
        direcao.x = -1;
        direcao.y = 0;
           break;
       case 'KeyD':
        direcao.x = 1;
        direcao.y = 0;
           break;
        
   }
})






principal();

