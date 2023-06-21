import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import PokemonsList from "../components/pokedex/PokemonsList";
import axios from "axios";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName.toLowerCase().trim())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12;

    // Pokemos that are going to show in the actual page
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    // Last page
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    // Actual Block
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // Pages that are going to be showing in the current block
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }

    return { pokemonsInPage, lastPage, pagesInBlock };
  };

  const { pokemonsInPage, lastPage, pagesInBlock } = paginationLogic();

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";

    axios
      .get(URL)
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(url)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, currentType]);

  return (
    <main>
      <Header />

      <section className="place-items-center mx-6">
        {/* Filter and greeting section */}
        <section>
          <h3 className="mt-6 p-2">
            <span className="text-red-600 font-semibold">
              Welcome {trainerName}
            </span>
            , here you can find your favorite Pokemon
          </h3>

          <form className="flex gap-x-4 flex-wrap" onSubmit={handleSubmit}>
            <div className="w-[60%]">
              <input
                className="shadow-md p-2 w-full my-2"
                id="pokemonName"
                placeholder="type a pokemon name..."
                type="text"
              />
            </div>
            <button className="bg-red-600 my-2 px-4 h-[39px] rounded-md text-white">
              Search
            </button>

            <select className="shadow-md h-10 translate-y-3" onChange={handleChangeType}>
              <option value="">All</option>
              {types.map((type) => (
                <option value={type.name} key={type.url}>
                  {type.name}
                </option>
              ))}
            </select>
          </form>
        </section>

        {/* Pagination */}
        <ul className="flex gap-3 justify-center py-6 flex-wrap">
          {/* First Page */}
          <li
            onClick={() => setCurrentPage(1)}
            className="p-2 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            <i className="bx bx-chevrons-left"></i>
          </li>
          {/* Previous Page */}
          <li
            onClick={handleClickPreviousPage}
            className="p-2 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            <i className="bx bx-chevron-left"></i>
          </li>
          {pagesInBlock.map((numberPage) => (
            <li
              onClick={() => setCurrentPage(numberPage)}
              className={`p-2 px-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${
                numberPage === currentPage && "bg-red-950"
              }`}
              key={numberPage}
            >
              {numberPage}
            </li>
          ))}
          {/* Next Page */}
          <li
            onClick={handleClickNextPage}
            className="p-2 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            <i className="bx bx-chevron-right"></i>
          </li>
          {/* Last Page */}
          <li
            onClick={() => setCurrentPage(lastPage)}
            className="p-2 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            <i className="bx bx-chevrons-right"></i>
          </li>
        </ul>

        {/* Pokemons list section */}
        <PokemonsList pokemons={pokemonsInPage} />
      </section>
    </main>
  );
};
export default Pokedex;
