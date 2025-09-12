import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/**
 * PRD Section: View Historical Data
 *
 * Compare test results over time and track health score progress.
 *
 * This component allows users to view and analyze their historical health data, including:
 * - Comparing test results across multiple time periods
 * - Tracking health score progress over time
 * - Visualizing trends in biomarkers and functional areas
 * - Identifying patterns and improvements in health metrics
 */

interface HistoricalDataViewProps {}

const HistoricalDataView: React.FC<HistoricalDataViewProps> = () => {
  const [activeTab, setActiveTab] = useState("health-score");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1y");

  // Mock data for demonstration
  const healthScoreData = [
    { date: "Feb 2023", score: 78.2 },
    { date: "May 2023", score: 82.5 },
    { date: "Aug 2023", score: 85.7 },
    { date: "Nov 2023", score: 89.3 },
    { date: "Feb 2024", score: 92.1 },
  ];

  const biomarkerData = [
    {
      date: "Feb 2023",
      GGT: 35,
      HbA1c: 5.7,
      Testosterone: 250,
      Cholesterol: 220,
    },
    {
      date: "May 2023",
      GGT: 42,
      HbA1c: 5.5,
      Testosterone: 265,
      Cholesterol: 215,
    },
    {
      date: "Aug 2023",
      GGT: 78,
      HbA1c: 5.3,
      Testosterone: 280,
      Cholesterol: 210,
    },
    {
      date: "Nov 2023",
      GGT: 110,
      HbA1c: 5.2,
      Testosterone: 290,
      Cholesterol: 205,
    },
    {
      date: "Feb 2024",
      GGT: 153,
      HbA1c: 5.1,
      Testosterone: 310,
      Cholesterol: 200,
    },
  ];

  const functionalAreaData = [
    {
      date: "Feb 2023",
      Sleep: 72,
      Energy: 68,
      Cardiovascular: 75,
      Inflammation: 65,
    },
    {
      date: "May 2023",
      Sleep: 78,
      Energy: 75,
      Cardiovascular: 79,
      Inflammation: 72,
    },
    {
      date: "Aug 2023",
      Sleep: 83,
      Energy: 80,
      Cardiovascular: 84,
      Inflammation: 78,
    },
    {
      date: "Nov 2023",
      Sleep: 88,
      Energy: 85,
      Cardiovascular: 88,
      Inflammation: 84,
    },
    {
      date: "Feb 2024",
      Sleep: 94,
      Energy: 90,
      Cardiovascular: 92,
      Inflammation: 89,
    },
  ];

  const testDates = [
    { date: "February 12, 2024", label: "Latest" },
    { date: "November 5, 2023" },
    { date: "August 18, 2023" },
    { date: "May 3, 2023" },
    { date: "February 20, 2023" },
  ];

  const [selectedDates, setSelectedDates] = useState([
    testDates[0].date,
    testDates[1].date,
  ]);

  // Filter data based on selected timeframe
  const filterDataByTimeframe = (data) => {
    if (selectedTimeframe === "all") return data;
    if (selectedTimeframe === "1y") {
      return data.slice(-4); // Last year (4 quarters)
    }
    if (selectedTimeframe === "6m") {
      return data.slice(-2); // Last 6 months (2 quarters)
    }
    return data;
  };

  const filteredHealthScoreData = filterDataByTimeframe(healthScoreData);
  const filteredBiomarkerData = filterDataByTimeframe(biomarkerData);
  const filteredFunctionalAreaData = filterDataByTimeframe(functionalAreaData);

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Historical Data</h1>
          <p className="text-muted-foreground">
            Track your progress and compare results over time
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Select Dates
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Timeframe</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={selectedTimeframe === "6m" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("6m")}
              >
                6 Months
              </Button>
              <Button
                variant={selectedTimeframe === "1y" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("1y")}
              >
                1 Year
              </Button>
              <Button
                variant={selectedTimeframe === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("all")}
              >
                All Time
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5 cursor-pointer" />
                <span>Test dates:</span>
              </div>
              <div className="flex gap-2">
                {testDates.slice(0, 3).map((test, index) => (
                  <Badge
                    key={index}
                    variant={
                      selectedDates.includes(test.date) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedDates.includes(test.date)) {
                        setSelectedDates(
                          selectedDates.filter((d) => d !== test.date),
                        );
                      } else {
                        setSelectedDates([...selectedDates, test.date]);
                      }
                    }}
                  >
                    {test.date} {test.label && `(${test.label})`}
                  </Badge>
                ))}
                <ChevronRight className="h-5 w-5 cursor-pointer" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="health-score"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="health-score">Health Score</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
          <TabsTrigger value="functional-areas">Functional Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="health-score">
          <Card>
            <CardHeader>
              <CardTitle>Health Score Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredHealthScoreData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[60, 100]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Progress Summary</h3>
                <p className="text-muted-foreground">
                  Your health score has improved by{" "}
                  <span className="font-medium text-green-600">
                    {(
                      filteredHealthScoreData[
                        filteredHealthScoreData.length - 1
                      ].score - filteredHealthScoreData[0].score
                    ).toFixed(1)}
                  </span>{" "}
                  points over this period. The most significant improvements
                  were seen in Sleep and Cardiovascular functional areas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biomarkers">
          <Card>
            <CardHeader>
              <CardTitle>Biomarker Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredBiomarkerData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="GGT"
                      stroke="#ef4444"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="HbA1c"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Testosterone"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Cholesterol"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">GGT</div>
                  <div className="text-xl font-medium">
                    {
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .GGT
                    }
                  </div>
                  <div className="text-sm text-red-500">
                    +
                    {(
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .GGT - filteredBiomarkerData[0].GGT
                    ).toFixed(0)}{" "}
                    (Increasing)
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">HbA1c</div>
                  <div className="text-xl font-medium">
                    {
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .HbA1c
                    }
                  </div>
                  <div className="text-sm text-green-500">
                    {(
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .HbA1c - filteredBiomarkerData[0].HbA1c
                    ).toFixed(1)}{" "}
                    (Improving)
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Testosterone
                  </div>
                  <div className="text-xl font-medium">
                    {
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .Testosterone
                    }
                  </div>
                  <div className="text-sm text-green-500">
                    +
                    {(
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .Testosterone - filteredBiomarkerData[0].Testosterone
                    ).toFixed(0)}{" "}
                    (Improving)
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Cholesterol
                  </div>
                  <div className="text-xl font-medium">
                    {
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .Cholesterol
                    }
                  </div>
                  <div className="text-sm text-green-500">
                    {(
                      filteredBiomarkerData[filteredBiomarkerData.length - 1]
                        .Cholesterol - filteredBiomarkerData[0].Cholesterol
                    ).toFixed(0)}{" "}
                    (Improving)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functional-areas">
          <Card>
            <CardHeader>
              <CardTitle>Functional Area Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredFunctionalAreaData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[50, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Sleep"
                      stroke="#10b981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Energy"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Cardiovascular"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Inflammation"
                      stroke="#ef4444"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Sleep</div>
                  <div className="text-xl font-medium">
                    {
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Sleep
                    }
                    %
                  </div>
                  <div className="text-sm text-green-500">
                    +
                    {(
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Sleep - filteredFunctionalAreaData[0].Sleep
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Energy</div>
                  <div className="text-xl font-medium">
                    {
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Energy
                    }
                    %
                  </div>
                  <div className="text-sm text-green-500">
                    +
                    {(
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Energy - filteredFunctionalAreaData[0].Energy
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Cardiovascular
                  </div>
                  <div className="text-xl font-medium">
                    {
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Cardiovascular
                    }
                    %
                  </div>
                  <div className="text-sm text-green-500">
                    +
                    {(
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Cardiovascular -
                      filteredFunctionalAreaData[0].Cardiovascular
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Inflammation
                  </div>
                  <div className="text-xl font-medium">
                    {
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Inflammation
                    }
                    %
                  </div>
                  <div className="text-sm text-green-500">
                    +
                    {(
                      filteredFunctionalAreaData[
                        filteredFunctionalAreaData.length - 1
                      ].Inflammation -
                      filteredFunctionalAreaData[0].Inflammation
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalDataView;
