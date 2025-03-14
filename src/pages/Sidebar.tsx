import React, { useState } from "react"; // Ensure React and useState are imported correctly
import logo from "../assets/logo.png"; // Ensure the logo is imported correctly
import { useTheme } from '../context/ThemeContext'; // Ensure useTheme is imported correctly

interface SidebarProps {
  onClose: () => void;
  onTypeSelect: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, onTypeSelect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null); // State to manage selected type
  const { theme } = useTheme();

  const types = [
    { name: "Bug", color: "bg-green-600" },
    { name: "Dark", color: "bg-black" },
    { name: "Dragon", color: "bg-blue-800" },
    { name: "Electric", color: "bg-yellow-400" },
    { name: "Fairy", color: "bg-pink-300" },
    { name: "Fighting", color: "bg-red-600" },
    { name: "Fire", color: "bg-orange-500" },
    { name: "Flying", color: "bg-gray-300" },
    { name: "Ghost", color: "bg-purple-800" },
    { name: "Grass", color: "bg-green-500" },
    { name: "Ground", color: "bg-yellow-700" },
    { name: "Ice", color: "bg-blue-300" },
    { name: "Normal", color: "bg-gray-400" },
    { name: "Plant", color: "bg-lime-500" },
    { name: "Poison", color: "bg-purple-600" },
    { name: "Psychic", color: "bg-pink-500" },
    { name: "Rock", color: "bg-yellow-800" },
    { name: "Steel", color: "bg-gray-600" },
    { name: "Water", color: "bg-blue-500" },
  ];

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    onTypeSelect(type);
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[300px] 
      bg-white dark:bg-gray-800 shadow-lg p-5 z-[1000] 
      border-l border-gray-200 dark:border-gray-700
      transition-colors duration-300`}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-xl font-bold 
          text-gray-600 dark:text-gray-300 
          hover:text-gray-800 dark:hover:text-gray-100
          transition-colors duration-300"
      >
        ✖
      </button>

      {/* Pokémon Logo */}
      <img src={logo} alt="Pokemon Logo" className="mx-auto h-[50px] mb-6" />

      {/* Filter Title */}
      <h2 className="text-center text-xl font-bold mb-6 
        text-gray-800 dark:text-gray-100
        transition-colors duration-300">
        TYPE
      </h2>

      {/* Types */}
      <div className="grid grid-cols-2 gap-3">
        {types.map((type) => (
          <button
            onClick={() => handleTypeClick(type.name)}
            key={type.name} 
            className={`py-2 px-4 rounded-lg font-semibold capitalize text-white ${type.color}
              transform transition-transform duration-200 hover:scale-105`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; // Ensure Sidebar is exported correctly
