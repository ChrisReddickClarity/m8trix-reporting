import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Clock,
  Filter,
  Star,
  Utensils,
  Pill,
  ArrowLeft,
  Download,
  Calendar,
  ChevronRight,
  FileText,
} from "lucide-react";
import RecommendationPanel from "./RecommendationPanel";
import RecommendationCard from "./RecommendationCard";

/**
 * PRD Section: Personalized Recommendation Engine
 *
 * Personalized recommendation engine that generates targeted plans across lifestyle, nutrition,
 * and supplement categories based on biomarker analysis.
 *
 * This component serves as the main dashboard for all personalized recommendations,
 * organizing them by category (lifestyle, nutrition, supplements) and allowing users to:
 * - View all recommendations in one place
 * - Filter and sort recommendations by various criteria
 * - Track implementation progress
 * - Save recommendations to their personal plan
 * - Access detailed information about each recommendation
 */

interface RecommendationsDashboardProps {}

const RecommendationsDashboard: React.FC<
  RecommendationsDashboardProps
> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
      },
      {
        title: "Perform breathwork and/or meditation",
        description:
          "Sit down and calmly focus on your breath while box breathing for up to five minutes.",
        impact: "high",
        added: false,
        category: "lifestyle",
        targetBiomarkers: ["Cortisol", "CRP", "IL-6"],
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
      },
      {
        title: "Prioritize fatty fish",
        description:
          "Consume fatty fish like salmon, mackerel, or sardines at least twice per week for optimal omega-3 intake.",
        impact: "moderate",
        added: false,
        category: "nutrition",
        targetBiomarkers: ["Omega-3 Index", "EPA", "DHA"],
      },
      {
        title: "Avoid processed foods",
        description:
          "Monitor consumption of processed foods and avoid if possible.",
        impact: "high",
        added: false,
        category: "nutrition",
        targetBiomarkers: ["CRP", "IL-6", "TNF-alpha"],
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
      },
      {
        title: "Astragalus",
        description: "Supplement with at least 1g of astragalus daily.",
        impact: "high",
        added: false,
        category: "supplements",
        targetBiomarkers: ["Immune Function", "NK Cell Activity", "WBC Count"],
      },
    ],
  };

  // Combine all recommendations into a single array
  const allRecommendations = [
    ...recommendations.lifestyle,
    ...recommendations.nutrition,
    ...recommendations.supplements,
  ];

  // Filter recommendations based on active tab and filter status
  const filteredRecommendations = allRecommendations.filter((rec) => {
    if (activeTab !== "all" && rec.category !== activeTab) return false;
    if (filterStatus === "added" && !rec.added) return false;
    if (filterStatus === "not-added" && rec.added) return false;
    if (filterStatus === "focus" && !rec.focus) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized recommendations based on your biomarker analysis
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> History
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/report")}
          >
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> Save Plan
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 mb-2">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="lifestyle">
                        <Star className="h-4 w-4 mr-1" /> Lifestyle
                      </TabsTrigger>
                    </TabsList>
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="nutrition">
                        <Utensils className="h-4 w-4 mr-1" /> Nutrition
                      </TabsTrigger>
                      <TabsTrigger value="supplements">
                        <Pill className="h-4 w-4 mr-1" /> Supplements
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={filterStatus === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("all")}
                      className="justify-start"
                    >
                      <Filter className="h-4 w-4 mr-2" /> All
                    </Button>
                    <Button
                      variant={filterStatus === "added" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("added")}
                      className="justify-start"
                    >
                      <Check className="h-4 w-4 mr-2" /> Added to plan
                    </Button>
                    <Button
                      variant={
                        filterStatus === "not-added" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setFilterStatus("not-added")}
                      className="justify-start"
                    >
                      Not added
                    </Button>
                    <Button
                      variant={filterStatus === "focus" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("focus")}
                      className="justify-start"
                    >
                      <Star className="h-4 w-4 mr-2" /> Focus areas
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Impact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="max-impact"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="max-impact">
                        <Badge className="bg-purple-100 text-purple-800">
                          Max impact
                        </Badge>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="high-impact"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="high-impact">
                        <Badge className="bg-blue-100 text-blue-800">
                          High impact
                        </Badge>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="moderate-impact"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="moderate-impact">
                        <Badge className="bg-green-100 text-green-800">
                          Moderate impact
                        </Badge>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Total recommendations
                  </div>
                  <div className="text-2xl font-bold">
                    {allRecommendations.length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Added to plan
                  </div>
                  <div className="text-2xl font-bold">
                    {allRecommendations.filter((rec) => rec.added).length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Focus areas
                  </div>
                  <div className="text-2xl font-bold">
                    {allRecommendations.filter((rec) => rec.focus).length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {activeTab === "all"
                    ? "All Recommendations"
                    : activeTab === "lifestyle"
                      ? "Lifestyle Recommendations"
                      : activeTab === "nutrition"
                        ? "Nutrition Recommendations"
                        : "Supplement Recommendations"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredRecommendations.length} items
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecommendations.length > 0 ? (
                  filteredRecommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={index}
                      recommendation={recommendation}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No recommendations match your current filters
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate("/plan")}
            >
              Review plan <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsDashboard;
