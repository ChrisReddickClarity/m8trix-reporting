import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import VitalityScore from "./dashboard/VitalityScore";
import FunctionalAreas from "./dashboard/FunctionalAreas";
import PlanStatus from "./dashboard/PlanStatus";
import PerformancePlan from "./dashboard/PerformancePlan";

/**
 * PRD Section: Main Dashboard View
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component serves as the main entry point for the application, displaying a comprehensive
 * overview of the user's health status including:
 * - Overall health/vitality score
 * - Functional areas performance
 * - Biomarker results summary with out-of-range indicators
 * - Performance plan recommendations
 */

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-black text-white rounded-b-3xl px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12L4 4L6 20L12 12L20 12Z"
                  stroke="#4ADE80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold">Vitality</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-black rounded-full overflow-hidden border border-gray-700">
              <Button
                variant="ghost"
                className="text-white bg-black hover:bg-gray-800 rounded-full px-4"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 rounded-full px-4"
              >
                Bloodwork
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 rounded-full px-4"
              >
                Performance
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 rounded-full px-4"
              >
                Education
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-green-400 text-black px-4 py-1 rounded-full">
                Vitality score: 92.1%
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div>
            <PlanStatus />
            <div className="mt-6">
              <VitalityScore
                score={92.1}
                percentile={99}
                biologicalAge={26.2}
                chronologicalAge={30}
                focusAreas={[
                  { name: "Sleep", score: 94.1, isPrimary: true },
                  { name: "Muscle size", score: 85.3, isPrimary: false },
                ]}
              />
            </div>
          </div>

          {/* Right column (spans 2 columns) */}
          <div className="lg:col-span-2">
            <FunctionalAreas />
            <div className="mt-6">
              <PerformancePlan />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full"
            onClick={() => navigate("/plan")}
          >
            Review plan <ArrowRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
