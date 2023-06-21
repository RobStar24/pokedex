import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);

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
        <article>
          {/* Stats */}
          <section className="px-2">
            <h3>Stats</h3>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.url}>
                  <section>
                    <h4>{stat.stat.name}</h4>
                    <span>{stat.base_stat}</span>
                  </section>

                  {/* Stat progress bar */}
                  <div className="bg-gray-300 h-8 rounded-md overflow-hidden">
                    <div style={{width: progressStatPercent(stat.base_stat)}} className="h-full bg-yellow-500"></div>
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
