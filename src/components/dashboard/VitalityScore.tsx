import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * PRD Section: Overall Health Score Display
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component specifically handles the overall health score (Vitality Score) display,
 * showing the user's current health score, percentile ranking, biological age comparison,
 * and focus areas for improvement.
 */

interface VitalityScoreProps {
  score?: number;
  percentile?: number;
  biologicalAge?: number;
  chronologicalAge?: number;
  focusAreas?: Array<{ name: string; score: number; isPrimary?: boolean }>;
}

const VitalityScore = ({
  score = 92.1,
  percentile = 99,
  biologicalAge = 26.2,
  chronologicalAge = 30,
  focusAreas = [
    { name: "Sleep", score: 94.1, isPrimary: true },
    { name: "Muscle size", score: 85.3, isPrimary: false },
  ],
}: VitalityScoreProps) => {
  return (
    <Card className="bg-white rounded-3xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Vitality score</h2>
            <div className="flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[80px] font-bold leading-none">{score}%</span>

            <div className="mt-2 mb-4">
              <div className="flex overflow-hidden h-2 w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[3px] mx-[0.5px] ${i < score ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600">
              {percentile}th percentile for men 30-39 years old
            </p>

            <div className="flex items-center mt-1">
              <span className="text-sm">Biological age:</span>
              <span className="text-sm ml-1 font-medium">{biologicalAge}y</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Focus:</h3>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${area.isPrimary ? "bg-green-100 text-green-800 border-green-200" : "bg-purple-100 text-purple-800 border-purple-200"}`}
                >
                  <Star
                    className={`h-4 w-4 ${area.isPrimary ? "text-green-500 fill-green-500" : "text-purple-500 fill-purple-500"}`}
                  />
                  <span>
                    {area.name}: {area.score}%
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalityScore;
