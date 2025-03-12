import React from "react";
import logo from "../assets/logo.png"; // Stelle sicher, dass das Logo korrekt importiert wird

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
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

  return (
    <div className="fixed top-[0] right-[0] h-full w-[300px] bg-[#ccdadd] shadow-md p-[20px] z-[1000] border-l border-blue-dark">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-[10px] right-[10px] text-xl font-bold text-black hover:text-gray-dark"
      >
        ✖
      </button>

      {/* Pokémon Logo */}
      <img src={logo} alt="Pokemon Logo" className="mx-auto h-[50px]" />

      {/* Filter Title */}
      <h2 className="text-center text-xl font-bold mt-[20px] mb-[20px] text-blue-dark">TYPE</h2>

      {/* Types */}
      <div className="grid grid-cols-[repeat(2,_1fr)] gap-[10px]">
        {types.map((type) => (
          <button key={type.name} className={`py-[8px] px-[12px] rounded-lg font-semibold capitalize text-white ${type.color}`}>
            {type.name}
          </button>
        ))}
      </div>

      {/* Search Button */}
      <button className="w-full mt-auto py-[12px] bg-yellow hover:bg-yellow-dark rounded-lg font-bold text-black border border-blue-dark">
        SEARCH
      </button>
    </div>
  );
};

export default Sidebar;
