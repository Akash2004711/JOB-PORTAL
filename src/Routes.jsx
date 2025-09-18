import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Import existing pages
import ExecutiveTalentAcquisitionOverview from './pages/executive-talent-acquisition-overview';
import RecruitmentOperationsCommandCenter from './pages/recruitment-operations-command-center';
import CandidateAnalyticsIntelligenceHub from './pages/candidate-analytics-intelligence-hub';
import GamificationPerformanceDashboard from './pages/gamification-performance-dashboard';
import NotFound from './pages/NotFound';

// Import new auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Auth Routes - Accessible to all for preview mode */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes - Preview mode (accessible without auth for demo) */}
          <Route path="/" element={<ExecutiveTalentAcquisitionOverview />} />
          <Route path="/executive-talent-acquisition-overview" element={<ExecutiveTalentAcquisitionOverview />} />
          <Route path="/recruitment-operations-command-center" element={<RecruitmentOperationsCommandCenter />} />
          <Route path="/candidate-analytics-intelligence-hub" element={<CandidateAnalyticsIntelligenceHub />} />
          <Route path="/gamification-performance-dashboard" element={<GamificationPerformanceDashboard />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;