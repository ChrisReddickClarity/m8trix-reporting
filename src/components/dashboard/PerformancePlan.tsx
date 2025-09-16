import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecommendationProps {
  title: string;
  description: string;
  impact: "High impact" | "Max impact" | "Moderate impact";
  category: "lifestyle" | "nutrition" | "supplements";
  contraindicated?: boolean;
}

interface PerformancePlanProps {
  lifestyle?: RecommendationProps[];
  nutrition?: RecommendationProps[];
  supplements?: RecommendationProps[];
}

const PerformancePlan: React.FC<PerformancePlanProps> = ({
  lifestyle = [
    {
      title: "Avoid allergens and irritants",
      description:
        "Understand any allergens or irritants (such as pollens, foods, or other substances) personal to you.",
      impact: "High impact",
      category: "lifestyle",
    },
    {
      title: "Perform breathwork and/or meditation",
      description:
        "Sit down and calmly focus on your breath while box breathing for up to five minutes.",
      impact: "High impact",
      category: "lifestyle",
    },
    {
      title: "Eat fatty fish at restaurants",
      description:
        "When dining out, choose fatty fish options like salmon or mackerel.",
      impact: "Moderate impact",
      category: "lifestyle",
    },
  ],
  nutrition = [
    {
      title: "Avoid coffee",
      description: "Monitor and limit coffee intake.",
      impact: "High impact",
      category: "nutrition",
    },
    {
      title: "Avoid processed foods",
      description:
        "Monitor consumption of processed foods and avoid if possible.",
      impact: "High impact",
      category: "nutrition",
    },
    {
      title: "Incorporate tart cherry juice",
      description:
        "Add tart cherry juice to your diet for its anti-inflammatory properties.",
      impact: "Moderate impact",
      category: "nutrition",
    },
  ],
  supplements = [
    {
      title: "Astragalus",
      description: "Supplement with at least 1 g of astragalus daily.",
      impact: "High impact",
      category: "supplements",
      contraindicated: true,
    },
    {
      title: "Avoid chloride supplements",
      description: "Supplement with at least 1 g of astragalus daily.",
      impact: "High impact",
      category: "supplements",
      contraindicated: true,
    },
    {
      title: "Avoid soy-based supplements",
      description:
        "Avoid supplements that contain soy as a primary ingredient.",
      impact: "High impact",
      category: "supplements",
    },
  ],
}) => {
  const renderRecommendation = (recommendation: RecommendationProps) => (
    <div className="mb-4 bg-white rounded-xl p-4 shadow-sm">
      <h4 className="font-medium">{recommendation.title}</h4>
      <p className="text-sm text-gray-600 my-2">{recommendation.description}</p>
      <div className="flex items-center justify-between mt-2">
        <Badge className="bg-blue-100 text-blue-800 border-none">
          {recommendation.impact}
        </Badge>
        {recommendation.contraindicated && (
          <div className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
            <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="bg-gray-50 rounded-3xl overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">Performance Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-gray-500 font-medium mb-4">LIFESTYLE (7)</h3>
            {lifestyle.map((rec, index) => (
              <div key={index}>{renderRecommendation(rec)}</div>
            ))}
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4">NUTRITION (7)</h3>
            {nutrition.map((rec, index) => (
              <div key={index}>{renderRecommendation(rec)}</div>
            ))}
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4">SUPPLEMENTS (5)</h3>
            {supplements.map((rec, index) => (
              <div key={index}>{renderRecommendation(rec)}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformancePlan;
