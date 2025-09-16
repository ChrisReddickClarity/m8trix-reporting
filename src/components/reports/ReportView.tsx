import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Download,
  Printer,
  Activity,
  Heart,
  Brain,
  Dumbbell,
  Utensils,
  Pill,
} from "lucide-react";

/**
 * PRD Section: Report Generation
 *
 * Generate and display comprehensive health reports based on biomarker analysis.
 *
 * This component displays an HTML report of the user's health data, including:
 * - Biomarker analysis results
 * - Trend visualizations
 * - Personalized recommendations
 * - Health score and functional area summaries
 */

interface ReportViewProps {}

const ReportView: React.FC<ReportViewProps> = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // This would typically trigger a server-side HTML-to-PDF conversion
    // For now, we'll just show an alert
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <div className="print:hidden">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Health Report</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your biomarkers and health status
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </div>

      {/* Report Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 print:shadow-none">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src="/logo.webp" alt="Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold">Health Analytics Report</h1>
          </div>
          <Badge variant="outline">
            Generated: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p>John Doe</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Date of Birth
            </h3>
            <p>January 15, 1985</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Report Type
            </h3>
            <p>Comprehensive Biomarker Analysis</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Health Score
            </h3>
            <p className="font-bold">92.1%</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Biological Age
            </h3>
            <p>26.2 years (Chronological: 39)</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Test Date
            </h3>
            <p>February 12, 2024</p>
          </div>
        </div>
      </div>

      {/* Health Score Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Health Score Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center mb-6">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-green-500 border-r-transparent border-b-transparent"
                style={{
                  transform: `rotate(${(92.1 / 100) * 360 + 45}deg)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">92.1</span>
                <span className="text-sm text-muted-foreground">
                  Health Score
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Score Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Cardiovascular Health</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `88%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Metabolic Health</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `94%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Inflammation</span>
                    <span>81%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `81%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Hormone Balance</span>
                    <span>41%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `41%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Key Insights</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Your overall health score is in the top 1% for your age group
                </li>
                <li>
                  Your biological age is 12.8 years younger than your
                  chronological age
                </li>
                <li>Hormone balance is an area that requires attention</li>
                <li>
                  Your metabolic health is excellent, continue your current
                  practices
                </li>
                <li>
                  Consider focusing on sleep quality to further improve your
                  scores
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biomarker Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Biomarker Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Biomarker</th>
                  <th className="text-left py-2">Your Value</th>
                  <th className="text-left py-2">Normal Range</th>
                  <th className="text-left py-2">Optimal Range</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">GGT</td>
                  <td className="py-2 font-medium">153 g/dL</td>
                  <td className="py-2">0-65 g/dL</td>
                  <td className="py-2">9-22 g/dL</td>
                  <td className="py-2">
                    <Badge variant="destructive">Out of range</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">RBC</td>
                  <td className="py-2 font-medium">5.63 x10E6/uL</td>
                  <td className="py-2">3.77-5.28 x10E6/uL</td>
                  <td className="py-2">4.3-4.8 x10E6/uL</td>
                  <td className="py-2">
                    <Badge variant="destructive">Out of range</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Hematocrit</td>
                  <td className="py-2 font-medium">48%</td>
                  <td className="py-2">34-46.6%</td>
                  <td className="py-2">35-42%</td>
                  <td className="py-2">
                    <Badge variant="destructive">Out of range</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Hemoglobin A1C</td>
                  <td className="py-2 font-medium">4.1%</td>
                  <td className="py-2">4.8-5.6%</td>
                  <td className="py-2">4.5-5.2%</td>
                  <td className="py-2">
                    <Badge variant="destructive">Out of range</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Total Cholesterol</td>
                  <td className="py-2 font-medium">243 mg/dL</td>
                  <td className="py-2">100-199 mg/dL</td>
                  <td className="py-2">170-199 mg/dL</td>
                  <td className="py-2">
                    <Badge variant="destructive">Out of range</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">DHEA-S</td>
                  <td className="py-2 font-medium">230 ug/dL</td>
                  <td className="py-2">160-449 ug/dL</td>
                  <td className="py-2">200-400 ug/dL</td>
                  <td className="py-2">
                    <Badge variant="secondary">Normal</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">C-Reactive Protein</td>
                  <td className="py-2 font-medium">0.31 mg/L</td>
                  <td className="py-2">0-3.0 mg/L</td>
                  <td className="py-2">0-1.0 mg/L</td>
                  <td className="py-2">
                    <Badge variant="default">Performance</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Lifestyle</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">Aerobic training</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Aim for 3-5 sessions per week of moderate intensity cardio
                    for 30-45 minutes.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800 border-none">
                    High impact
                  </Badge>
                </div>
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">Resistance training</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Include 2-3 sessions per week focusing on compound
                    movements.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800 border-none">
                    High impact
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Utensils className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Nutrition</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">Prioritize CoQ10 rich foods</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Include organ meats, fatty fish, and whole grains in your
                    diet.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800 border-none">
                    High impact
                  </Badge>
                </div>
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">Avoid processed foods</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Minimize consumption of ultra-processed foods and refined
                    sugars.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800 border-none">
                    High impact
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Pill className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Supplements</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">CoQ10</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Take 100mg daily with a meal containing fat for optimal
                    absorption.
                  </p>
                  <Badge className="bg-purple-100 text-purple-800 border-none">
                    Max impact
                  </Badge>
                </div>
                <div className="p-3 bg-white rounded-md border">
                  <h4 className="font-medium">Green Tea Extract</h4>
                  <p className="text-sm text-gray-600 my-2">
                    Supplement with 500mg daily in the morning.
                  </p>
                  <Badge className="bg-purple-100 text-purple-800 border-none">
                    Max impact
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Historical Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium mb-4">Health Score Progress</h3>
            <div className="h-60 bg-gray-50 p-4 rounded-md flex items-end justify-between">
              {/* Simple bar chart representation */}
              <div className="flex-1 flex items-end justify-around h-full">
                {[78.2, 82.5, 85.7, 89.3, 92.1].map((score, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-12 bg-green-500 rounded-t-md"
                      style={{ height: `${score * 0.5}%` }}
                    ></div>
                    <div className="mt-2 text-xs">
                      {
                        ["Feb '23", "May '23", "Aug '23", "Nov '23", "Feb '24"][
                          index
                        ]
                      }
                    </div>
                    <div className="text-xs font-medium">{score}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Key Biomarker Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  <Activity className="h-4 w-4 mr-2 text-red-500" />
                  <h4 className="font-medium">GGT</h4>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Trending upward (153 g/dL, +118 from baseline)
                </div>
                <div className="h-20 bg-gray-50 p-2 rounded-md flex items-end justify-between">
                  {[35, 42, 78, 110, 153].map((value, index) => (
                    <div
                      key={index}
                      className="w-8 bg-red-400 rounded-t-sm"
                      style={{ height: `${(value / 153) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  <Heart className="h-4 w-4 mr-2 text-green-500" />
                  <h4 className="font-medium">HbA1c</h4>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Trending downward (4.1%, -1.6 from baseline)
                </div>
                <div className="h-20 bg-gray-50 p-2 rounded-md flex items-end justify-between">
                  {[5.7, 5.5, 5.3, 5.2, 4.1].map((value, index) => (
                    <div
                      key={index}
                      className="w-8 bg-green-400 rounded-t-sm"
                      style={{ height: `${(value / 5.7) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Footer */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 print:shadow-none">
        <div className="text-center text-sm text-gray-500">
          <p>
            This report is for informational purposes only and does not
            constitute medical advice.
          </p>
          <p>
            Please consult with your healthcare provider before making any
            changes to your health regimen.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Health Analytics Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
