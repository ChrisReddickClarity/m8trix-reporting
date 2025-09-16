import React, { useState } from "react";
import { Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    value?: string;
    severity?: "Mild" | "Moderate" | "Strong";
    status?: "Normal" | "High" | "Low";
    isFocus?: boolean;
  }[];
  focusArea?: string;
}

const FunctionalAreas = ({
  areas = [
    { name: "Sleep", score: 94.1, isFocus: true },
    { name: "Micronutrients", score: 89.4 },
    { name: "Cardiovascular", score: 88.8 },
    { name: "Cell health", score: 87.9 },
    { name: "Energy", score: 85.3 },
    { name: "Resilience", score: 82.5 },
    { name: "Stress", score: 81.6 },
    { name: "Inflammation", score: 80.9 },
    { name: "Toxic load", score: 80.8 },
    { name: "Hydration", score: 42.8 },
    { name: "Hormone profile", score: 41.4 },
    { name: "Brain chemistry", score: 38.1 },
    { name: "Gut health", score: 35.4 },
  ],
  impactFactors = [
    { name: "Metabolic imbalance", severity: "Moderate" },
    { name: "Biomarker", value: "4.4%", status: "Normal" },
    { name: "Biomarker", value: "4.4%", status: "Normal" },
    { name: "Biomarker", value: "27%", status: "Normal" },
  ],
  focusArea = "Sleep: 94.1%",
}: FunctionalAreasProps) => {
  const [filter, setFilter] = useState("All");

  // Sort areas by score in descending order
  const sortedAreas = [...areas].sort((a, b) => b.score - a.score);

  // Filter areas based on selected filter
  const filteredAreas = sortedAreas.filter((area) => {
    if (filter === "All") return true;
    if (filter === "High") return area.score >= 80;
    if (filter === "Low") return area.score < 80;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Functional areas</h2>
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

        <div className="flex rounded-full overflow-hidden border border-gray-200 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter("All")}
            className={`rounded-none px-4 py-1 ${filter === "All" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter("Low")}
            className={`rounded-none px-4 py-1 ${filter === "Low" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            Low
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter("High")}
            className={`rounded-none px-4 py-1 ${filter === "High" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            High
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-sm">4 impact factors for</span>
        <span className="ml-2 inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full">
          <Star size={16} className="text-green-500 fill-green-500 mr-1" />
          Sleep: 94.1%
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex flex-col">
          <span className="font-medium">Metabolic imbalance</span>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-yellow-400 mr-2"></span>
            <span className="text-gray-600">Moderate</span>
          </div>
        </div>

        {impactFactors.slice(1).map((factor, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-medium">{factor.name}</span>
            <div className="flex items-center">
              <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-purple-500 border-b-[6px] border-b-transparent mr-2"></span>
              <span className="text-gray-600">
                {factor.status} • {factor.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between h-[200px] mt-8 mb-4 relative">
        {filteredAreas.slice(0, 13).map((area, index) => {
          // Calculate height as a percentage of the container height (200px)
          // Scale the score to fit within the container height
          // For scores between 0-100, we'll map them to 10-100% of container height
          const heightPercentage = 10 + (area.score / 100) * 90; // Scale to 10-100%
          const heightPx = (heightPercentage / 100) * 200; // Convert percentage to pixels based on container height

          return (
            <div key={index} className="flex flex-col items-center w-[7%]">
              {area.isFocus && (
                <Star
                  size={16}
                  className="text-green-500 fill-green-500 absolute -top-6"
                />
              )}
              <div
                className={`w-full ${area.isFocus ? "bg-green-500" : "bg-gray-200"} rounded-t-md relative`}
                style={{ height: `${heightPx}px` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                  {area.score.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mt-2">
        {filteredAreas.slice(0, 13).map((area, index) => (
          <div
            key={index}
            className="w-[7%] text-center rotate-[60deg] origin-left whitespace-nowrap overflow-hidden"
          >
            {area.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionalAreas;
