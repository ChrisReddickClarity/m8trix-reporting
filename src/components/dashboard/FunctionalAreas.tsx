import React, { useState } from "react";
import { Info, Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * PRD Section: Functional Areas Overview
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component specifically handles the functional areas overview, displaying various
 * body systems and their performance scores with visual indicators. It allows filtering
 * by performance level and highlights focus areas for improvement.
 */

interface FunctionalArea {
  name: string;
  score: number;
  isFocus?: boolean;
}

interface FunctionalAreasProps {
  areas?: FunctionalArea[];
  impactFactors?: {
    name: string;
    value: string;
    severity?: "Mild" | "Moderate" | "Strong";
    isFocus?: boolean;
  }[];
  focusArea?: string;
}

const FunctionalAreas = ({
  areas = [
    { name: "Sleep", score: 94.1, isFocus: true },
    { name: "Micronutrients", score: 93.8 },
    { name: "Cardiovascular", score: 92.9 },
    { name: "Cell health", score: 91.2 },
    { name: "Energy", score: 90.7 },
    { name: "Resilience", score: 90.6 },
    { name: "Stress", score: 90.4 },
    { name: "Inflammation", score: 89.9 },
    { name: "Toxic load", score: 89.4 },
    { name: "Hydration", score: 89.3 },
    { name: "Hormone profile", score: 88.8 },
    { name: "Brain chemistry", score: 88.5 },
    { name: "Gut health", score: 88.1 },
  ],
  impactFactors = [
    { name: "Metabolic imbalance", value: "Mild", severity: "Mild" },
    { name: "Testosterone Total", value: "277 ng/dL", isFocus: false },
    { name: "Hemoglobin A1C", value: "5.4%", isFocus: false },
    { name: "DHEA-S", value: "230 ug/dL", isFocus: false },
  ],
  focusArea = "Sleep: 94.1%",
}: FunctionalAreasProps) => {
  const [filter, setFilter] = useState("All");

  // Sort areas by score in descending order
  const sortedAreas = [...areas].sort((a, b) => b.score - a.score);

  // Filter areas based on selected filter
  const filteredAreas = sortedAreas.filter((area) => {
    if (filter === "All") return true;
    if (filter === "High") return area.score >= 90;
    if (filter === "Low") return area.score < 90;
    return true;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Functional Areas</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={18} className="text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Functional areas represent different systems in your body and
                  how they're performing.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="All" className="w-auto">
          <TabsList>
            <TabsTrigger
              value="All"
              onClick={() => setFilter("All")}
              className={filter === "All" ? "bg-black text-white" : ""}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Low"
              onClick={() => setFilter("Low")}
              className={filter === "Low" ? "bg-black text-white" : ""}
            >
              Low
            </TabsTrigger>
            <TabsTrigger
              value="High"
              onClick={() => setFilter("High")}
              className={filter === "High" ? "bg-black text-white" : ""}
            >
              High
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {impactFactors && impactFactors.length > 0 && (
          <div className="w-full text-sm text-gray-600 mb-2">
            <span className="font-medium">
              {impactFactors.length} impact factors for
            </span>
            <span className="ml-2 inline-flex items-center">
              <Star size={16} className="text-green-500 fill-green-500 mr-1" />
              {focusArea}
            </span>
          </div>
        )}

        {impactFactors?.map((factor, index) => (
          <div key={index} className="flex flex-col p-3 border rounded-lg">
            <span className="font-medium">{factor.name}</span>
            <div className="flex items-center gap-1">
              {factor.severity && (
                <span
                  className={`inline-block w-3 h-3 rounded-sm ${
                    factor.severity === "Mild"
                      ? "bg-purple-400"
                      : factor.severity === "Moderate"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                  }`}
                />
              )}
              <span className="text-gray-600">
                {factor.severity ? factor.severity : "Normal"} • {factor.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredAreas.map((area, index) => {
          // Calculate height based on score (min height 100px, max height 250px)
          const height = 100 + area.score * 1.5;

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full mb-2">
                <div
                  className={`w-full rounded-md ${area.isFocus ? "bg-green-500" : "bg-gray-100"}`}
                  style={{ height: `${height}px` }}
                >
                  {area.isFocus && (
                    <div className="absolute top-2 left-0 w-full flex justify-center">
                      <Star size={20} className="text-white fill-white" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium">
                    {area.score.toFixed(1)}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-center">{area.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunctionalAreas;
