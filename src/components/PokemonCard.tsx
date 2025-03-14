/**
 * PokemonCard Component
 * 
 * A card component that displays a Pokemon's basic information including its image,
 * ID, and name. It supports click interactions and displays a detailed popup on image click.
 * The card features smooth animations, hover effects, and theme-aware styling.
 * 
 * @component
 * @example
 * ```tsx
 * <PokemonCard
 *   pokemon={pokemonData}
 *   onClick={(pokemon) => handlePokemonClick(pokemon)}
 * />
 * ```
 */

import React, { useState } from 'react';
import { Pokemon } from '../interface/pokemon.types';
import { useTheme } from '../context/ThemeContext';
import { PokemonDetailPopup } from './PokemonDetailPopup';

interface PokemonCardProps {
  /** Pokemon data to display */
  pokemon: Pokemon;
  /** Optional callback function when the card is clicked */
  onClick?: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const { theme } = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /**
   * Handles the card click event
   * Calls the onClick callback if provided
   */
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  /**
   * Handles the image click event
   * Opens the Pokemon detail popup
   * @param e - Mouse event
   */
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  return (
    <>
      {/* Main Card Container */}
      <div 
        className={`rounded-xl shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),0_3px_6px_-3px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] 
          transition-all duration-300 ease-out cursor-pointer overflow-visible
          hover:shadow-[0_25px_30px_-12px_rgba(0,0,0,0.25),0_18px_20px_-15px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] 
          hover:-translate-y-2 hover:rotate-1
          w-[75%] mx-auto relative
          mb-8 mt-2 bg-gradient-to-br from-white/95 via-white/98 to-white/90
          dark:from-gray-800/95 dark:via-gray-800/98 dark:to-gray-800/90
          dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2),0_3px_6px_-3px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]
          ${theme === 'dark' ? 'dark' : ''}
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:rounded-xl before:z-0
          after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-black/5 after:rounded-xl after:z-0`}
      >
        {/* Card Content */}
        <div onClick={handleClick} className="group p-2.5 pb-2 relative z-10">
          {/* Pokemon Image Container */}
          <div className="relative w-full aspect-square mb-3">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(255,255,255,0.15)] 
              transition-colors duration-300
              ${theme === 'dark' 
                ? 'from-gray-700/90 via-gray-700/70 to-gray-700/80' 
                : 'from-amber-200/95 via-yellow-100/85 to-amber-100/90'}`} />
            {/* Pokemon Image */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] rounded-lg overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-b before:from-amber-50/30 before:to-transparent before:z-10
                cursor-pointer transform transition-transform duration-300 hover:scale-110"
              onClick={handleImageClick}
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={`${pokemon.name} artwork`}
                className="w-full h-full object-contain drop-shadow-[0_10px_8px_rgba(0,0,0,0.15)] 
                  transition-all duration-300 filter saturate-[1.1]
                  hover:drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>

          {/* Pokemon Info */}
          <div className="flex justify-between items-center px-1.5 relative">
            {/* Pokemon ID */}
            <span className={`text-sm font-medium transition-colors duration-300
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
              drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-none`}>
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
            {/* Pokemon Name */}
            <h2 className={`text-base font-bold capitalize transition-colors duration-300
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-none`}>
              {pokemon.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Pokemon Detail Popup */}
      <PokemonDetailPopup
        pokemon={pokemon}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}; 