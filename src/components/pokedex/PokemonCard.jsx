import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const pokeLinearGradients = {
  grass: "bg-gradient-to-t from-[#CAE099] to-[#7EC6C5]",
  fire: "bg-gradient-to-t from-[#F96D6F] to-[#E8AE1B]",
  water: "bg-gradient-to-t from-[#82B2F1] to-[#1479FB]",
  bug: "bg-gradient-to-t from-[#AAFFA8] to-[#62DB60]",
  normal: "bg-gradient-to-t from-[#735259] to-[#7C3F4C]",
  poison: "bg-gradient-to-t from-[#CE9BFF] from-30% to-[#5B3184]",
  electric: "bg-gradient-to-t from-[#A1871F] to-[#F8D030]",
  ground: "bg-gradient-to-t from-[#654008] from-30% to-[#D69638]",
  fairy: "bg-gradient-to-t from-[#9B6470] from-10% to-[#F4BDC9]",
  fighting: "bg-gradient-to-t from-[#C03028] to-[#D67873]",
  flying: "bg-gradient-to-t from-[#A890F0] to-[#6D5E9C]",
  rock: "bg-gradient-to-t from-[#786824] to-[#B8A038]",
  psychic: "bg-gradient-to-t from-[#6C3D64] from-30% to-[#A65E9A]",
  ghost: "bg-gradient-to-t from-[#493963] from-70% to-[#705898]",
  ice: "bg-gradient-to-t from-[#BDEBFE] from-10% to-[#BCE6E6]",
  dragon: "bg-gradient-to-t from-[#A2BEC1] from-50% to-[#478A93]",
  steel: "bg-gradient-to-t from-[#A8A8A8] from-50% to-[#5E736C]",
  dark: "bg-gradient-to-t from-[#5A5E5D] from-1% to-[#030706] to-30%",
  unknown: "bg-gradient-to-t from-[#44685E] to-[#9DC1B7]",
  shadow: "bg-gradient-to-t from-[#441e80] to-[#2d2e2f]",
};

const pokeBorder = {
  grass: "border-8 rounded-md border-[#7EC6C5]",
  fire: "border-8 rounded-md border-[#F96D6F]",
  water: "border-8 rounded-md border-[#1479FB]",
  bug: "border-8 rounded-md border-[#62DB60]",
  normal: "border-8 rounded-md border-[#7C3F4C]",
  poison: "border-8 rounded-md border-[#5B3184]",
  electric: "border-8 rounded-md border-[#F8D030]",
  ground: "border-8 rounded-md border-[#D69638]",
  fairy: "border-8 rounded-md border-[#F4BDC9]",
  fighting: "border-8 rounded-md border-[#D67873]",
  flying: "border-8 rounded-md border-[#6D5E9C]",
  rock: "border-8 rounded-md border-[#B8A038]",
  psychic: "border-8 rounded-md border-[#A65E9A]",
  ghost: "border-8 rounded-md border-[#705898]",
  ice: "border-8 rounded-md border-[#BCE6E6]",
  dragon: "border-8 rounded-md border-[#478A93]",
  steel: "border-8 rounded-md border-[#5E736C]",
  dark: "border-8 rounded-md border-[#030706]",
  unknown: "border-8 rounded-md border-[#9DC1B7]",
  shadow: "border-8 rounded-md border-[#2d2e2f]",
};

const pokeText = {
  grass: "text-[#416460]",
  fire: "text-[#E75C35]",
  water: "text-[#1479FB]",
  bug: "text-[#4AB648]",
  normal: "text-[#735259]",
  poison: "text-[#5B3184]",
  electric: "text-[#F8D030]",
  ground: "text-[#654008]",
  fairy: "text-[#971B45]",
  fighting: "text-[#96402A]",
  flying: "text-[#6D5E9C]",
  rock: "text-[#7E7E7E]",
  psychic: "text-[#A65E9A]",
  ghost: "text-[#323569]",
  ice: "text-[#6FBEDF]",
  dragon: "text-[#478A93]",
  steel: "text-[#5E736C]",
  dark: "text-[#030706]",
  unknown: "text-[#9DC1B7]",
  shadow: "text-[#2d2e2f]",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatPokemonTypes = (types = []) => {
    const typesNames = types.map((type) => {
        const capitalizedType = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
        return capitalizedType;
      });
      const typesTitle = typesNames.join(" / ");
      return typesTitle;
  };

  formatPokemonTypes(pokemon?.types);

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.name}`}>
      <article
        className={`w-[300px] ${pokeBorder[pokemon?.types[0].type.name]}`}
      >
        {/* Superior Section */}
        <section
          className={`relative h-40 ${
            pokeLinearGradients[pokemon?.types[0].type.name]
          }`}
        >
          <div className="absolute px-12 -bottom-14">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt={pokemon?.name}
            />
          </div>
        </section>

        {/* Inferior Section */}
        <section className="text-center">
          <h2 className={`mt-14 text-2xl font-bold ${pokeText[pokemon?.types[0].type.name]}`}>
            {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
          </h2>
          <h3>{formatPokemonTypes(pokemon?.types)}</h3>
          <span>Type</span>
        </section>

        <div className="border border-gray-100 mt-4"></div>

        <section className="grid grid-cols-2 grid-rows-2 mx-auto text-center">
          {/* Generate stats list */}
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <div className="p-3" key={stat.stat.url}>
              <h4 className="text-gray-400">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</h4>
              <span className={`${pokeText[pokemon?.types[0].type.name]} font-bold text-lg`}>
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </article>
    </Link>
  );
};
export default PokemonCard;
