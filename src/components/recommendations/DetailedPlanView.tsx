import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Download,
  Calendar,
  Star,
  Utensils,
  Pill,
  Info,
  CheckCircle2,
  Circle,
} from "lucide-react";
import RecommendationCard from "./RecommendationCard";

/**
 * PRD Section: Personalized Recommendations - Detailed Plan View
 *
 * This component provides a detailed view of the user's personalized health plan,
 * allowing them to:
 * - View all recommendations across lifestyle, nutrition, and supplement categories
 * - Save their personalized plan
 * - Track progress on implementing recommendations
 * - Receive guidance on implementation priority and timing
 */

interface DetailedPlanViewProps {}

const DetailedPlanView: React.FC<DetailedPlanViewProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for demonstration
  const recommendations = {
    lifestyle: [
      {
        title: "Aerobic training",
        description:
          "Research has shown that multiple aerobic training models have elicited positive results. For optimal results, aim for 3-5 sessions per week.",
        impact: "high",
        added: true,
        category: "lifestyle",
        targetBiomarkers: ["HbA1c", "Triglycerides", "HDL Cholesterol"],
        progress: 75,
        implementationSteps: [
          { text: "Schedule 3-5 sessions per week", completed: true },
          { text: "Start with 20-30 minutes per session", completed: true },
          { text: "Gradually increase to 45-60 minutes", completed: false },
          { text: "Maintain heart rate at 65-75% of max", completed: false },
        ],
      },
      {
        title: "Resistance training",
        description:
          "Research has shown that multiple resistance training models have elicited positive results. For optimal results, aim for 2-3 sessions per week.",
        impact: "high",
        added: true,
        focus: true,
        category: "lifestyle",
        targetBiomarkers: ["Testosterone", "DHEA-S", "Cortisol"],
        progress: 50,
        implementationSteps: [
          { text: "Schedule 2-3 sessions per week", completed: true },
          { text: "Focus on compound movements", completed: true },
          { text: "Progressively increase weight", completed: false },
          { text: "Ensure proper recovery between sessions", completed: false },
        ],
      },
      {
        title: "Perform breathwork and/or meditation",
        description:
          "Sit down and calmly focus on your breath while box breathing for up to five minutes.",
        impact: "high",
        added: true,
        category: "lifestyle",
        targetBiomarkers: ["Cortisol", "CRP", "IL-6"],
        progress: 25,
        implementationSteps: [
          { text: "Set aside 5-10 minutes daily", completed: true },
          { text: "Practice box breathing technique", completed: false },
          { text: "Gradually increase to 15-20 minutes", completed: false },
          { text: "Track stress levels before and after", completed: false },
        ],
      },
    ],
    nutrition: [
      {
        title: "Prioritize CoQ10 rich foods",
        description:
          "Eat at least one serving of CoQ10 rich foods like organ meats, sea food and lentils daily.",
        impact: "high",
        added: true,
        category: "nutrition",
        targetBiomarkers: ["CoQ10", "ATP", "Oxidized LDL"],
        progress: 100,
        implementationSteps: [
          { text: "Identify CoQ10 rich food sources", completed: true },
          { text: "Include at least one serving daily", completed: true },
          { text: "Monitor energy levels after consumption", completed: true },
          { text: "Adjust serving size based on response", completed: true },
        ],
      },
      {
        title: "Prioritize fatty fish",
        description:
          "Consume fatty fish like salmon, mackerel, or sardines at least twice per week for optimal omega-3 intake.",
        impact: "moderate",
        added: true,
        category: "nutrition",
        targetBiomarkers: ["Omega-3 Index", "EPA", "DHA"],
        progress: 50,
        implementationSteps: [
          { text: "Purchase wild-caught fatty fish", completed: true },
          { text: "Consume at least twice weekly", completed: true },
          { text: "Vary preparation methods", completed: false },
          { text: "Track omega-3 levels quarterly", completed: false },
        ],
      },
      {
        title: "Avoid processed foods",
        description:
          "Monitor consumption of processed foods and avoid if possible.",
        impact: "high",
        added: true,
        category: "nutrition",
        targetBiomarkers: ["CRP", "IL-6", "TNF-alpha"],
        progress: 25,
        implementationSteps: [
          { text: "Identify processed foods in diet", completed: true },
          { text: "Replace with whole food alternatives", completed: false },
          { text: "Meal prep to avoid convenience foods", completed: false },
          { text: "Read labels for hidden additives", completed: false },
        ],
      },
    ],
    supplements: [
      {
        title: "CoQ10",
        description: "Supplement with at least 100mg of CoQ10 daily.",
        impact: "max",
        added: true,
        category: "supplements",
        targetBiomarkers: ["CoQ10", "ATP", "Oxidized LDL"],
        progress: 100,
        timeOfDay: "am",
        implementationSteps: [
          { text: "Purchase high-quality CoQ10 supplement", completed: true },
          { text: "Take 100mg daily with breakfast", completed: true },
          { text: "Monitor energy levels", completed: true },
          { text: "Retest CoQ10 levels after 3 months", completed: true },
        ],
      },
      {
        title: "Green Tea Extract",
        description:
          "Supplement with at least 500mg of green tea extract daily.",
        impact: "max",
        added: true,
        focus: true,
        timeOfDay: "am",
        category: "supplements",
        targetBiomarkers: ["Antioxidant Status", "EGCG", "Oxidized LDL"],
        progress: 75,
        implementationSteps: [
          { text: "Purchase standardized green tea extract", completed: true },
          { text: "Take 500mg daily in the morning", completed: true },
          { text: "Monitor for caffeine sensitivity", completed: true },
          {
            text: "Assess antioxidant status after 3 months",
            completed: false,
          },
        ],
      },
      {
        title: "Astragalus",
        description: "Supplement with at least 1g of astragalus daily.",
        impact: "high",
        added: true,
        category: "supplements",
        targetBiomarkers: ["Immune Function", "NK Cell Activity", "WBC Count"],
        progress: 0,
        implementationSteps: [
          { text: "Research quality astragalus supplements", completed: false },
          { text: "Start with 500mg daily for one week", completed: false },
          { text: "Increase to 1g daily if well tolerated", completed: false },
          { text: "Monitor immune function markers", completed: false },
        ],
      },
    ],
  };

  // Combine all recommendations into a single array
  const allRecommendations = [
    ...recommendations.lifestyle,
    ...recommendations.nutrition,
    ...recommendations.supplements,
  ];

  // Filter recommendations based on active tab
  const filteredRecommendations =
    activeTab === "all"
      ? allRecommendations
      : recommendations[activeTab as keyof typeof recommendations];

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalProgress = allRecommendations.reduce(
      (sum, rec) => sum + rec.progress,
      0,
    );
    return Math.round(totalProgress / allRecommendations.length);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recommendations
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Health Plan</h1>
          <p className="text-muted-foreground">
            Track your progress and manage your personalized recommendations
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> History
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Plan
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray={`${overallProgress * 2.83} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{overallProgress}%</span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {allRecommendations.filter((r) => r.progress === 100).length} of{" "}
                {allRecommendations.length} recommendations completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Implementation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-black" />
                    <h3 className="font-medium">Lifestyle</h3>
                  </div>
                  <Badge variant="outline">
                    {recommendations.lifestyle.length} items
                  </Badge>
                </div>
                <Progress
                  value={
                    recommendations.lifestyle.reduce(
                      (sum, rec) => sum + rec.progress,
                      0,
                    ) / recommendations.lifestyle.length
                  }
                  className="h-2 mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {
                    recommendations.lifestyle.filter((r) => r.progress === 100)
                      .length
                  }{" "}
                  completed,{" "}
                  {
                    recommendations.lifestyle.filter(
                      (r) => r.progress > 0 && r.progress < 100,
                    ).length
                  }{" "}
                  in progress
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-black" />
                    <h3 className="font-medium">Nutrition</h3>
                  </div>
                  <Badge variant="outline">
                    {recommendations.nutrition.length} items
                  </Badge>
                </div>
                <Progress
                  value={
                    recommendations.nutrition.reduce(
                      (sum, rec) => sum + rec.progress,
                      0,
                    ) / recommendations.nutrition.length
                  }
                  className="h-2 mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {
                    recommendations.nutrition.filter((r) => r.progress === 100)
                      .length
                  }{" "}
                  completed,{" "}
                  {
                    recommendations.nutrition.filter(
                      (r) => r.progress > 0 && r.progress < 100,
                    ).length
                  }{" "}
                  in progress
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-black" />
                    <h3 className="font-medium">Supplements</h3>
                  </div>
                  <Badge variant="outline">
                    {recommendations.supplements.length} items
                  </Badge>
                </div>
                <Progress
                  value={
                    recommendations.supplements.reduce(
                      (sum, rec) => sum + rec.progress,
                      0,
                    ) / recommendations.supplements.length
                  }
                  className="h-2 mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {
                    recommendations.supplements.filter(
                      (r) => r.progress === 100,
                    ).length
                  }{" "}
                  completed,{" "}
                  {
                    recommendations.supplements.filter(
                      (r) => r.progress > 0 && r.progress < 100,
                    ).length
                  }{" "}
                  in progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Lifestyle
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" /> Nutrition
          </TabsTrigger>
          <TabsTrigger value="supplements" className="flex items-center gap-2">
            <Pill className="h-4 w-4" /> Supplements
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {filteredRecommendations.map((recommendation, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">
                    {recommendation.title}
                  </CardTitle>
                  {recommendation.focus && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      recommendation.impact === "high"
                        ? "bg-blue-100 text-blue-800"
                        : recommendation.impact === "max"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {recommendation.impact === "high" && "High impact"}
                    {recommendation.impact === "max" && "Max impact"}
                    {recommendation.impact === "moderate" && "Moderate impact"}
                  </Badge>
                  {recommendation.timeOfDay && (
                    <Badge variant="outline">
                      {recommendation.timeOfDay === "am" && "Morning"}
                      {recommendation.timeOfDay === "pm" && "Evening"}
                      {recommendation.timeOfDay === "with food" && "With food"}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {recommendation.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    Implementation Progress
                  </span>
                  <span className="text-sm">{recommendation.progress}%</span>
                </div>
                <Progress value={recommendation.progress} className="h-2" />
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">
                  Implementation Steps
                </h4>
                <div className="space-y-2">
                  {recommendation.implementationSteps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                    >
                      {step.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                      <span
                        className={`${step.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Target Biomarkers</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.targetBiomarkers.map(
                    (biomarker, bioIndex) => (
                      <Badge key={bioIndex} variant="outline">
                        {biomarker}
                      </Badge>
                    ),
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-1" /> Details
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" /> Update Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Save Plan <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailedPlanView;
