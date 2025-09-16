import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  ArrowLeft,
  Calendar,
  Download,
  Check,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * PRD Section: Detailed Biomarker Analysis
 *
 * Detailed biomarker analysis with trend visualization, showing historical changes and
 * providing educational context about each marker.
 *
 * This component provides an in-depth view of a specific biomarker, including:
 * - Current and historical values
 * - Trend visualization through charts
 * - Educational context about the biomarker
 * - Reference and optimal ranges
 * - Related biomarkers and impact on functional areas
 */

interface BiomarkerDetailViewProps {}

const BiomarkerDetailView: React.FC<BiomarkerDetailViewProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const biomarkerData = {
    name: "GGT",
    fullName: "Gamma-Glutamyl Transferase",
    value: "153",
    unit: "g/dL",
    status: "out-of-range",
    normalRange: "0-65 g/dL",
    performanceRange: "9-22 g/dL",
    description:
      "GGT is an enzyme found in many tissues, particularly the liver. It's often used as a marker for liver health and alcohol consumption.",
    impact: [
      { area: "Liver Health", score: 65 },
      { area: "Detoxification", score: 72 },
      { area: "Inflammation", score: 80 },
    ],
    relatedBiomarkers: [
      { name: "ALT", value: "22", status: "normal" },
      { name: "AST", value: "25", status: "normal" },
      { name: "Bilirubin", value: "0.8", status: "normal" },
    ],
    historicalData: [
      { date: "Feb 2023", value: 35 },
      { date: "May 2023", value: 42 },
      { date: "Aug 2023", value: 78 },
      { date: "Nov 2023", value: 110 },
      { date: "Feb 2024", value: 153 },
    ],
    recommendations: [
      "Reduce alcohol consumption",
      "Support liver health with milk thistle",
      "Increase glutathione production with NAC supplementation",
      "Improve diet quality and reduce processed foods",
    ],
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold">{biomarkerData.name}</h1>
            <Badge
              variant={
                biomarkerData.status === "out-of-range"
                  ? "destructive"
                  : "default"
              }
              className="text-sm"
            >
              {biomarkerData.status === "out-of-range"
                ? "Out of range"
                : "Normal"}
            </Badge>
          </div>
          <h2 className="text-xl text-muted-foreground mb-6">
            {biomarkerData.fullName}
          </h2>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-4xl font-bold">
                        {biomarkerData.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {biomarkerData.unit}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Reference Ranges</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">
                          Normal Range
                        </div>
                        <div className="font-medium">
                          {biomarkerData.normalRange}
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-md">
                        <div className="text-sm text-muted-foreground">
                          Performance Range
                        </div>
                        <div className="font-medium">
                          {biomarkerData.performanceRange}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">
                      Impact on Functional Areas
                    </h3>
                    <div className="space-y-3">
                      {biomarkerData.impact.map((area, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span>{area.area}</span>
                            <span>{area.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${area.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Related Biomarkers</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {biomarkerData.relatedBiomarkers.map((marker, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-md flex flex-col"
                        >
                          <div className="font-medium">{marker.name}</div>
                          <div className="text-lg">{marker.value}</div>
                          <Badge
                            variant={
                              marker.status === "out-of-range"
                                ? "destructive"
                                : "secondary"
                            }
                            className="mt-2 self-start"
                          >
                            {marker.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={biomarkerData.historicalData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Trend Analysis</h3>
                    <p className="text-muted-foreground">
                      Your GGT levels have been steadily increasing over the
                      past year, with a significant jump in the last 6 months.
                      This trend suggests increasing stress on your liver
                      function and detoxification pathways.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About GGT</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{biomarkerData.description}</p>
                    <h3 className="font-medium">What GGT Measures</h3>
                    <p>
                      GGT is primarily used to detect liver disease and bile
                      duct issues. It's also a sensitive indicator of alcohol
                      consumption and can reflect oxidative stress in the body.
                    </p>
                    <h3 className="font-medium">Elevated GGT</h3>
                    <p>
                      Elevated GGT levels may indicate liver damage, bile duct
                      obstruction, alcohol consumption, certain medications,
                      pancreatic disease, or heart failure.
                    </p>
                    <h3 className="font-medium">Low GGT</h3>
                    <p>
                      Low GGT levels are generally not a concern and may
                      actually be associated with better health outcomes in some
                      studies.
                    </p>
                    <h3 className="font-medium">Optimal Range</h3>
                    <p>
                      While the normal reference range is 0-65 g/dL, optimal
                      health is associated with levels between 9-22 g/dL.
                      Maintaining GGT in this range is linked to better
                      long-term health outcomes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Based on your elevated GGT levels, here are personalized
                      recommendations to help improve this biomarker:
                    </p>
                    <ul className="space-y-2">
                      {biomarkerData.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 p-3 border rounded-md"
                        >
                          <div className="mt-1 bg-green-100 p-1 rounded-full">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>{rec}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex justify-end">
                      <Button>Add to My Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    What is it?
                  </h3>
                  <p>An enzyme primarily found in the liver and bile ducts</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    What does it do?
                  </h3>
                  <p>
                    Helps metabolize drugs and environmental toxins; involved in
                    glutathione metabolism
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Why is it important?
                  </h3>
                  <p>
                    Elevated levels may indicate liver damage, alcohol use, or
                    medication effects
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Connected to
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">Liver Health</Badge>
                    <Badge variant="outline">Detoxification</Badge>
                    <Badge variant="outline">Alcohol Metabolism</Badge>
                    <Badge variant="outline">Oxidative Stress</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BiomarkerDetailView;
