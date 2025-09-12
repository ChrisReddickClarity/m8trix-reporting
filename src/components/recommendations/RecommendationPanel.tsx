import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Clock,
  Focus,
  Sun,
  Moon,
  Utensils,
  Pill,
  Info,
  Star,
  ChevronRight,
} from "lucide-react";

/**
 * PRD Section: Personalized Recommendations
 *
 * Personalized recommendation engine that generates targeted plans across lifestyle, nutrition,
 * and supplement categories based on biomarker analysis.
 *
 * This component displays recommendations across lifestyle, nutrition, and supplement categories,
 * allowing users to view and manage their personalized health plan. It shows impact levels,
 * implementation status, and detailed information for each recommendation.
 */

interface RecommendationProps {
  title: string;
  description: string;
  impact: "high" | "max" | "moderate";
  added?: boolean;
  focus?: boolean;
  timeOfDay?: "am" | "pm" | "with food";
}

interface RecommendationPanelProps {
  lifestyle?: RecommendationProps[];
  nutrition?: RecommendationProps[];
  supplements?: RecommendationProps[];
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  lifestyle = [
    {
      title: "Aerobic training",
      description:
        "Research has shown that multiple aerobic training models have elicited positive results. For optimal results, aim for 3-5 sessions per week.",
      impact: "high",
      added: true,
    },
    {
      title: "Resistance training",
      description:
        "Research has shown that multiple resistance training models have elicited positive results. For optimal results, aim for 2-3 sessions per week.",
      impact: "high",
      added: true,
      focus: true,
    },
    {
      title: "Perform breathwork and/or meditation",
      description:
        "Sit down and calmly focus on your breath while box breathing for up to five minutes.",
      impact: "high",
    },
  ],
  nutrition = [
    {
      title: "Prioritize CoQ10 rich foods",
      description:
        "Eat at least one serving of CoQ10 rich foods like organ meats, sea food and lentils daily.",
      impact: "high",
      added: true,
    },
    {
      title: "Prioritize fatty fish",
      description:
        "Consume fatty fish like salmon, mackerel, or sardines at least twice per week for optimal omega-3 intake.",
      impact: "moderate",
    },
    {
      title: "Avoid processed foods",
      description:
        "Monitor consumption of processed foods and avoid if possible.",
      impact: "high",
    },
  ],
  supplements = [
    {
      title: "CoQ10",
      description: "Supplement with at least 100mg of CoQ10 daily.",
      impact: "max",
      added: true,
    },
    {
      title: "Green Tea Extract",
      description: "Supplement with at least 500mg of green tea extract daily.",
      impact: "max",
      added: true,
      focus: true,
      timeOfDay: "am",
    },
    {
      title: "Astragalus",
      description: "Supplement with at least 1g of astragalus daily.",
      impact: "high",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("lifestyle");

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

  const renderRecommendationCard = (recommendation: RecommendationProps) => (
    <Card
      key={recommendation.title}
      className="mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {recommendation.title}
          </CardTitle>
          {recommendation.focus && (
            <Badge
              variant="outline"
              className="ml-2 border-gray-300 text-gray-700"
            >
              <Focus className="h-3 w-3 mr-1" /> Focus
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm text-gray-600 mt-1">
          {recommendation.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 pb-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {recommendation.added && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Check className="h-3 w-3 mr-1" /> Added
            </Badge>
          )}
          <Badge className={`${getImpactBadgeColor(recommendation.impact)}`}>
            {recommendation.impact === "high" && "High impact"}
            {recommendation.impact === "max" && "Max impact"}
            {recommendation.impact === "moderate" && "Moderate impact"}
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
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Info className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recommendations</h2>
        <Button variant="outline" className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Preferences</span>
        </Button>
      </div>

      <Tabs
        defaultValue="lifestyle"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>
              LIFESTYLE {lifestyle.length > 0 && `(${lifestyle.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>
              NUTRITION {nutrition.length > 0 && `(${nutrition.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="supplements" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span>
              SUPPLEMENTS {supplements.length > 0 && `(${supplements.length})`}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lifestyle" className="mt-0">
          {lifestyle.map(renderRecommendationCard)}
        </TabsContent>

        <TabsContent value="nutrition" className="mt-0">
          {nutrition.map(renderRecommendationCard)}
        </TabsContent>

        <TabsContent value="supplements" className="mt-0">
          {supplements.map(renderRecommendationCard)}
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="flex justify-between items-center">
        <Button variant="outline">Back</Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Review plan <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationPanel;
