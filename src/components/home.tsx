import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Settings,
  Star,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VitalityScore from "./dashboard/VitalityScore";
import FunctionalAreas from "./dashboard/FunctionalAreas";
import BiomarkerResultsSummary from "./dashboard/BiomarkerResultsSummary";
import { useNavigate } from "react-router-dom";

/**
 * PRD Section: Main Dashboard View
 *
 * Interactive dashboard displaying overall health score, functional areas (sleep, energy,
 * cardiovascular health, etc.), and biomarker results with clear visual indicators for
 * out-of-range values.
 *
 * This component serves as the main entry point for the application, displaying a comprehensive
 * overview of the user's health status including:
 * - Overall health/vitality score
 * - Functional areas performance
 * - Biomarker results summary with out-of-range indicators
 * - Performance plan recommendations
 */

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [bloodDrawDate, setBloodDrawDate] = useState("August 2, 2024");

  // Mock data for biomarkers that are out of range
  const outOfRangeBiomarkers = [
    {
      name: "GGT",
      value: "153",
      unit: "g/dL",
      status: "out-of-range",
      normalRange: "0-65 g/dL",
      performanceRange: "9-22 g/dL",
    },
    {
      name: "RBC",
      value: "5.63",
      unit: "x10E6/uL",
      status: "out-of-range",
      normalRange: "3.77-5.28 x10E6/uL",
      performanceRange: "4.3-4.8 x10E6/uL",
    },
    {
      name: "Hematocrit",
      value: "48",
      unit: "%",
      status: "out-of-range",
      normalRange: "34-46.6 %",
      performanceRange: "35-42 %",
    },
    {
      name: "Hemoglobin A1C",
      value: "4.1",
      unit: "%",
      status: "out-of-range",
      normalRange: "4.8-5.6 %",
      performanceRange: "4.5-5.2 %",
    },
    {
      name: "Total Cholesterol",
      value: "243",
      unit: "mg/dL",
      status: "out-of-range",
      normalRange: "100-199 mg/dL",
      performanceRange: "170-199 mg/dL",
    },
  ];

  // Mock data for performance plan recommendations
  const recommendations = {
    lifestyle: [
      {
        title: "Aerobic training",
        description:
          "Research has shown that multiple aerobic training models have elicited positive results.",
        impact: "High impact",
        added: true,
      },
      {
        title: "Resistance training",
        description:
          "Research has shown that multiple resistance training models have elicited positive results.",
        impact: "High impact",
        added: true,
        focus: true,
      },
      {
        title: "Perform breathwork and/or meditation",
        description:
          "Sit down and calmly focus on your breath while box breathing for up to five minutes.",
        impact: "High impact",
        added: false,
      },
    ],
    nutrition: [
      {
        title: "Prioritize CoQ10 rich foods",
        description:
          "Eat at least one serving of CoQ10 rich foods like organ meats, sea food and lentils daily.",
        impact: "High impact",
        added: true,
      },
      {
        title: "Avoid coffee",
        description: "Monitor and limit coffee intake.",
        impact: "High impact",
        added: false,
      },
      {
        title: "Avoid processed foods",
        description:
          "Monitor consumption of processed foods and avoid if possible.",
        impact: "High impact",
        added: false,
      },
    ],
    supplements: [
      {
        title: "CoQ10",
        description: "Supplement with at least 1 g of berberine daily.",
        impact: "Max impact",
        added: true,
      },
      {
        title: "Green Tea Extract",
        description: "Supplement with at least 500 mg of green tea extract.",
        impact: "Max impact",
        added: true,
        focus: true,
      },
      {
        title: "Astragalus",
        description: "Supplement with at least 1 g of astragalus daily.",
        impact: "High impact",
        added: false,
      },
    ],
  };

  // Mock data for performance plan targets
  const performanceTargets = [
    { name: "LDL Cholesterol", status: "out-of-range", selected: true },
    { name: "Reverse T3", status: "out-of-range", selected: false },
    { name: "Total Cholesterol", status: "out-of-range", selected: false },
    { name: "RBC", status: "out-of-range", selected: false },
  ];

  // Mock data for impact factors
  const impactFactors = [
    { name: "Metabolic imbalance", severity: "Mild" },
    { name: "Testosterone Total", value: "277 ng/dL", status: "Normal" },
    { name: "Hemoglobin A1C", value: "5.4%", status: "Normal" },
    { name: "DHEA-S", value: "230 ug/dL", status: "Normal" },
  ];

  const renderBiomarkerCard = (biomarker) => {
    return (
      <Card key={biomarker.name} className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{biomarker.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div className="text-4xl font-bold">{biomarker.value}</div>
            <div className="text-sm text-muted-foreground">
              {biomarker.unit}
            </div>
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
              <div>{biomarker.normalRange}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Performance range:</div>
              <div>{biomarker.performanceRange}</div>
            </div>
          </div>
          <div className="mt-2">
            <Badge
              variant={
                biomarker.status === "out-of-range" ? "destructive" : "default"
              }
              className="flex items-center gap-1"
            >
              {biomarker.status === "out-of-range" ? (
                <>
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  Out of range
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Normal
                </>
              )}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRecommendationCard = (recommendation, category) => {
    return (
      <Card
        key={recommendation.title}
        className="mb-4 border-l-4 border-l-green-500"
      >
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{recommendation.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {recommendation.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {recommendation.added && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <span className="mr-1">✓</span> Added
                </Badge>
              )}
              <Badge variant="secondary">{recommendation.impact}</Badge>
              {recommendation.focus && <Badge variant="outline">Focus</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src="/vite.svg" alt="Vitality Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Vitality</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
            <span className="font-medium">Vitality score: 92.1%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-black text-white rounded-full p-1 inline-flex">
          <Button variant="ghost" className="text-white rounded-full">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-white rounded-full">
            Bloodwork
          </Button>
          <Button variant="ghost" className="text-white rounded-full">
            Performance
          </Button>
          <Button variant="ghost" className="text-white rounded-full">
            Education
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="mb-6"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-end mb-4">
        <div className="flex items-center border rounded-md p-2">
          <Calendar className="mr-2 h-4 w-4" />
          <Select defaultValue={bloodDrawDate} onValueChange={setBloodDrawDate}>
            <SelectTrigger className="border-0 p-0 h-auto">
              <SelectValue placeholder="Blood draw date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="August 2, 2024">
                Blood draw: August 2, 2024
              </SelectItem>
              <SelectItem value="May 2, 2024">
                Blood draw: May 2, 2024
              </SelectItem>
              <SelectItem value="February 12, 2024">
                Blood draw: February 12, 2024
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div>
          <Card className="mb-6 bg-background">
            <CardHeader>
              <CardTitle className="text-xl">Vitality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <VitalityScore
                score={92.1}
                percentile={99}
                biologicalAge={26.2}
              />
              <div className="mt-4">
                <h3 className="font-medium mb-2">Focus:</h3>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Sleep: 94.1%
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 text-purple-500" /> Muscle size
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Performance Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ChevronLeft className="h-5 w-5" />
                  <span>1/8</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
              <div className="mb-4">
                <Badge className="mb-2 bg-purple-100 text-purple-800">
                  <Star className="h-3 w-3 mr-1" /> Muscle size
                </Badge>
                <h3 className="font-medium mb-2">Supporting biomarkers:</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">DHEA-S</div>
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span className="text-sm">Normal • 230 ug/dL</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Cortisol</div>
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span className="text-sm">Normal • 8.8 ug/dL</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">C-Reactive Protein</div>
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-sm">Performance • 0.31 mg/L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle column */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Functional Areas</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-black text-white"
                >
                  All
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Low
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  High
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm">
                <span>4 impact factors for</span>
                <Badge className="ml-2 bg-green-100 text-green-800 flex items-center gap-1">
                  <Star className="h-3 w-3" /> Sleep: 94.1%
                </Badge>
              </div>
              <FunctionalAreas />
              <div className="mt-6 space-y-4">
                {impactFactors.map((factor, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="font-medium">{factor.name}</div>
                    {factor.severity && (
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span className="text-sm">{factor.severity}</span>
                      </div>
                    )}
                    {factor.value && (
                      <div className="flex items-center">
                        {factor.status === "Normal" ? (
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        ) : (
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        )}
                        <span className="text-sm">
                          {factor.status} • {factor.value}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <BiomarkerResultsSummary
            biomarkers={outOfRangeBiomarkers}
            title="Biomarkers"
            maxDisplay={4}
            onViewAll={() => navigate("/biomarker/all")}
            onBiomarkerClick={(biomarker) =>
              navigate(
                `/biomarker/${biomarker.name.toLowerCase().replace(" ", "-")}`,
              )
            }
          />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Performance Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-500 mb-4">LIFESTYLE (7)</h3>
              <div className="space-y-4">
                {recommendations.lifestyle.map((rec) =>
                  renderRecommendationCard(rec, "lifestyle"),
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-4">NUTRITION (7)</h3>
              <div className="space-y-4">
                {recommendations.nutrition.map((rec) =>
                  renderRecommendationCard(rec, "nutrition"),
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-4">
                SUPPLEMENTS (5)
              </h3>
              <div className="space-y-4">
                {recommendations.supplements.map((rec) =>
                  renderRecommendationCard(rec, "supplements"),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline">Back</Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/plan")}
        >
          Review plan <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Home;
