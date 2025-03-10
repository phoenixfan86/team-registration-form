import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Controller } from "react-hook-form";

interface Pokemon {
  name: string;
  abilities: string[];
  base_experience: number;
  image: string;
}

interface PokemonsSelectProps {
  control: any;
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
}

const PokemonsSelect: React.FC<PokemonsSelectProps> = ({ control, pokemons, setPokemons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";
        const { data } = await axios.get(apiUrl);
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const response = await axios.get(pokemon.url);
            const { name, abilities, base_experience, sprites } = response.data;

            return {
              name,
              abilities: abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
              base_experience,
              image: sprites.front_default,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [setPokemons]);

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full flex items-center justify-center mt-1">
      <div ref={selectRef} className="relative w-full">
        <h3 className="label">Choose Pokemons</h3>
        <Controller
          name="selectedPokemons"
          control={control}
          defaultValue={[]}
          rules={{ validate: (value) => value.length === 4 || "Select exactly 4 pokemons" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {

            const borderColor =
              value.length === 4 ? "border-green-500" : value.length > 0 ? "border-red-500" : "border-zinc-400";

            return (
              <>
                <div className="relative">
                  <button
                    type="button"
                    className={`w-full h-10 bg-white ${borderColor} border rounded-lg text-sm py-3 px-4 hover:border-blue-800 focus:border-blue-800 p-2 flex items-center justify-between transition`}
                    onClick={handleDropdownToggle}
                  >

                    <div className="flex flex-wrap gap-2">
                      {value.length > 0 ? (
                        value.map((name: string) => (
                          <span
                            key={name}
                            className="badge"
                          >
                            {name}

                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Choose your team</span>
                      )}
                    </div>

                    <span className="ml-2 transition">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {value.length > 0 && (
                    <button
                      type="button"
                      className="absolute right-10 top-2 text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange([]);
                      }}
                    >
                      &#x2715;
                    </button>
                  )}
                </div>

                {isOpen && (
                  <div className="absolute z-10 w-full text-sm uppercase bg-white border border-zinc-400 rounded-lg mt-2">
                    {pokemons.map((pokemon: Pokemon) => (
                      <label key={pokemon.name} className="block p-2 cursor-pointer hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={value.includes(pokemon.name)}
                          onChange={() =>
                            onChange(
                              value.includes(pokemon.name)
                                ? value.filter((item: string) => item !== pokemon.name)
                                : [...value, pokemon.name]
                            )
                          }
                          className="mr-2"
                        />
                        {pokemon.name}
                      </label>
                    ))}
                  </div>
                )}

                {error && <span className="text-red-500 text-sm">{error.message}</span>}


              </>
            );
          }}
        />
      </div>
    </section>
  );
};

export default PokemonsSelect;
