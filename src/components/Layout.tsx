import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "../pages/Sidebar";
import { PokemonList } from "./PokemonList"; // Importieren Sie die PokemonList-Komponente

interface LayoutProps {
  toggleTheme: () => void;
  theme: string;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="relative min-h-screen">
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        toggleTheme={toggleTheme}
        theme={theme}
        onSearch={handleSearch} // Übergeben Sie die Suchfunktion an den Header
      />
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      <main className="container mx-auto px-4 py-8">
        <PokemonList searchTerm={searchTerm} /> {/* Fügen Sie die PokemonList-Komponente hinzu */}
      </main>
    </div>
  );
};

export default Layout;
