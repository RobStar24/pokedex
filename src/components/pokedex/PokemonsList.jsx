import PokemonCard from "./PokemonCard"

const PokemonsList = ({pokemons}) => {
  return (
    <section className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1300px] justify-items-center mx-auto">
        {
            pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }   
    </section>
  )
}
export default PokemonsList