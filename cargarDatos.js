import { supabase } from "./conexion.js";

// Función para cargar los Pokémon
export async function cargarPokemons() {
  const { data: pokemons } = await supabase.from("pokemons").select("*").in("usuario", [1, 2]);

  pokemons.forEach(pokemon => {
    pokemon.vidaTotal = pokemon.vida;
  });

  const fetchPokemonsJ1 = pokemons.filter((pokemon) => pokemon.usuario === 1);
  const fetchPokemonsJ2 = pokemons.filter((pokemon) => pokemon.usuario === 2);

  mostrarPokemons(fetchPokemonsJ1, fetchPokemonsJ2);

  return { fetchPokemonsJ1, fetchPokemonsJ2 };
}

// Función para mostrar los Pokémon
function mostrarPokemons(pokemonsJ1, pokemonsJ2) {
  pokemonsJ1.forEach((pokemon, index) => {
    document.getElementById(`pokemon1-${index}`).querySelector("img").src =
      pokemon.avatar;
  });

  pokemonsJ2.forEach((pokemon, index) => {
    document.getElementById(`pokemon2-${index}`).querySelector("img").src =
      pokemon.avatar;
  });
}
