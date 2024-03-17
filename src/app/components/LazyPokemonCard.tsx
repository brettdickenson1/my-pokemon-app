import React from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
  index: number;
}

interface LazyPokemonCardProps {
  pokemon: Pokemon;
}

const LazyPokemonCard: React.FC<LazyPokemonCardProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split("/")[6];

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md mb-0 ">
      <Link
        href={{
          pathname: "/pokemonPage",
          query: {
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            name: pokemon.name,
            id: pokemonId,
          },
        }}
      >
        <div className="flex items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemon.name}
            className="w-32 h-32 rounded"
          />
          <div className="ml-4">
            <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LazyPokemonCard;
