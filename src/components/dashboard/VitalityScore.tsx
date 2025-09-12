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
    <Card className="bg-background w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium">Vitality Score</h2>

            <div className="flex items-baseline">
              <span className="text-6xl font-bold">{score}%</span>
            </div>

            <div className="relative w-full h-4 mt-2">
              <div className="absolute w-full h-full bg-gray-200 rounded-full"></div>
              <div
                className="absolute h-full bg-green-500 rounded-full"
                style={{ width: `${score}%` }}
              ></div>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              {percentile}th percentile for men {chronologicalAge}-39 years old
            </p>

            <div className="flex items-center mt-1">
              <span className="text-sm font-medium">Biological age:</span>
              <span className="text-sm ml-1">{biologicalAge}y</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Focus:</h3>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area, index) => (
                <Badge
                  key={index}
                  variant={area.isPrimary ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  {area.isPrimary && <Star className="h-3 w-3" />}
                  {area.name}: {area.score}%
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
