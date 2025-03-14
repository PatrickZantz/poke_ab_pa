import React, { useEffect, useState } from 'react';
import { Pokemon } from '../interface/pokemon.types';
import { PokemonApi } from '../services/pokemonApi';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  searchTerm: string; // Neue Prop für den Suchbegriff
  selectedType: string | null;
}

export const PokemonList: React.FC<PokemonListProps> = ({ searchTerm, selectedType }) => {

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const pokemonApi = PokemonApi.getInstance();

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

  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? p.types.some(t => t.type.name === selectedType) : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
      {error && (
        <div className="text-red-500 text-center mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Pokemon...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredPokemon.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={(pokemon) => console.log('Clicked:', pokemon.name)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
                text-gray-700 dark:text-gray-200
                disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 
                transition-all duration-300"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
                text-gray-700 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-600 
                transition-all duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 