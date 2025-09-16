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
    <div className="container mx-auto px-6 py-8">
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
    </div>
  );
};

export default Home;
