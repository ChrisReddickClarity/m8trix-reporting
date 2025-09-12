import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MainLayout from "./components/layout/MainLayout";
import BiomarkerDetailView from "./components/biomarkers/BiomarkerDetailView";
import RecommendationsDashboard from "./components/recommendations/RecommendationsDashboard";
import HealthEducationHub from "./components/education/HealthEducationHub";
import HistoricalDataView from "./components/dashboard/HistoricalDataView";
import UserSettings from "./components/settings/UserSettings";
import routes from "tempo-routes";

/**
 * Health Analytics Dashboard with Personalized Recommendations
 *
 * A comprehensive health analytics platform that transforms biomarker data into actionable insights
 * and personalized recommendations, helping users optimize their health and performance through
 * targeted lifestyle, nutrition, and supplement interventions.
 */
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="biomarker/:id" element={<BiomarkerDetailView />} />
          <Route
            path="recommendations"
            element={<RecommendationsDashboard />}
          />
          <Route path="education" element={<HealthEducationHub />} />
          <Route path="history" element={<HistoricalDataView />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
