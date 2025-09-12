import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * PRD Section: User-friendly interface with clear navigation
 *
 * User-friendly interface with clear navigation between dashboard, bloodwork results,
 * performance plans, and educational content.
 *
 * This component provides a consistent layout and navigation structure across the application,
 * allowing users to easily navigate between the main sections of the dashboard.
 */
const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <header className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.webp"
              alt="M8TRIX Health Logo"
              className="h-8 mr-2"
            />
            <h1 className="text-2xl font-bold dark:text-white">
              M8TRIX Health
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-full flex items-center">
              <span className="font-medium">Vitality score: 92.1%</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto py-2 flex justify-center">
          <div className="bg-black text-white rounded-full p-1 inline-flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/biomarker/ggt"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive || location.pathname.includes("/biomarker") ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              Bloodwork
            </NavLink>
            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              Performance
            </NavLink>
            <NavLink
              to="/education"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              Education
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `text-white rounded-full px-4 py-2 ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
              }
            >
              <Settings className="h-4 w-4 inline mr-1" />
              Settings
            </NavLink>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
