import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./pages/Sidebar";
import { PokemonList } from './components/PokemonList';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme}`}>
      <AppContent 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        toggleTheme={toggleTheme} 
        theme={theme}
      />
    </div>
  );
};

const AppContent: React.FC<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void; 
  theme: string;
}> = ({ isSidebarOpen, setIsSidebarOpen, toggleTheme, theme }) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <div className="flex flex-col min-h-screen">
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          toggleTheme={toggleTheme}
          theme={theme}
          onSearch={handleSearch}
        />

        <main className="flex-1 w-full max-w-4xl px-4 mx-auto mt-8 mb-12">
          <PokemonList searchTerm={searchTerm} selectedType={selectedType} />
        </main>

        {isSidebarOpen && (
          <Sidebar 
            onClose={() => setIsSidebarOpen(false)} 
            onTypeSelect={handleTypeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default App;
