import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Activity,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  History,
} from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation steps based on current path
  const getNavigationSteps = () => {
    const path = location.pathname;

    if (path.includes("/biomarker")) {
      return {
        prev: { label: "Dashboard", path: "/" },
        next: { label: "Recommendations", path: "/recommendations" },
      };
    } else if (path.includes("/recommendations")) {
      return {
        prev: { label: "Biomarkers", path: "/biomarker/ggt" },
        next: { label: "Detailed Plan", path: "/plan" },
      };
    } else if (path.includes("/plan")) {
      return {
        prev: { label: "Recommendations", path: "/recommendations" },
        next: { label: "Education", path: "/education" },
      };
    } else if (path.includes("/education")) {
      return {
        prev: { label: "Plan", path: "/plan" },
        next: { label: "History", path: "/history" },
      };
    } else if (path.includes("/history")) {
      return {
        prev: { label: "Education", path: "/education" },
        next: { label: "Settings", path: "/settings" },
      };
    } else if (path.includes("/settings")) {
      return {
        prev: { label: "History", path: "/history" },
        next: null,
      };
    } else {
      // Default for home page
      return {
        prev: null,
        next: { label: "Biomarkers", path: "/biomarker/ggt" },
      };
    }
  };

  const navSteps = getNavigationSteps();

  return (
    <footer className="bg-black text-white rounded-t-3xl px-6 py-4 mt-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Previous/Next Navigation */}
          <div className="flex items-center gap-4">
            {navSteps.prev ? (
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => navigate(navSteps.prev.path)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {navSteps.prev.label}
              </Button>
            ) : (
              <div></div> // Empty div to maintain layout when no prev button
            )}

            {navSteps.next ? (
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate(navSteps.next.path)}
              >
                {navSteps.next.label}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div></div> // Empty div to maintain layout when no next button
            )}
          </div>

          {/* Quick Navigation Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/biomarker/ggt")}
            >
              <Activity className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/recommendations")}
            >
              <BarChart2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/education")}
            >
              <BookOpen className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/history")}
            >
              <History className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
