const canvas = document.querySelector("#ahorcado");
const pincel = canvas.getContext("2d");
pincel.fillStyle ="white";
pincel.fillRect(1,0,1200,800);
pincel.lineWidth = 1.5;
pincel.fillStyle ="black";

function dibujoInicial() {
    pincel.beginPath();
    pincel.moveTo(100,700);
    pincel.lineTo(150,650);
    pincel.lineTo(200,700);
    pincel.fill();
}

function linea1() {
    pincel.fillRect(149,151,2,500);
}    
function linea2() {
    pincel.fillRect(151,151,200,2);
}
function linea3() {
    pincel.fillRect(351,151,2,75);
}
function linea4(){
    pincel.beginPath();
    pincel.arc(351,255,30,0,2*3.14);
    pincel.stroke();
}
function linea5(){
    pincel.fillRect(351,285,2,120);
}
function linea6() {
    pincel.moveTo(352,305);
    pincel.lineTo(400,350);
    pincel.stroke();

}
function linea7() {
    pincel.moveTo(352,305);
    pincel.lineTo(300,350);
    pincel.stroke();

}
function linea8() {
    pincel.moveTo(352,405);
    pincel.lineTo(400,500);
    pincel.stroke();
}
function linea9() {
    pincel.moveTo(352,405);
    pincel.lineTo(300,500);
    pincel.stroke();
}

const dibujar = [
    linea1,
    linea2,
    linea3,
    linea4,
    linea5,
    linea6,
    linea7,
    linea8,
    linea9,
]