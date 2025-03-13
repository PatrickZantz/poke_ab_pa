import React from 'react';
import { Pokemon } from '../interface/pokemon.types';

interface PokemonDetailPopupProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonDetailPopup: React.FC<PokemonDetailPopupProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/40 backdrop-blur-sm p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[95vw] h-[90vh] 2xl:w-[1600px] 2xl:h-[1000px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-red-500 hover:text-white dark:bg-gray-700 dark:text-gray-300"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex h-full flex-col lg:flex-row">
          {/* Left Section - Images */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-8 dark:from-gray-700 dark:to-gray-900">
              <div className="grid h-full grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Front View */}
                <div className="hidden lg:flex justify-center">
                  <div className="group relative">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={`${pokemon.name} front view`}
                      className="h-48 w-48 2xl:h-64 2xl:w-64 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-125"
                    />
                    <div className="absolute inset-0 rounded-full bg-yellow-400/0 blur-2xl transition-all group-hover:bg-yellow-400/20" />
                  </div>
                </div>

                {/* Main Artwork */}
                <div className="col-span-1 flex justify-center">
                  <div className="group relative">
                    <img
                      src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                      alt={`${pokemon.name} artwork`}
                      className="h-64 w-64 2xl:h-96 2xl:w-96 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-125 animate-float"
                    />
                    <div className="absolute inset-0 rounded-full bg-yellow-400/0 blur-3xl transition-all group-hover:bg-yellow-400/30" />
                  </div>
                </div>

                {/* Back View */}
                <div className="hidden lg:flex justify-center">
                  <div className="group relative">
                    <img
                      src={pokemon.sprites.back_default}
                      alt={`${pokemon.name} back view`}
                      className="h-48 w-48 2xl:h-64 2xl:w-64 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-125"
                    />
                    <div className="absolute inset-0 rounded-full bg-yellow-400/0 blur-2xl transition-all group-hover:bg-yellow-400/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Info */}
          <div className="flex-1 p-8 lg:p-12">
            {/* Pokemon Name and ID */}
            <div className="mb-8">
              <h2 className="font-pokemon text-4xl 2xl:text-6xl font-bold capitalize tracking-wider text-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] dark:text-yellow-400">
                {pokemon.name}
              </h2>
              <span className="font-pokemon-hollow text-3xl 2xl:text-5xl font-bold tracking-wider text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] dark:text-blue-400">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>

            {/* Types */}
            <div className="mb-8">
              <div className="flex gap-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="font-pixel text-lg 2xl:text-xl rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-2 text-white shadow-md transition-transform hover:scale-110"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="text-left">
                  <div className="mb-2 flex justify-between">
                    <span className="font-game text-lg 2xl:text-xl capitalize text-gray-600 dark:text-gray-400">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="font-game text-lg 2xl:text-xl font-bold text-gray-800 dark:text-gray-200">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="h-4 2xl:h-5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Abilities */}
            <div>
              <h3 className="mb-4 font-pokemon text-3xl 2xl:text-4xl text-yellow-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] dark:text-yellow-400">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-4">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="font-pixel text-lg 2xl:text-xl rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-2 text-white shadow-md transition-transform hover:scale-110"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 