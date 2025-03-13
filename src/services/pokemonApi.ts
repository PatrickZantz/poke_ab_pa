import axios from 'axios';
import { Pokemon, PokemonList } from '../interface/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonApi {
  private static instance: PokemonApi;
  private constructor() {}

  public static getInstance(): PokemonApi {
    if (!PokemonApi.instance) {
      PokemonApi.instance = new PokemonApi();
    }
    return PokemonApi.instance;
  }

  /**
   * Get a list of Pokemon with pagination
   * @param limit Number of Pokemon to fetch
   * @param offset Number of Pokemon to skip
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
   * Get detailed information about a specific Pokemon
   * @param idOrName Pokemon ID or name
   */
  async getPokemonDetails(idOrName: number | string): Promise<Pokemon> {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${idOrName}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${idOrName}:`, error);
      throw error;
    }
  }

  /**
   * Search for Pokemon by name
   * @param name Pokemon name to search for
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
} 