import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import pokeBall from "../../assets/pokeball.png";

interface Pokemon {
  name: string;
  url: string;
  index: number;
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

const LazyPokemonCard = React.lazy(() => import("./LazyPokemonCard"));

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokemonStats, setPokemonStats] = useState<
    Record<string, PokemonStat[]>
  >({});

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonStats = async () => {
      const stats: Record<string, PokemonStat[]> = {};

      await Promise.all(
        filteredPokemons.map(async (pokemon) => {
          try {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            stats[pokemon.name] = data.stats;
          } catch (error) {
            console.error(`Error fetching stats for ${pokemon.name}:`, error);
          }
        })
      );

      setPokemonStats(stats);
    };

    fetchPokemonStats();
  }, [filteredPokemons]);

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    filterPokemons(value);
  };

  const filterPokemons = (query: string) => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div
      className="overflow-x-auto pb-10 pt-2"
      style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
    >
      <div className="flex flex-col items-center mb-5">
        <h1 className="py-2 text-4xl font-bold text-center">Pokemon</h1>
        <Image
          src={pokeBall}
          alt="Pokemon Ball"
          width={50}
          height={50}
          blurDataURL="data:..."
          placeholder="blur"
        />
      </div>
      <div className="px-10">
        <div className="mb-4">
          <input
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            placeholder="Search Pokemon..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {searchQuery && filteredPokemons.length === 0 && (
          <div className="text-center">
            <p>
              Sorry no Pokemon's found, please try again or speak to Ash Ketchum
              for advice 🧐
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <Suspense
            fallback={
              <div className="flex items-center">
                <p className="flex-grow">
                  Catching Pokemon, won't be a minute!
                </p>
              </div>
            }
          >
            {filteredPokemons.map((pokemon) => (
              <LazyPokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
