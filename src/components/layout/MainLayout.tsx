import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
