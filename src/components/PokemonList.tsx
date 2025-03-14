/**
 * PokemonList Component
 * 
 * A component that displays a grid of Pokemon cards with filtering and pagination capabilities.
 * It handles loading states, error states, and displays Pokemon cards in a responsive grid layout.
 * 
 * @component
 * @example
 * ```tsx
 * <PokemonList 
 *   searchTerm="pikachu"
 *   selectedType="Electric"
 * />
 * ```
 */

import React, { useEffect, useState } from 'react';
import { Pokemon } from '../interface/pokemon.types';
import { PokemonApi } from '../services/pokemonApi';
import { PokemonCard } from './PokemonCard';
import { useTheme } from '../context/ThemeContext';

interface PokemonListProps {
  /** Search term to filter Pokemon by name */
  searchTerm: string;
  /** Selected type to filter Pokemon by type */
  selectedType: string | null;
}

export const PokemonList: React.FC<PokemonListProps> = ({ searchTerm, selectedType }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const { theme } = useTheme();

  const pokemonApi = PokemonApi.getInstance();

  /**
   * Loads Pokemon data from the API
   * Fetches a list of Pokemon and their details
   * Handles loading states and error states
   */
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        let pokemonList: Pokemon[];

        if (selectedType) {
          const response = await pokemonApi.getPokemonList(200, 20);
          const allPokemon = await Promise.all(
            response.results.map(p => pokemonApi.getPokemonDetails(p.name))
          );
          pokemonList = allPokemon.filter(p => 
            p.types.some(t => t.type.name.toLowerCase() === selectedType.toLowerCase())
          );
        } else {
          const response = await pokemonApi.getPokemonList(200, 20);
          pokemonList = await Promise.all(
            response.results.map(p => pokemonApi.getPokemonDetails(p.name))
          );
        }

        setPokemon(pokemonList);
      } catch (err) {
        setError('Failed to load Pokemon. Please try again later.');
        console.error('Error loading Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [selectedType]);

  /**
   * Filters Pokemon based on search term and selected type
   * @returns Filtered array of Pokemon
   */
  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || p.types.some(type => type.type.name.toLowerCase() === selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
      transition-all duration-300 ease-in-out
      ${theme === 'dark' ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}`}>
      {/* Error State */}
      {error && (
        <div className={`text-red-500 text-center mb-6 p-4 rounded-lg
          ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading Pokemon...
          </p>
        </div>
      ) : (
        <>
          {/* Pokemon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredPokemon.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={(pokemon) => console.log('Clicked:', pokemon.name)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`px-4 py-2 rounded-lg transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
