import React from "react";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onToggleSidebar: () => void;
  toggleTheme: () => void; // Ensure toggleTheme is included
  theme: string;
  onSearch: (searchTerm: string) => void; // Prop für die Suchfunktion
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSearch }) => {
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  
  return (
    <header className="w-full bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="flex flex-col items-center pt-6">
        {/* Logo with onClick to go home */}
        <img
          src={logo}
          alt="Pokemon Logo"
          className="h-22 mb-8 cursor-pointer"
          onClick={() => (window.location.href = "/")} // Redirects to homepage
        />

        {/* Navigation Row */}
        <div className="flex items-center w-full max-w-4xl px-4 mb-4">
          {/* Hamburger Menu */}
          <button
            onClick={onToggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
              transition-colors duration-300"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
            </div>
          </button>

          {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokemon"
        onChange={handleSearch}
        className="flex-grow mx-4 px-4 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-700 
          border border-gray-200 dark:border-gray-600
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          transition-colors duration-300"
      />

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleTheme} // Call toggleTheme on button click
            className={`w-10 h-10 flex items-center justify-center rounded-full
              ${theme === 'dark' 
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }
              transform transition-all duration-300 hover:scale-110`}
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? '🔆' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
