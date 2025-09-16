import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "node_modules/pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

/**
 * PRD Section: Report Generation
 *
 * Generate and display comprehensive health reports based on biomarker analysis.
 *
 * This component displays a PDF report of the user's health data, including:
 * - Biomarker analysis results
 * - Trend visualizations
 * - Personalized recommendations
 * - Health score and functional area summaries
 */

interface ReportViewProps {}

const ReportView: React.FC<ReportViewProps> = () => {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(numPages || 1, newPageNumber));
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleDownload = () => {
    // Create a link to download the PDF
    const link = document.createElement("a");
    link.href = "/report.pdf";
    link.download = "health-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // Open the PDF in a new window for printing
    const printWindow = window.open("/report.pdf", "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background">
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

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Report Details</CardTitle>
            <Badge variant="outline">
              Generated: {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Name
              </h3>
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          {isLoading && (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          <div className="flex justify-center">
            <Document
              file="/report.pdf"
              loading={
                <div className="flex justify-center items-center h-[600px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              error={
                <div className="text-center text-red-500">
                  Failed to load PDF. Please check the console for more details.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="border shadow-sm"
                width={Math.min(window.innerWidth * 0.8, 800)}
              />
            </Document>
          </div>

          {numPages && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={previousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>

              <p className="text-sm">
                Page {pageNumber} of {numPages}
              </p>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={pageNumber >= (numPages || 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportView;
