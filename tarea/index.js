const cuadros = document.querySelectorAll(".rojo, .amarillo, .azul, .verde");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const turnoText = document.getElementById("turno");

let secuenciaComputadora = [];
let secuenciaJugador = [];
let round = 0;
let jugando = false;

startBtn.addEventListener("click", empezarJuego);
resetBtn.addEventListener("click", empezarJuego);

function empezarJuego() {
    startBtn.classList.add("block");
    resetBtn.classList.add("hidden");
    desactivarCuadros();
    turnoText.innerText = "Turno: Simón";

    secuenciaComputadora = [];
    secuenciaJugador = [];
    round = 0;
    jugando = true;

    turnoComputadora();
}

function desactivarCuadros() {
    cuadros.forEach(function(cuadro) {
        cuadro.classList.add("block");
    });
}

function activarCuadros() {
    cuadros.forEach(function(cuadro) {
        cuadro.classList.remove("block");
    });
}

function turnoComputadora() {
    const colores = ['rojo', 'amarillo', 'azul', 'verde'];

    const indiceAleatorio = numeroAleatorio(0, 3);
    const colorAleatorio = colores[indiceAleatorio];

    secuenciaComputadora.push(colorAleatorio);
    console.log(secuenciaComputadora);

    mostrarSecuencia();
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mostrarSecuencia() {
    desactivarCuadros(); 
    var i = 0; 
    function mostrarSiguienteColor() {
        if (i < secuenciaComputadora.length) {
            var color = secuenciaComputadora[i];
            iluminarCuadro(color);
            i++;
            setTimeout(mostrarSiguienteColor, 1000); 
        } else {
            activarCuadros(); 
            turnoText.innerText = "Turno: Jugador";
            secuenciaJugador = [];
        }
    }
    mostrarSiguienteColor();
}

function iluminarCuadro(color) {
    var cuadro = document.querySelector(`.${color}`);
    if (cuadro) {
        cuadro.classList.add("active");
        setTimeout(function() {
            cuadro.classList.remove("active");
        }, 500); 
    }
}

function manejarClickCuadro(event) {
    if (turnoText.innerText === "Turno: Jugador" && jugando) {
        var color = event.target.classList[1];
        secuenciaJugador.push(color);
        iluminarCuadro(color);

        verificarSecuencia();
    }
}

function verificarSecuencia() {
    for (var i = 0; i < secuenciaJugador.length; i++) {
        if (secuenciaJugador[i] !== secuenciaComputadora[i]) {
            turnoText.innerText = "Game Over";
            desactivarCuadros();
            jugando = false;
            resetBtn.classList.remove("hidden"); 
            return;
        }
    }

    if (secuenciaJugador.length === secuenciaComputadora.length) {
        turnoJugador();
    }
}

function turnoJugador() {
    round++;
    turnoText.innerText = `Turno: Simón - Ronda ${round}`;
    desactivarCuadros();
    setTimeout(turnoComputadora, 1000); 
}

cuadros.forEach(function(cuadro) {
    cuadro.addEventListener("click", manejarClickCuadro);
});
