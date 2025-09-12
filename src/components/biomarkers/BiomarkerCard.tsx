import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * PRD Section: Biomarker Results Summary
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component displays individual biomarker cards with current values, reference ranges,
 * and visual indicators for out-of-range values. It provides a quick summary of each biomarker's
 * status and importance.
 */

interface BiomarkerCardProps {
  name: string;
  value: string;
  unit: string;
  status: "normal" | "out-of-range" | "performance";
  normalRange: string;
  performanceRange: string;
  description?: string;
  onClick?: () => void;
}

const BiomarkerCard: React.FC<BiomarkerCardProps> = ({
  name,
  value,
  unit,
  status,
  normalRange,
  performanceRange,
  description,
  onClick,
}) => {
  return (
    <Card
      className="bg-white cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-4xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{unit}</div>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="relative w-full">
              <div className="absolute inset-0">
                <div className="flex">
                  <div className="bg-red-200 h-2 flex-1 rounded-l-full"></div>
                  <div className="bg-blue-200 h-2 flex-1"></div>
                  <div className="bg-green-200 h-2 flex-1"></div>
                  <div className="bg-yellow-200 h-2 flex-1"></div>
                  <div className="bg-red-200 h-2 flex-1 rounded-r-full"></div>
                </div>
              </div>
              <div
                className="absolute h-4 w-4 bg-black rounded-full top-1/2 transform -translate-y-1/2"
                style={{ left: "80%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-muted-foreground">Normal range:</div>
            <div>{normalRange}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Performance range:</div>
            <div>{performanceRange}</div>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="mt-2">
          <Badge
            variant={
              status === "out-of-range"
                ? "destructive"
                : status === "performance"
                  ? "default"
                  : "secondary"
            }
            className="flex items-center gap-1"
          >
            {status === "out-of-range" ? (
              <>
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                Out of range
              </>
            ) : status === "performance" ? (
              <>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Performance
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                Normal
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomarkerCard;
