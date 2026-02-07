const sectionAtaque = document.getElementById("SeleccionarAtaque")
const sectionReiniciar = document.getElementById("ReiniciarJuego")
const botonMascota = document.getElementById("boton-seleccionar")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionMascota = document.getElementById("SeleccionarMascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

let spanVictoriasJugador = document.getElementById("victorias-jugador")
let spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const sectionCanvasJuego = document.getElementById("canvas-juego")
const mapaJuego = document.getElementById("mapa-juego")
const flechasDispositivo = document.getElementById("flechas")

let ataqueJugador
let ataqueEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
let personajes = []
let botones = []
let opcionDePersonajes
let mascota1
let mascota2
let mascota3
let guardarMascota
let opcionDeAtaques
let botonFuego
let botonAgua
let botonTierra
let ataqueDinamicoJugador = []
let ataquesPersonajeEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapaJuego.getContext("2d")
let intervalo
let fondoBatalla = new Image()
fondoBatalla.src = "./assets/fondo-batalla.png"
let miPersonaje 

class Personaje {
    constructor(nombre, foto, vidas, fotoCara, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.fotoCara = fotoCara
        this.vidas = vidas
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 50
        this.alto = 50
        this.mascotaFoto = new Image()
        this.mascotaFoto.src = foto
        this.fotoCara = new Image()
        this.fotoCara.src = fotoCara
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMascota() {
        lienzo.drawImage(
        this.fotoCara,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

let aquanut = new Personaje("Aquanut", "./assets/aquanut-juego.png", 3, "./assets/aquanut-cara.png")

let drakon = new Personaje("Drakon", "./assets/drakon-personaje.png", 3, "./assets/drakon-cara.png")

let selvatron = new Personaje("Selvatron", "./assets/Selvatron-personaje.png", 3, "./assets/selvatron-cara.png")

let aquanutEnemigo = new Personaje("Aquanut", "./assets/aquanut-juego.png", 3, "./assets/aquanut-cara.png", 100, 100)

let drakonEnemigo = new Personaje("Drakon", "./assets/drakon-personaje.png", 3, "./assets/drakon-cara.png", 200, 200)

let selvatronEnemigo = new Personaje("Selvatron", "./assets/Selvatron-personaje.png", 3, "./assets/selvatron-cara.png", 300, 300)

aquanut.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
)
drakon.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
)

selvatron.ataques.push(
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
)

personajes.push(aquanut, drakon, selvatron)

function iniciarJuego() {
    sectionMascota.style.display = "flex"
    sectionAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    sectionCanvasJuego.style.display = "none"

    if (detectarDispositivo()) {
    flechasDispositivo.style.display = "flex"
    } else {
    flechasDispositivo.style.display = "none"
    }

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" id=${personaje.nombre} name="mascota">
        <label class="tarjeta-de-elemental" for=${personaje.nombre}>
            <p>${personaje.nombre}</p>
            <img src=${personaje.foto} alt="Error al cargar!">
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDePersonajes

        mascota1 = document.getElementById("Aquanut")
        mascota2 = document.getElementById("Drakon")
        mascota3 = document.getElementById("Selvatron")
    })

    botonMascota.addEventListener("click", seleccionarMascota)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascota() {
    sectionMascota.style.display = "none"
    sectionAtaque.style.display = "none"

    if(mascota1.checked) {
        sectionCanvasJuego.style.display = "flex"
        spanMascotaJugador.innerHTML = mascota1.id
        guardarMascota = mascota1.id
    } else if (mascota2.checked) {
        sectionCanvasJuego.style.display = "flex"
        spanMascotaJugador.innerHTML = mascota2.id
        guardarMascota = mascota2.id
    } else if (mascota3.checked) {
        sectionCanvasJuego.style.display = "flex"
        spanMascotaJugador.innerHTML = mascota3.id
        guardarMascota = mascota3.id
    } else {
        alert("Selecciona una mascota, porfavor")
        sectionMascota.style.display = "flex"
        sectionAtaque.style.display = "none"
        sectionCanvasJuego.style.display = "none"
    }

    extraerAtaques(guardarMascota)
    iniciarMapa()
}

function iniciarMapa() {
    mapaJuego.width = 500
    mapaJuego.height = 500
    miPersonaje = obtenerObjetoMascota(guardarMascota)
    intervalo = setInterval(pintarMascotaYJuego, 100)
    window.addEventListener("keydown", teclas)
    window.addEventListener("keyup", detenerMovimiento)
}

//funcion para extraer los ataques unicos de los personajes renderizados, AtaquesDPP = AtaquesDinamicosPorPersonaje
function extraerAtaques(guardarMascota) {
    for (let i = 0; i < personajes.length; i++) {
        let ataquesDPP = []
        if (guardarMascota === personajes[i].nombre) {
            ataquesDPP = personajes[i].ataques
            mostrarAtaques(ataquesDPP)
            break
        }
    }
}

function mostrarAtaques(ataquesDPP) {
    ataquesDPP.forEach((ataque) => {
        opcionDeAtaques = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += opcionDeAtaques

        botonFuego = document.getElementById("boton-fuego")
        botonAgua= document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botones = document.querySelectorAll(".BAtaque")
    })
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueDinamicoJugador.push("FUEGO")
                indexAtaqueJugador = ("FUEGO🔥")
                console.log(ataqueDinamicoJugador)
                boton.style.background = "orange"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueDinamicoJugador.push("AGUA")
                indexAtaqueJugador = ("AGUA💧")
                console.log(ataqueDinamicoJugador)
                boton.style.background = "orange"
                boton.disabled = true
            } else {
                ataqueDinamicoJugador.push("TIERRA")
                indexAtaqueJugador = ("TIERRA🌱")
                console.log(ataqueDinamicoJugador)
                boton.style.background = "orange"
                boton.disabled = true
            }
            iniciarPelea()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesPersonajeEnemigo = enemigo.ataques

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length - 1)
    let ataque = ataquesPersonajeEnemigo[ataqueAleatorio].nombre

    if (ataque === "🔥") {
        ataqueEnemigo.push("FUEGO")
        indexAtaqueEnemigo = "FUEGO🔥"
        console.log(ataqueEnemigo)
    } else if (ataque === "💧") {
        ataqueEnemigo.push("AGUA")
        indexAtaqueEnemigo = "AGUA💧"
        console.log(ataqueEnemigo)
    } else {
        ataqueEnemigo.push("TIERRA")
        indexAtaqueEnemigo = "TIERRA🌱"
        console.log(ataqueEnemigo)
    }

}

