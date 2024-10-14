// Array con los objetos de los jugadores (Jugador 1)
const jugador1 = [
  {
    nombre: "Pikachu",
    tipo: "Electrico",
    fuerza: 30,
    vida: 100,
    img: "./img/pikachu.jpeg",
  },
  {
    nombre: "Bulbasaur",
    tipo: "Planta",
    fuerza: 25,
    vida: 110,
    img: "./img/bulbasaur.jpeg",
  },
  {
    nombre: "Charizard",
    tipo: ["Fuego", "Volador"],
    fuerza: 23,
    vida: 120,
    img: "./img/charizard.jpeg",
  },
];

// Array con los objetos de los jugadores (Jugador 2)
const jugador2 = [
  {
    nombre: "Squirtle",
    tipo: "Agua",
    fuerza: 28,
    vida: 105,
    img: "./img/squirtle.jpeg",
  },
  {
    nombre: "Charmander",
    tipo: "Fuego",
    fuerza: 24,
    vida: 115,
    img: "./img/charmander.jpeg",
  },
  {
    nombre: "Jigglypuff",
    tipo: "Normal",
    fuerza: 26,
    vida: 125,
    img: "./img/jigglypuff.jpeg",
  },
];

const copiaJ1 = jugador1.map((e) => ({ ...e, vidaActual: e.vida }));
const copiaJ2 = jugador2.map((e) => ({ ...e, vidaActual: e.vida }));

// Función para cargar las imágenes y las vidas de los Pokémon en el HTML
function cargarPartida() {
  // Jugador 1
  document.getElementById("img1-1").src = jugador1[0].img;
  document.getElementById(
    "vida1-1"
  ).textContent = `${copiaJ1[0].vidaActual}/${jugador1[0].vida}`;

  document.getElementById("img1-2").src = jugador1[1].img;
  document.getElementById(
    "vida1-2"
  ).textContent = `${copiaJ1[1].vidaActual}/${jugador1[1].vida}`;

  document.getElementById("img1-3").src = jugador1[2].img;
  document.getElementById(
    "vida1-3"
  ).textContent = `${copiaJ1[2].vidaActual}/${jugador1[2].vida}`;

  // Jugador 2
  document.getElementById("img2-1").src = jugador2[0].img;
  document.getElementById(
    "vida2-1"
  ).textContent = `${copiaJ2[0].vidaActual}/${jugador2[0].vida}`;

  document.getElementById("img2-2").src = jugador2[1].img;
  document.getElementById(
    "vida2-2"
  ).textContent = `${copiaJ2[1].vidaActual}/${jugador2[1].vida}`;

  document.getElementById("img2-3").src = jugador2[2].img;
  document.getElementById(
    "vida2-3"
  ).textContent = `${copiaJ2[2].vidaActual}/${jugador2[2].vida}`;

  document.getElementById("imgGrande1").src = jugador1[0].img;

  document.getElementById("imgGrande2").src = jugador2[0].img;
}

// Función para cambiar la imagen grande del jugador 1
function seleccionarPokemonJugador1(index) {
  document.getElementById("imgGrande1").src = jugador1[index].img;
}

// Función para cambiar la imagen grande del jugador 2
function seleccionarPokemonJugador2(index) {
  document.getElementById("imgGrande2").src = jugador2[index].img;
}

function lucha(pokemon1, pokemon2) {
  let vida1 = pokemon1.vida;
  let vida2 = pokemon2.vida;
  let daño = Math.ceil(Math.random() * pokemon1.fuerza);
  while (true) {
    daño = Math.ceil(Math.random() * pokemon2.fuerza);
    vida2 -= daño;
    console.log(
      `Ataca ${pokemon1.nombre} con daño ${daño} y deja a ${pokemon2.nombre} con ${vida2} de vida`
    );
    if (vida2 <= 0) return pokemon1.nombre;

    daño = Math.ceil(Math.random() * pokemon2.fuerza);
    vida1 -= daño;
    console.log(
      `Ataca ${pokemon2.nombre} con daño ${daño} y deja a ${pokemon1.nombre} con ${vida1} de vida`
    );
    if (vida1 <= 0) return pokemon2.nombre;
  }
}

cargarPartida();
// Asignar la función cargarPokemones al botón "Recargar"
document.getElementById("recargar").addEventListener("click", cargarPartida);

// Asignar la función lucha al botón "Luchar"
document.getElementById("luchar").addEventListener("click", lucha);

// Asignar eventos de click a las imágenes de los Pokémon de ambos jugadores
document.getElementById("img1-1").addEventListener("click", function () {
  seleccionarPokemonJugador1(0);
});
document.getElementById("img1-2").addEventListener("click", function () {
  seleccionarPokemonJugador1(1);
});
document.getElementById("img1-3").addEventListener("click", function () {
  seleccionarPokemonJugador1(2);
});

document.getElementById("img2-1").addEventListener("click", function () {
  seleccionarPokemonJugador2(0);
});
document.getElementById("img2-2").addEventListener("click", function () {
  seleccionarPokemonJugador2(1);
});
document.getElementById("img2-3").addEventListener("click", function () {
  seleccionarPokemonJugador2(2);
});
