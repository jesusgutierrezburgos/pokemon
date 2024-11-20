import { cargarPokemons } from "./cargarDatos.js";

let jugador1Seleccionado = false;
let jugador2Seleccionado = false;
let turno = 1;
let pokemonsJ1 = [];
let pokemonsJ2 = [];

async function cargarPartida() {
  // Cargamos los Pokémon
  const { fetchPokemonsJ1, fetchPokemonsJ2 } = await cargarPokemons();

  // Actualizamos las variables globales
  pokemonsJ1 = fetchPokemonsJ1;
  pokemonsJ2 = fetchPokemonsJ2;

  // Recorremos los botones de las imagenes de los Pokémon y les asignamos un event listener
  for (let i = 0; i < 3; i++) {
    document.getElementById(`pokemon1-${i}`).addEventListener("click",() => seleccionarPokemon(pokemonsJ1[i], 1, i));
    document.getElementById(`pokemon2-${i}`).addEventListener("click",() => seleccionarPokemon(pokemonsJ2[i], 2, i));
  }
  document.getElementById("mensaje-combate").innerHTML = 'SELECCIONA TU POKEMON!';
}

// Función para seleccionar un Pokémon, dependiendo del jugador
function seleccionarPokemon(pokemon, jugador, indice) {
  document.getElementById(`seleccionado-${jugador}`).querySelector("img").src = pokemon.avatar;
  document.getElementById(`texto-vida${jugador}`).textContent = `${pokemon.vida}/${pokemon.vidaTotal}`;
  document.getElementById(`barra-vida-${jugador}`).style.width = `${pokemon.vida / pokemon.vidaTotal * 100}%`;

  pokemon.indice = indice;
  if (jugador === 1) {
    jugador1Seleccionado = pokemon;
  } else {
    jugador2Seleccionado = pokemon;
  }

  // Verificamos si ambos jugadores han seleccionado un Pokémon
  if (jugador1Seleccionado && jugador2Seleccionado) {
    document.getElementById(`atacar-${turno}`).disabled = false;
  }
}

function hayPokemonsConVida(jugador) {
  let pokemons = jugador === 1 ? pokemonsJ1 : pokemonsJ2;
  return pokemons.some(pokemon => pokemon.vida > 0);
}


function lanzarConfeti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 }
  });
}

function atacar(atacante, defensor, jugadorDefensor) {
  if (!atacante || !defensor) {
    return;
  }

  const mensajeCombate = document.getElementById("mensaje-combate");

  // Calcular daño
  const daño = Math.floor(Math.random() * atacante.fuerza);
  defensor.vida -= daño;

  // Asegurarnos de que la vida no sea menor a 0
  if (defensor.vida <= 0) {
    defensor.vida = 0;
    // Actualizar mensaje de combate
    mensajeCombate.innerHTML = `${atacante.nombre.toUpperCase()} ataca a ${defensor.nombre.toUpperCase()} y le resta ${daño} PS de vida.<br>${defensor.nombre.toUpperCase()} ha sido DEBILITADO!.<br>JUGADOR ${jugadorDefensor} debe elegir otro Pokémon!`;
    document.getElementById(`pokemon${jugadorDefensor}-${defensor.indice}`).disabled = true;
    jugadorDefensor === 1 ? (jugador1Seleccionado = false) : (jugador2Seleccionado = false);
    document.getElementById(`seleccionado-${jugadorDefensor}`).querySelector("img").src = "img/pokeball.png";
  } else {
    // Actualizar mensaje de combate
    mensajeCombate.innerHTML = `${atacante.nombre.toUpperCase()} ataca a ${defensor.nombre.toUpperCase()} y le resta ${daño} PS.<br>${defensor.nombre.toUpperCase()} tiene ${defensor.vida} PS restantes. <br>Es el turno de JUGADOR ${jugadorDefensor}.`;
    // Habilitar/Deshabilitar botones de ataque
    document.getElementById(`atacar-${jugadorDefensor}`).disabled = false;
  }

  // Actualizar barra de vida visualmente
  document.getElementById(`barra-vida-${jugadorDefensor}`).style.width = `${defensor.vida / defensor.vidaTotal * 100}%`;
  document.getElementById(`texto-vida${jugadorDefensor}`).textContent = `${defensor.vida}/${defensor.vidaTotal}`;
  document.getElementById(`atacar-${turno}`).disabled = true;

  if (!hayPokemonsConVida(jugadorDefensor)) {
    mensajeCombate.innerHTML = `JUGADOR ${jugadorDefensor } HA PERDIDO TODOS SUS POKÉMON!<br>JUGADOR ${turno} GANA EL COMBATE!`;
    lanzarConfeti();
  }

  // Cambiar turno
  turno = turno === 1 ? 2 : 1;
}

// Seleccionamos el botón con clase "iniciar" y añadimos un event listener
document.querySelector(".iniciar").addEventListener("click", cargarPartida);
document.getElementById(`atacar-1`).addEventListener("click", () => atacar(jugador1Seleccionado, jugador2Seleccionado, 2));
document.getElementById(`atacar-2`).addEventListener("click", () => atacar(jugador2Seleccionado, jugador1Seleccionado, 1));
document.querySelector(".reiniciar").addEventListener("click", () => {
  location.reload();
});