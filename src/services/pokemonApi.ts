/**
 * PokemonApi Service
 * 
 * A singleton service class that handles all API interactions with the PokeAPI.
 * Provides methods for fetching Pokemon lists, details, and searching Pokemon.
 * 
 * @class
 * @example
 * ```typescript
 * const api = PokemonApi.getInstance();
 * const pokemon = await api.getPokemonDetails('pikachu');
 * ```
 */

import axios from 'axios';
import { Pokemon, PokemonList } from '../interface/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonApi {
  private static instance: PokemonApi;

  /**
   * Gets the singleton instance of PokemonApi
   * @returns PokemonApi instance
   */
  public static getInstance(): PokemonApi {
    if (!PokemonApi.instance) {
      PokemonApi.instance = new PokemonApi();
    }
    return PokemonApi.instance;
  }

  /**
   * Fetches a list of Pokemon from the API
   * @param limit - Maximum number of Pokemon to fetch
   * @param offset - Number of Pokemon to skip
   * @returns Promise containing the Pokemon list response
   */
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonList> {
    try {
      const response = await axios.get<PokemonList>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  /**
   * Fetches detailed information about a specific Pokemon
   * @param name - Name or ID of the Pokemon
   * @returns Promise containing the Pokemon details
   */
  async getPokemonDetails(name: string): Promise<Pokemon> {
    try {
      const response = await axios.get<Pokemon>(
        `${BASE_URL}/pokemon/${name.toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon details for ${name}:`, error);
      throw error;
    }
  }

  /**
   * Searches for Pokemon by name
   * @param name - Search term to match against Pokemon names
   * @returns Promise containing an array of matching Pokemon
   */
  async searchPokemon(name: string): Promise<Pokemon[]> {
    try {
      const response = await axios.get<PokemonList>(
        `${BASE_URL}/pokemon?limit=1000`
      );
      const filteredResults = response.data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      
      const pokemonDetails = await Promise.all(
        filteredResults.map(pokemon => this.getPokemonDetails(pokemon.name))
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      throw error;
    }
  }

  async getAllPokemonTypes(): Promise<string[]> {
    try {
      const response = await axios.get<{ results: { name: string }[] }>(`${BASE_URL}/type`);
      return response.data.results.map(type => type.name);
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
      throw error;
    }
  }
} 

