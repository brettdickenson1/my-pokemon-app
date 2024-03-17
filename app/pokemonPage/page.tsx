"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PokemonBanner from "../components/PokemonBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { ColorWheelIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

const PokemonDetails = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name")!;
  const image = searchParams.get("image")!;
  const id = searchParams.get("id")!;

  const [pokemonStats, setPokemonStats] = useState<PokemonStat[]>([]);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const data = await response.json();
        setPokemonStats(data.stats);

        const abilitiesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const abilitiesData = await abilitiesResponse.json();
        const abilitiesNames = abilitiesData.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        );
        setAbilities(abilitiesNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id]);

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ backgroundColor: "#f3f3f3", minHeight: "100vh" }}
    >
      <PokemonBanner />
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            {loading ? (
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-black">
                Gotta Catch Em All!
              </p>
            ) : (
              <div className="border-yellow-500 bg-white border-8 rounded-lg shadow-md p-6 mb-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-center">
                    {name && name.charAt(0).toUpperCase() + name.slice(1)}
                  </h1>
                  <div className="flex items-center">
                    <p className="mr-1">60 HP</p>{" "}
                    <ColorWheelIcon width={20} height={20} />
                  </div>
                </div>

                <div className="border-2 border-yellow-500 p-2 mb-4 flex justify-center items-center">
                  <Image
                    src={image}
                    alt={name}
                    width={250}
                    height={250}
                    className="transition-opacity opacity-0 duration-[0.5s] rounded"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                </div>

                <div className="mb-2">
                  <div className="flex justify-between">
                    {abilities.map((ability, index) => (
                      <div
                        style={{ fontSize: 14 }}
                        key={index}
                        className="font-bold uppercase mb-1"
                      >
                        {ability}
                      </div>
                    ))}
                  </div>
                  <hr />
                </div>

                {pokemonStats
                  .filter((stat) => stat.stat.name !== "hp")
                  .map((stat, index) => (
                    <div key={index} className="grid grid-cols-2 gap-y-4">
                      <div className="text-sm flex items-center">
                        <span className="font-bold capitalize mr-2">
                          {stat.stat.name}
                        </span>
                        : {stat.base_stat}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
};

const SuspensePokemonDetails = () => (
  <Suspense>
    <PokemonDetails />
  </Suspense>
);

export default SuspensePokemonDetails;
