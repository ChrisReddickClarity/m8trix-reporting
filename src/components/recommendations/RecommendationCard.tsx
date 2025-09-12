import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Star, Sun, Moon, Utensils } from "lucide-react";

/**
 * A reusable component for displaying individual recommendations within the RecommendationsDashboard.
 * This component shows recommendation details including title, description, impact level,
 * status (added or not), and target biomarkers.
 */

interface RecommendationCardProps {
  recommendation: {
    title: string;
    description: string;
    impact: "high" | "max" | "moderate";
    added?: boolean;
    focus?: boolean;
    timeOfDay?: "am" | "pm" | "with food";
    category: "lifestyle" | "nutrition" | "supplements";
    targetBiomarkers?: string[];
  };
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-blue-100 text-blue-800";
      case "max":
        return "bg-purple-100 text-purple-800";
      case "moderate":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-4 bg-white border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{recommendation.title}</h3>
              {recommendation.focus && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {recommendation.description}
            </p>
          </div>
          <Button
            variant={recommendation.added ? "outline" : "default"}
            size="sm"
          >
            {recommendation.added ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Added
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`${getImpactBadgeColor(recommendation.impact)}`}>
              {recommendation.impact === "high" && "High impact"}
              {recommendation.impact === "max" && "Max impact"}
              {recommendation.impact === "moderate" && "Moderate impact"}
            </Badge>

            <Badge variant="outline" className="border-gray-200">
              {recommendation.category === "lifestyle" && (
                <Star className="h-3 w-3 mr-1" />
              )}
              {recommendation.category === "nutrition" && (
                <Utensils className="h-3 w-3 mr-1" />
              )}
              {recommendation.category === "supplements" && (
                <span className="mr-1">💊</span>
              )}
              {recommendation.category.charAt(0).toUpperCase() +
                recommendation.category.slice(1)}
            </Badge>

            {recommendation.timeOfDay && (
              <Badge variant="outline" className="border-gray-200">
                {recommendation.timeOfDay === "am" && (
                  <Sun className="h-3 w-3 mr-1" />
                )}
                {recommendation.timeOfDay === "pm" && (
                  <Moon className="h-3 w-3 mr-1" />
                )}
                {recommendation.timeOfDay === "with food" && (
                  <Utensils className="h-3 w-3 mr-1" />
                )}
                {recommendation.timeOfDay}
              </Badge>
            )}
          </div>

          {recommendation.targetBiomarkers && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground mb-1">
                Target biomarkers:
              </div>
              <div className="flex flex-wrap gap-1">
                {recommendation.targetBiomarkers.map((biomarker, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-gray-50"
                  >
                    {biomarker}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
