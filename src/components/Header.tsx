import React from "react";
import logo from "../assets/logo.png"; // Stelle sicher, dass das Logo korrekt importiert wird

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme, onToggleSidebar }) => {
  return (

    <header className={`flex flex-col items-center min-h-screen ${theme === "dark" ? "text-[#ccdadd]" : "text-black"}`}>

      {/* Logo */}
      <img src={logo} alt="Pokemon Logo" className="h-16 mb-4" />

      {/* Navigation Row */}
      <div className="flex items-center w-full max-w-4xl">
        {/* Hamburger Menu */}
        <button
          onClick={onToggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
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
          className="flex-grow mx-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
        />

        {/* Light/Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            theme === "dark" ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-gray-200"
          }`}
        >
          {theme === "dark" ? "🔆" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
