const palabraActualContenedor = document.querySelector("#letras");
const botonIniciar = document.querySelector("#iniciar");
const juegoContenedor = document.querySelector(".juego");
const cartel = document.querySelector(".cartel");
const letrasUsadasContenedor = document.querySelector("#letras-usadas");
const controles = document.querySelector(".controles");
const areaNuevasPalabras = document.querySelector("#nuevas-palabras");
const inputMobile = document.querySelector("#mobile-input");

var letrasValidas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function obtenerNuevaPalabra() {
    let todasLasPalabras = [...JSON.parse(localStorage.getItem("palabras-usuario")||"[]"), ...bancoDePalabras];
    let longitud = todasLasPalabras.length;
    let palabraAleatoria = todasLasPalabras[Math.floor(Math.random() * longitud)].toUpperCase();
    return palabraAleatoria;
}


inputMobile.addEventListener("input", ()=> {
    setTimeout(()=> {
        inputMobile.value = "";
    }, 170);
})


function mostrarCartel(titulo="", mensaje="", cb=(()=>window.location.assign(""))){
    cartel.querySelector("#titulo").textContent = titulo;
    cartel.querySelector("#mensaje").textContent = mensaje;
    cartel.querySelector(".btn").onclick = cb;
    cartel.style.display = "flex";
}

async function Juego() {
    dibujoInicial();
    let gameState = "playing";
    var palabra = await obtenerNuevaPalabra();
    var letras = palabra.split("");
    var letrasAdivinadas = [];
    var letrasUsadas = [];
    var palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)?` ${letra} `:" _ ").join("");
    palabraActualContenedor.textContent = palabraActual;
    var isMobile = window.matchMedia("(max-width: 600px)").matches


    function probarLetra(e) {
        if (gameState !== "playing") return;

        let tecla = "";
        if (isMobile) {
            tecla = e.data?.toUpperCase();
        }else {
            tecla = e.key.toUpperCase();
        }
        if (!letrasValidas.includes(tecla)) {
            mostrarCartel("", `La letra ${tecla} no es válida`, ()=>{
                cartel.style.display = "none"
            })
            return;
        }
        if (letrasUsadas.includes(tecla)){
            mostrarCartel("", `Ya usaste la letra ${tecla}`, ()=>{
                cartel.style.display = "none"
            })
            return;
        }else {
            letrasUsadas.push(tecla);
        }
        letrasUsadasContenedor.textContent = letrasUsadas.join(" ");

        if (letras.includes(tecla)) {
            letrasAdivinadas.push(tecla);
            var palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)?` ${letra} `:" _ ").join("");
            palabraActualContenedor.textContent = palabraActual;
        }else {
            if (dibujar.length > 1) {
                dibujar.shift()();
            }else if(dibujar.length === 1) {
                dibujar.shift()();
                mostrarCartel("Perdiste", `La palabra era ${palabra}`);
                gameState = "over";
            }
            else {
                mostrarCartel("Perdiste", `La palabra era ${palabra}`);
                gameState = "over";
            }
        }
        if(palabraActual?.replaceAll(" ","") === palabra) {
            mostrarCartel("¡Ganaste!", `La palabra es ${palabra}`);
            gameState = "won";
        }
    }

    if (isMobile) {
        document.addEventListener("input", probarLetra);
    }else {
        document.addEventListener("keydown", probarLetra);
    }
}


botonIniciar.onclick = function () {
    // INICIAR JUEGO
    Juego();

    // ESCONDER INPUTS Y PONER EL JUEGO
    juegoContenedor.style.display = "flex";
    controles.style.display = "none";

    // AGREGAR PALABRAS DEL USUARIO
    var nuevasPalabras = areaNuevasPalabras.value.toUpperCase().replaceAll(" ","").split(",");
    if ((nuevasPalabras.length > 0) && (nuevasPalabras[0] !== "")) {


        let palabrasUsuario =  JSON.parse(localStorage.getItem("palabras-usuario")||"[]");
        let interseccion = [
            ...bancoDePalabras.filter(pl=>nuevasPalabras.includes(pl.toUpperCase())),
            ...palabrasUsuario.filter(pl=>nuevasPalabras.includes(pl.toUpperCase()))
        ];
        let sinRepeticiones = nuevasPalabras.filter(pl=>!interseccion.includes(pl));
        if (sinRepeticiones.length > 0) localStorage.setItem("palabras-usuario", JSON.stringify(palabrasUsuario.concat(sinRepeticiones)))

    }
}   