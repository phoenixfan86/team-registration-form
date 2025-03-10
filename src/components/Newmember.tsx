import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import PokemonsSelect from "./PokemonsSelect";
import Modal from "./Modal";

interface Pokemon {
  name: string;
  abilities: string[];
  base_experience: number;
  image: string;
}

const Newmember: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);


  const selectedPokemons = watch("selectedPokemons", []);

  const onSubmit = (data: any) => {
    if (!isModalOpen) {
      if (selectedPokemons.length !== 4) {
        alert("You must select exactly 4 pokemons.");
        return;
      }
      setFormData(data);
      setIsModalOpen(true);
    }
  };

  return (
    <section className="w-105 shadow-lg ring-1 bg-white ring-zinc-400 shadow-zinc-400 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 p-[10px]">
        <div className="w-full flex items-center justify-center p-1">
          <h3 className="text-lg text-zinc-700 font-bold tracking-wider">Registration form</h3>
        </div>

        {/* Name Field */}
        <div className="input-item">
          <label htmlFor="name" className="label">Name</label>
          <InputField
            id="name"
            placeholder="Enter your Name"
            className={`${errors.name ? "border-red-500 focus:border-red-500 " : "border-zinc-400"}`}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
              pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" }
            })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
        </div>

        {/* Last Name Field */}
        <div className="input-item">
          <label htmlFor="last-name" className="label">Last Name</label>
          <InputField
            id="last-name"
            placeholder="Enter your last name"
            className={`${errors.lastName ? "border-red-500 focus:border-red-500 " : "border-zinc-400"}`}
            {...register("lastName", {
              required: "Last Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
              pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" }
            })}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message as string}</span>}
        </div>

        {/* PokemonSelect */}
        <PokemonsSelect control={control} pokemons={pokemons} setPokemons={setPokemons} />

        {/* Buttons */}
        <div className="flex gap-2">
          <button type="reset" className="btn-reset">
            Reset
          </button>
          <button type="submit" className="btn-submit ">
            Preview
          </button>
        </div>
      </form>

      {/*Modal*/}
      {isModalOpen && formData && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="w-full flex items-center justify-between my-4">
            <h3 className=" text-lg font-semibold">Trainer</h3>
            <h2 className="text-xl text-zinc-600 font-bold uppercase">{formData.name} {formData.lastName}</h2>
          </div>
          <ul>
            {selectedPokemons.map((pokemon: string) => {
              const details = pokemons.find(p => p.name === pokemon);
              return (
                <li key={pokemon} className="mb-2 border border-zinc-400 hover:border-violet-500 transition rounded-lg p-1">
                  <div className="w-full flex">
                    <img src={details?.image} alt={details?.name} className="inline-block w-14 h-14 mr-2 hover:scale-150 transition-all" />
                    <div className=""><span className="font-bold text-zinc-800 hover:text-zinc-500 transition-all uppercase mr-2">{details?.name}</span>
                      <p className="font-bold">
                        Ability:
                        <span className="badge-2 font-normal ml-2">
                          {details?.abilities.join(', ')},
                        </span>
                      </p>

                      <p className="font-bold">Base Experience: <span className="badge-1">{details?.base_experience}</span></p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

        </Modal>
      )}
    </section>
  );
};

export default Newmember;
