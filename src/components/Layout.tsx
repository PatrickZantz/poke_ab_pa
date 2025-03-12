import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../pages/Sidebar";

interface LayoutProps {
  toggleTheme: () => void;
  theme: string;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Main Content */}
      <main className="p-4">
        {/* <Hero /> */}
      </main>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default Layout;
