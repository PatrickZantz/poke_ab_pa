import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "../pages/Sidebar";
import { PokemonList } from "./PokemonList";

interface LayoutProps {
  toggleTheme: () => void;
  theme: string;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTypeSelect = (type: string) => {
    console.log('Type selected:', type); // Debugging
    setSelectedType(type);
  };

  return (
    <div className="relative min-h-screen">
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        toggleTheme={toggleTheme}
        theme={theme}
        onSearch={handleSearch}
      />
      {isSidebarOpen && (
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)} 
          onTypeSelect={handleTypeSelect}
        />
      )}
      <main className="container mx-auto px-4 py-8">
        <PokemonList searchTerm={searchTerm} selectedType={selectedType} />
      </main>
    </div>
  );
};

export default Layout;
