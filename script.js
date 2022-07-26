const pokemonName = document.querySelector(".pokemon-name");
const pokemonId = document.querySelector(".pokemon-id");
const pokemonImage = document.querySelector(".pokemon-image");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonPokedex = document.querySelector(".pokedex-button");
const buttonRandom = document.querySelector(".btn-random");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (apiResponse.status == 200) {
    const data = await apiResponse.json();

    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Searching...";
  pokemonId.innerHTML = "";
  pokemonImage.src = "./img/question-mark.png";

  const data = await fetchPokemon(pokemon);

  if (data) {
    buttonPokedex.style.display = "block";
    pokemonName.innerHTML = data.species.name;
    pokemonId.innerHTML = data.id;
    buttonPokedex.href = `https://www.pokemon.com/us/pokedex/${data.id}`;
    if (
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ] != null
    ) {
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    } else if (
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ] == null &&
      data["sprites"]["front_default"] == null
    ) {
      pokemonImage.src = "./img/question-mark.png";
    } else {
      pokemonImage.src = data["sprites"]["front_default"];
    }

    input.value = "";
    searchPokemon = data.id;
  } else {
    buttonPokedex.style.display = "none";
    pokemonName.innerHTML = "MissingNo.";
    pokemonId.innerHTML = "???";
    pokemonImage.src = "./img/Missingno.png";
    searchPokemon = 0;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  if (searchPokemon < 906) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

buttonRandom.addEventListener("click", () => {
  renderPokemon(Math.floor(Math.random() * 906) + 1);
});