function iniciarPelea() {
    if(ataqueDinamicoJugador.length == 5) {
        combate()
    }
}

function indexAmbosJugadores(jugador, enemigo) {
    indexAtaqueJugador = ataqueDinamicoJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueDinamicoJugador.length; index++) {
        if(ataqueDinamicoJugador[index] === ataqueEnemigo[index]) {
            indexAmbosJugadores(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueDinamicoJugador[index] === "FUEGO" && ataqueEnemigo[index] == "TIERRA") {
            indexAmbosJugadores(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueDinamicoJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosJugadores(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueDinamicoJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosJugadores(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosJugadores(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        mensajeFinal("Mmmm mismas victorias? supongo que fue un empate...") 
    } else if (vidasJugador > victoriasEnemigo) {
        mensajeFinal("Tuviste mas victorias que el enemigo, ganaste😀")
    } else {
        mensajeFinal("El rival te ganó😭 puedes vencerlo en la siguiente?")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function mensajeFinal(resultadoFinal) {

    let nuevoMensajeBatalla = document.createElement("p")

    sectionMensajes.innerHTML = resultadoFinal

    sectionMensajes.appendChild(nuevoMensajeBatalla)

    sectionReiniciar.style.display = "flex"
}

function reiniciarJuego() {
    location.reload()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarMascotaYJuego() {
    miPersonaje.x = miPersonaje.x + miPersonaje.velocidadX
    miPersonaje.y = miPersonaje.y + miPersonaje.velocidadY
    lienzo.clearRect(0,0, mapaJuego.width, mapaJuego.height)
    lienzo.drawImage(
        fondoBatalla,
        0,
        0,
        mapaJuego.width,
        mapaJuego.height,
    )
    miPersonaje.pintarMascota()
    aquanutEnemigo.pintarMascota()
    drakonEnemigo.pintarMascota()
    selvatronEnemigo.pintarMascota()
    if(miPersonaje.velocidadX !== 0 || miPersonaje.velocidadY !== 0) {
        colisiones(aquanutEnemigo)
        colisiones(drakonEnemigo)
        colisiones(selvatronEnemigo)
    }
}

function detenerMovimiento() {
    miPersonaje.velocidadX = 0
    miPersonaje.velocidadY = 0
}

function teclas(event) {
    switch (event.key) {
        case "ArrowUp":
        case "W":
        case "w":
            moverArriba()
            break
        case "ArrowLeft":
        case "A":
        case "a":
            moverIzquierda()
            break
        case "ArrowDown":
        case "S":
        case "s":
            moverAbajo()
            break
        case "ArrowRight":
        case "D":
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}

function moverArriba() {
    miPersonaje.velocidadY = -5
}

function moverAbajo() {
    miPersonaje.velocidadY = 5
}

function moverIzquierda() {
    miPersonaje.velocidadX = -5
}

function moverDerecha() {
    miPersonaje.velocidadX = 5
}

function detectarDispositivo() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
}

function obtenerObjetoMascota() {
    for (let i = 0; i < personajes.length; i++) {
        if (guardarMascota === personajes[i].nombre) {
            return personajes[i]
        }
    }
}

function colisiones(enemigo) {
    const arribaMascota = miPersonaje.y
    const abajoMascota = miPersonaje.y + miPersonaje.alto
    const derechaMascota = miPersonaje.x + miPersonaje.ancho
    const izquierdaMascota = miPersonaje.x

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    seleccionarMascotaEnemigo(enemigo)
    sectionAtaque.style.display = "flex"
    sectionCanvasJuego.style.display = "none"
}

window.addEventListener("load", iniciarJuego)