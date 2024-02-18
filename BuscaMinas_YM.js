let filas;
let columnas;
let numMinas;
let tiempo = 0;
let tiempoInterval;
let juegoTerminado = false;

document.addEventListener('DOMContentLoaded', function() {
    const nivelSelect = document.getElementById('nivel');
    nivelSelect.addEventListener('change', cambiarNivel);
    
    const abrirTableroButton = document.createElement('button');
    abrirTableroButton.textContent = 'Abrir Tablero';
    abrirTableroButton.addEventListener('click', abrirTablero);
    
    const configuracionDiv = document.getElementById('configuracion');
    configuracionDiv.appendChild(abrirTableroButton);

    alert("Pequeños problemas : el botón que abre el tablero es el de arriba, el otro es funcionalidad pero no funciona si le damos \nNo he consegido hacer que funcione bien si le pongo las banderas")
    
    cambiarNivel(); // Inicializar el tablero con el nivel seleccionado por defecto
});

function cambiarNivel() {
    const nivelSelect = document.getElementById('nivel');
    const nivelSeleccionado = nivelSelect.value;
    if (nivelSeleccionado === 'facil') {
        filas = 10;
        columnas = 10;
        numMinas = Math.floor(filas * columnas * 0.2); // 20% de las casillas
    } else if (nivelSeleccionado === 'normal') {
        filas = 10;
        columnas = 15;
        numMinas = Math.floor(filas * columnas * 0.3); // 30% de las casillas
    } else if (nivelSeleccionado === 'dificil') {
        filas = 15;
        columnas = 20;
        numMinas = Math.floor(filas * columnas * 0.4); // 40% de las casillas
    }
}

function abrirTablero() {
    const paginaInicial = document.getElementById('pagina-inicial');
    paginaInicial.style.display = 'none'; // Ocultar la página inicial
    
    const tablero = document.getElementById('tablero');
    tablero.style.display = 'grid'; // muestra el tablero
    
    iniciarContadorTiempo(); // Inicia el contador de tiempo al abrir el tablero
    generarTableroJS();
}

function iniciarContadorTiempo() {
    tiempo = 0;
    const contadorTiempo = document.getElementById('contador-tiempo');
    contadorTiempo.textContent = `Tiempo: ${tiempo}`;
    
    clearInterval(tiempoInterval);
    tiempoInterval = setInterval(() => {
        tiempo++;
        contadorTiempo.textContent = `Tiempo: ${tiempo}`;
    }, 1000);
}

function mostrarMensajeGameOver() {
    clearInterval(tiempoInterval); // Detener el contador de tiempo cuando encuentra una bomba
    alert('Game Over. Has encontrado una bomba!');
}


function generarTableroJS() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = ''; 
    
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const casilla = document.createElement('button');
            casilla.setAttribute('id', `casilla-${i}-${j}`);
            casilla.classList.add('casilla');
            casilla.dataset.row = i;
            casilla.dataset.column = j;
            casilla.addEventListener('click', abrirCasilla);
            tablero.appendChild(casilla);
        }
    }
    colocarBombasTableroJS();
}

function colocarBombasTableroJS() {
    const casillasTotales = filas * columnas;
    const casillasConMinas = new Set();
    
    while (casillasConMinas.size < numMinas) {
        const randomIndex = Math.floor(Math.random() * casillasTotales);
        casillasConMinas.add(randomIndex);
    }
    
    const casillas = document.querySelectorAll('.casilla');
    casillasConMinas.forEach(index => {
        casillas[index].classList.add('mina');
    });
}

function abrirCasilla(event) {
    const casilla = event.target;
    const row = parseInt(casilla.dataset.row);
    const column = parseInt(casilla.dataset.column);
    
    // Lógica para determinar si la casilla contiene una mina o un número
    if (casilla.classList.contains('mina')) {
        // Mostrar todas las bombas
        mostrarBombas();
        // Mostrar mensaje de Game Over
        mostrarMensajeGameOver();
        juegoTerminado = true;
    } else {
        const numMinasAlrededor = contarMinasAlrededor(row, column);
        if (numMinasAlrededor === 0) {
            abrirCasillasVacias(row, column);
        } else {
            casilla.textContent = numMinasAlrededor;
        }
        casilla.disabled = true; 

        
}

function abrirCasillasVacias(row, column) {
    const casillasAbiertas = new Set(); // Conjunto para almacenar las casillas ya abiertas
    
    function abrirCasillaRecursiva(row, column) {
        const casilla = document.getElementById(`casilla-${row}-${column}`);
        if (!casilla || casillasAbiertas.has(`${row}-${column}`)) return;
        
        const numMinasAlrededor = contarMinasAlrededor(row, column);
        if (numMinasAlrededor !== 0) {
            casilla.textContent = numMinasAlrededor;
            casilla.disabled = true; // Deshabilitar el botón después de abrir una casilla sin bomba
            casillasAbiertas.add(`${row}-${column}`);
            return;
        }
        
        casilla.textContent = ''; // Mostrar una casilla vacía
        casilla.disabled = true; // Deshabilitar el botón después de abrir una casilla sin bomba
        casillasAbiertas.add(`${row}-${column}`);
        
        // Abrir las casillas adyacentes recursivamente
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                abrirCasillaRecursiva(i, j);
            }
        }
    }
    
    abrirCasillaRecursiva(row, column);
}

function contarMinasAlrededor(row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = column - 1; j <= column + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < columnas) {
                const casilla = document.getElementById(`casilla-${i}-${j}`);
                if (casilla && casilla.classList.contains('mina')) {
                    count++;
                }
            }
        }
    }
    return count;
}


function mostrarBombas() {
    const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
        if (casilla.classList.contains('mina')) {
            casilla.textContent = '💣'; 
        }
    });
}

function mostrarMensajeGameOver() {
    clearInterval(tiempoInterval);
    alert('Game Over. Intentalo de nuevo!');
}

function contarMinasAlrededor(row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = column - 1; j <= column + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < columnas) {
                const casilla = document.getElementById(`casilla-${i}-${j}`);
                if (casilla && casilla.classList.contains('mina')) {
                    count++;
                }
            }
        }
    }
    return count;
}
}
