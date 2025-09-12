import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, BookOpen, FileText, Play } from "lucide-react";

/**
 * PRD Section: Health Education Hub
 *
 * Educational content with biomarker information and health optimization guides.
 *
 * This component serves as a central repository for educational content, including:
 * - Detailed information about biomarkers and their significance
 * - Health optimization guides across various functional areas
 * - Video tutorials and educational resources
 * - Searchable knowledge base for quick reference
 */

interface HealthEducationHubProps {}

const HealthEducationHub: React.FC<HealthEducationHubProps> = () => {
  const [activeTab, setActiveTab] = useState("biomarkers");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const educationalContent = {
    biomarkers: [
      {
        title: "Understanding GGT",
        description:
          "Learn about Gamma-Glutamyl Transferase and its role in liver health.",
        category: "Liver Health",
        type: "article",
        readTime: "5 min",
      },
      {
        title: "Hemoglobin A1C Explained",
        description:
          "What your A1C levels mean for blood sugar control and diabetes risk.",
        category: "Metabolic Health",
        type: "article",
        readTime: "7 min",
      },
      {
        title: "Cholesterol: The Good, The Bad, The Misunderstood",
        description:
          "A deep dive into cholesterol markers and what they really mean for cardiovascular health.",
        category: "Cardiovascular",
        type: "video",
        duration: "12 min",
      },
      {
        title: "Testosterone and Hormonal Balance",
        description:
          "Understanding testosterone's role in overall health for both men and women.",
        category: "Hormones",
        type: "article",
        readTime: "8 min",
      },
    ],
    guides: [
      {
        title: "Optimizing Sleep Quality",
        description:
          "Evidence-based strategies to improve sleep quality and duration.",
        category: "Sleep",
        type: "guide",
        steps: 5,
      },
      {
        title: "Building Resilience to Stress",
        description:
          "Practical techniques to strengthen your body's response to stress.",
        category: "Stress Management",
        type: "guide",
        steps: 7,
      },
      {
        title: "Nutrition for Metabolic Health",
        description:
          "Dietary approaches to optimize insulin sensitivity and metabolic function.",
        category: "Nutrition",
        type: "guide",
        steps: 6,
      },
      {
        title: "Exercise for Longevity",
        description:
          "Movement patterns that promote healthspan and lifespan extension.",
        category: "Fitness",
        type: "video",
        duration: "15 min",
      },
    ],
  };

  // Filter content based on search query
  const filteredContent = {
    biomarkers: educationalContent.biomarkers.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    guides: educationalContent.guides.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  };

  const renderContentCard = (item: any, index: number) => (
    <Card
      key={index}
      className="cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
          <div>
            {item.type === "article" && (
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            )}
            {item.type === "video" && (
              <div className="bg-red-100 p-2 rounded-full">
                <Play className="h-5 w-5 text-red-600" />
              </div>
            )}
            {item.type === "guide" && (
              <div className="bg-green-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Badge variant="outline">{item.category}</Badge>
          <div className="text-xs text-muted-foreground">
            {item.readTime && `Read: ${item.readTime}`}
            {item.duration && `Watch: ${item.duration}`}
            {item.steps && `${item.steps} steps`}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Health Education Hub</h1>
        <p className="text-muted-foreground">
          Learn about biomarkers, health optimization, and personalized
          strategies
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  All Categories
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Liver Health
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Metabolic Health
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Cardiovascular
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Hormones
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Sleep
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Stress Management
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Nutrition
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  Fitness
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Content Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="articles"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="articles" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Articles
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="videos"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="videos" className="flex items-center">
                    <Play className="h-4 w-4 mr-2 text-red-600" /> Videos
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="guides"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="guides" className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" /> Guides
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for topics, biomarkers, or health areas..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            defaultValue="biomarkers"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="biomarkers">
                Biomarker Information
              </TabsTrigger>
              <TabsTrigger value="guides">
                Health Optimization Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="biomarkers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContent.biomarkers.length > 0 ? (
                  filteredContent.biomarkers.map((item, index) =>
                    renderContentCard(item, index),
                  )
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">
                      No biomarker information found matching your search
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContent.guides.length > 0 ? (
                  filteredContent.guides.map((item, index) =>
                    renderContentCard(item, index),
                  )
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">
                      No health guides found matching your search
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HealthEducationHub;
