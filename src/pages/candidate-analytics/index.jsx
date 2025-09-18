import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalFilters from '../../components/ui/GlobalFilters';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportControls from '../../components/ui/ExportControls';
import CandidateMetricsOverview from './components/CandidateMetricsOverview';
import AdvancedFilters from './components/AdvancedFilters';
import CredibilityScatterPlot from './components/CredibilityScatterPlot';
import SkillsDemandTrending from './components/SkillsDemandTrending';
import CandidateJourneyMapping from './components/CandidateJourneyMapping';
import PredictiveModelingPanel from './components/PredictiveModelingPanel';
import CohortComparisonTool from './components/CohortComparisonTool';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CandidateAnalyticsIntelligenceHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [globalFilters, setGlobalFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock metrics data
  const metricsData = {
    avgCredibilityScore: 84.7,
    credibilityChange: '+2.3%',
    badgeDistribution: 73,
    badgeChange: '+5.1%',
    profileCompleteness: 89,
    completenessChange: '+1.8%',
    aiMatchingAccuracy: 91,
    matchingChange: '+3.2%'
  };

  // Mock saved filters
  const savedFilters = [
    { name: 'Senior Developers', filters: { skillsTaxonomy: 'backend', experienceLevel: 'senior', credibilityThreshold: '85' } },
    { name: 'High Potential Juniors', filters: { experienceLevel: 'entry', credibilityThreshold: '80', timeframe: '90d' } },
    { name: 'Remote Candidates', filters: { location: 'remote', timeframe: '30d' } }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleExport = async (exportOptions) => {
    console.log('Exporting data:', exportOptions);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleCandidateClick = (candidateData) => {
    setSelectedCandidate(candidateData);
  };

  const handleFiltersChange = (filters) => {
    setGlobalFilters(filters);
    console.log('Filters updated:', filters);
  };

  return (
    <>
      <Helmet>
        <title>Candidate Analytics & Intelligence Hub - TalentStrike Analytics</title>
        <meta name="description" content="Comprehensive candidate performance insights and AI-driven matching analytics for recruitment optimization" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />

        {/* Main Content */}
        <main className={`pt-16 pb-20 lg:pb-4 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          <div className="p-6 max-w-[1920px] mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Candidate Analytics & Intelligence Hub</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive candidate performance insights and AI-driven matching analytics
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <DataRefreshIndicator
                  lastUpdated={lastUpdated}
                  isLive={true}
                  onRefresh={handleRefresh}
                />
                <ExportControls
                  currentView="candidates"
                  onExport={handleExport}
                />
              </div>
            </div>

            {/* Global Filters */}
            <GlobalFilters 
              onFiltersChange={handleFiltersChange}
              className="mb-6"
            />

            {/* Advanced Filters */}
            <AdvancedFilters 
              onFiltersChange={handleFiltersChange}
              savedFilters={savedFilters}
            />

            {/* Metrics Overview */}
            <CandidateMetricsOverview metrics={metricsData} />

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              {/* Primary Visualization - Credibility Scatter Plot */}
              <div className="xl:col-span-2">
                <CredibilityScatterPlot onCandidateClick={handleCandidateClick} />
              </div>

              {/* Skills Demand Trending */}
              <div className="xl:col-span-1">
                <SkillsDemandTrending />
              </div>
            </div>

            {/* Journey Mapping */}
            <div className="mb-8">
              <CandidateJourneyMapping />
            </div>

            {/* Advanced Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              {/* Predictive Modeling */}
              <PredictiveModelingPanel />

              {/* Cohort Comparison */}
              <CohortComparisonTool />
            </div>

            {/* Batch Processing Indicator */}
            <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">
                  Batch processing active - Next update in 28 minutes
                </span>
                <Button variant="ghost" size="sm" iconName="Info" iconPosition="left">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Candidate Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCandidate(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <div className="font-medium text-foreground">{selectedCandidate?.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Experience Level</label>
                    <div className="font-medium text-foreground capitalize">{selectedCandidate?.experience}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Credibility Score</label>
                    <div className="font-medium text-foreground">{selectedCandidate?.credibilityScore}/100</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Success Rate</label>
                    <div className="font-medium text-foreground">{selectedCandidate?.hiringSuccessRate}%</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Applications</label>
                    <div className="font-medium text-foreground">{selectedCandidate?.applications}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Skills</label>
                    <div className="font-medium text-foreground">{selectedCandidate?.skills}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm">View Full Profile</Button>
                    <Button variant="outline" size="sm">Contact Candidate</Button>
                    <Button variant="ghost" size="sm">Add to Shortlist</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateAnalyticsIntelligenceHub;