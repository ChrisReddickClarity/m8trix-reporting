import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
