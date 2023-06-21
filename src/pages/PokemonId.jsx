import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";

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

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);
  console.log(pokemon);

  const { pokemonName } = useParams();

  const progressStatPercent = (baseStat) => {
    const MAX_STAT = 255;
    return `${(baseStat * 100) / MAX_STAT}%`;
  };

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Header />

      <section>
        {/* Detail info about the Pokemon */}
        <article className="mx-auto w-[90%] h-[90%] my-16 pb-4 shadow-md">
          {/* Superior Section */}
          <section
            className={`relative h-24 ${
              pokeLinearGradients[pokemon?.types[0].type.name]
            }`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
              <img
                className="h-[200px] object-contain"
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt={pokemon?.name}
              />
            </div>
          </section>

          {/* Number & Name */}
          <section className="grid place-items-center overflow-hidden">
            <h3
              className={`${
                pokeText[pokemon?.types[0].type.name]
              } text-center font-semibold py-4 text-lg`}
            >
              <span className="border border-gray-300 p-1">#{pokemon?.id}</span>
            </h3>
            <h4
              className={`${
                pokeText[pokemon?.types[0].type.name]
              } text-center font-semibold pb-1 text-2xl line-effect`}
            >
              {pokemon && pokemon.name
                ? `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(
                    1
                  )}`
                : ""}
            </h4>
          </section>

          {/* Weight and Height */}
          <section className="grid grid-cols-2 text-center pb-4 gap-6">
            <div className="grid justify-items-end">
              <p className="text-xs">Weight</p>
              <p className="text-sm">{pokemon?.weight}</p>
            </div>
            <div className="grid justify-items-start">
              <p className="text-xs">Height</p>
              <p className="text-sm">{pokemon?.height}</p>
            </div>
          </section>

          {/* Type & Habilities */}
          <section>
            <div>
              
            </div>
            <div></div>
          </section>

          {/* Stats */}
          <section className="px-2">
            <div className="flex justify-between">
              <h3 className="font-semibold text-2xl pr-2">Stats</h3>
              <div className="bg-gray-300 w-full h-[1px] translate-y-4"></div>
              <img className="h-16 -translate-y-5" src="/images/pokePointer.png" alt="" />
            </div>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.url}>
                  <section>
                    <h4>{stat.stat.name}</h4>
                    <span>{stat.base_stat}</span>
                  </section>

                  {/* Stat progress bar */}
                  <div className="bg-gray-300 h-8 rounded-md overflow-hidden">
                    <div
                      style={{ width: progressStatPercent(stat.base_stat) }}
                      className="h-full bg-yellow-500"
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </main>
  );
};
export default PokemonId;
