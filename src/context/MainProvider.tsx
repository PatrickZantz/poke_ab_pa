import React, { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext([]);

const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Fetch Pokémon-Daten von der API
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); // Limit auf die ersten 151 Pokémon
        const data = await response.json();
        console.log(data); // Zeigt den Aufbau der API in der Konsole
        setPokemons(data.results); // Speichert die Pokémon-Daten
      } catch (error) {
        console.error("Fehler beim Laden der Pokémon-Daten:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={pokemons}>
      {children}
    </PokemonContext.Provider>
  );
};

export default MainProvider;
