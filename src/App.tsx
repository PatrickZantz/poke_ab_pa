import React, { useState, useEffect } from "react";
import Header from "./components/Header";
// import Hero from "./pages/Hero";
import Sidebar from "./pages/Sidebar";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#ccdadd" : "black";
  }, [theme]);

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "text-[#ccdadd]" : "text-black"}`}>
      {/* Header */}
      <Header toggleTheme={toggleTheme} theme={theme} onToggleSidebar={() => setIsSidebarOpen(true)} />

      {/* Main Content */}
      <main className="p-4">
        {/* <Hero /> */}
      </main>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default App;
