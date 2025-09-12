import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import BiomarkerCard from "@/components/biomarkers/BiomarkerCard";

/**
 * PRD Section: Biomarker Results Summary
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component displays a summary of biomarker results with visual indicators for
 * out-of-range values. It allows users to filter biomarkers by status (out-of-range,
 * normal, performance) and provides a quick overview of the user's biomarker health.
 */

interface Biomarker {
  name: string;
  value: string;
  unit: string;
  status: "normal" | "out-of-range" | "performance";
  normalRange: string;
  performanceRange: string;
  description?: string;
}

interface BiomarkerResultsSummaryProps {
  biomarkers?: Biomarker[];
  title?: string;
  showViewAll?: boolean;
  maxDisplay?: number;
  onViewAll?: () => void;
  onBiomarkerClick?: (biomarker: Biomarker) => void;
}

const BiomarkerResultsSummary: React.FC<BiomarkerResultsSummaryProps> = ({
  biomarkers = [
    {
      name: "GGT",
      value: "153",
      unit: "g/dL",
      status: "out-of-range",
      normalRange: "0-65 g/dL",
      performanceRange: "9-22 g/dL",
      description:
        "Gamma-glutamyl transferase is an enzyme found in many tissues, particularly the liver.",
    },
    {
      name: "RBC",
      value: "5.63",
      unit: "x10E6/uL",
      status: "out-of-range",
      normalRange: "3.77-5.28 x10E6/uL",
      performanceRange: "4.3-4.8 x10E6/uL",
      description:
        "Red blood cells carry oxygen from your lungs to the rest of your body.",
    },
    {
      name: "Hematocrit",
      value: "48",
      unit: "%",
      status: "out-of-range",
      normalRange: "34-46.6 %",
      performanceRange: "35-42 %",
      description:
        "Hematocrit is the percentage of your blood that is made up of red blood cells.",
    },
    {
      name: "Hemoglobin A1C",
      value: "4.1",
      unit: "%",
      status: "out-of-range",
      normalRange: "4.8-5.6 %",
      performanceRange: "4.5-5.2 %",
      description:
        "HbA1c measures average blood sugar levels over the past 2-3 months.",
    },
    {
      name: "Total Cholesterol",
      value: "243",
      unit: "mg/dL",
      status: "out-of-range",
      normalRange: "100-199 mg/dL",
      performanceRange: "170-199 mg/dL",
      description:
        "Total cholesterol is the overall amount of cholesterol in your blood.",
    },
    {
      name: "DHEA-S",
      value: "230",
      unit: "ug/dL",
      status: "normal",
      normalRange: "160-449 ug/dL",
      performanceRange: "200-400 ug/dL",
      description:
        "Dehydroepiandrosterone sulfate is a hormone that supports various bodily functions.",
    },
    {
      name: "C-Reactive Protein",
      value: "0.31",
      unit: "mg/L",
      status: "performance",
      normalRange: "0-3.0 mg/L",
      performanceRange: "0-1.0 mg/L",
      description: "CRP is a marker of inflammation in the body.",
    },
  ],
  title = "Biomarker Results",
  showViewAll = true,
  maxDisplay = 6,
  onViewAll = () => {},
  onBiomarkerClick = () => {},
}) => {
  const [filter, setFilter] = useState<
    "all" | "out-of-range" | "normal" | "performance"
  >("all");

  // Calculate counts for each status
  const outOfRangeCount = biomarkers.filter(
    (b) => b.status === "out-of-range",
  ).length;
  const normalCount = biomarkers.filter((b) => b.status === "normal").length;
  const performanceCount = biomarkers.filter(
    (b) => b.status === "performance",
  ).length;

  // Filter biomarkers based on selected filter
  const filteredBiomarkers = biomarkers.filter((biomarker) => {
    if (filter === "all") return true;
    return biomarker.status === filter;
  });

  // Calculate health score based on biomarker statuses
  const calculateHealthScore = () => {
    const totalBiomarkers = biomarkers.length;
    const performanceWeight = 1.2;
    const normalWeight = 1.0;
    const outOfRangeWeight = 0.5;

    const weightedSum =
      performanceCount * performanceWeight +
      normalCount * normalWeight +
      outOfRangeCount * outOfRangeWeight;

    return Math.round((weightedSum / totalBiomarkers) * 100);
  };

  const healthScore = calculateHealthScore();

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex gap-2">
          <Tabs
            defaultValue="all"
            value={filter}
            onValueChange={(value) => setFilter(value as any)}
          >
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                All ({biomarkers.length})
              </TabsTrigger>
              <TabsTrigger value="out-of-range" className="text-xs">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                Out of range ({outOfRangeCount})
              </TabsTrigger>
              <TabsTrigger value="normal" className="text-xs">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                Normal ({normalCount})
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Performance ({performanceCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-green-500 border-r-transparent border-b-transparent"
              style={{
                transform: `rotate(${(healthScore / 100) * 360 + 45}deg)`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{healthScore}</span>
              <span className="text-sm text-muted-foreground">
                Biomarker Score
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBiomarkers.slice(0, maxDisplay).map((biomarker, index) => (
            <div key={index} onClick={() => onBiomarkerClick(biomarker)}>
              <BiomarkerCard
                name={biomarker.name}
                value={biomarker.value}
                unit={biomarker.unit}
                status={biomarker.status}
                normalRange={biomarker.normalRange}
                performanceRange={biomarker.performanceRange}
                description={biomarker.description}
              />
            </div>
          ))}
        </div>

        {showViewAll && filteredBiomarkers.length > maxDisplay && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={onViewAll}
              className="flex items-center"
            >
              View all {filteredBiomarkers.length} biomarkers
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BiomarkerResultsSummary;
