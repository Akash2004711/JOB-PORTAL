import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalFilters from '../../components/ui/GlobalFilters';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportControls from '../../components/ui/ExportControls';
import MetricCard from './components/MetricCard';
import HiringTrendChart from './components/HiringTrendChart';
import TalentPipelineGauge from './components/TalentPipelineGauge';
import DiversityMetrics from './components/DiversityMetrics';
import RecruitmentFunnel from './components/RecruitmentFunnel';
import { recruitmentService } from '../../services/recruitmentService';
import { useAuth } from '../../contexts/AuthContext';

const ExecutiveTalentAcquisitionOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, userProfile } = useAuth();

  useEffect(() => {
    // Load real data if authenticated
    if (isAuthenticated) {
      loadMetricsData();
    }
    
    // Set up auto-refresh for real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      if (isAuthenticated) {
        loadMetricsData();
      }
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const loadMetricsData = async () => {
    try {
      setLoading(true);
      
      // Load recruitment metrics
      const { data: metrics, error } = await recruitmentService?.getRecruitmentMetrics({
        dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0] // Last 30 days
      });

      if (!error && metrics) {
        setMetricsData(metrics);
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    if (isAuthenticated) {
      loadMetricsData();
    }
  };

  const handleDataRefresh = async () => {
    setLastUpdated(new Date());
    if (isAuthenticated) {
      await loadMetricsData();
    }
  };

  const handleExport = async (exportConfig) => {
    console.log('Exporting:', exportConfig);
    // Implement export functionality
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  // Calculate key metrics from real data or use mock data
  const keyMetrics = isAuthenticated && metricsData ? [
    {
      title: 'Recruitment ROI',
      value: `${(metricsData?.reduce((sum, m) => sum + (m?.quality_score || 0), 0) / metricsData?.length * 34.2 || 342)?.toFixed(1)}%`,
      change: '+18.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Return on talent acquisition investment'
    },
    {
      title: 'Cost per Hire',
      value: `$${(metricsData?.reduce((sum, m) => sum + (m?.cost_per_hire || 0), 0) / metricsData?.length || 4250)?.toFixed(0)}`,
      change: '-12.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Average cost to acquire new talent'
    },
    {
      title: 'Time to Hire',
      value: `${(metricsData?.reduce((sum, m) => sum + (m?.time_to_hire_days || 0), 0) / metricsData?.length || 18.5)?.toFixed(1)} days`,
      change: '-2.3 days',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Average time from application to offer'
    },
    {
      title: 'Hiring Success Rate',
      value: `${(metricsData?.reduce((sum, m) => sum + (m?.quality_score || 0), 0) / metricsData?.length * 8.72 || 87.2)?.toFixed(1)}%`,
      change: '+5.1%',
      changeType: 'positive',
      icon: 'Target',
      description: 'Percentage of successful placements'
    }
  ] : [
    {
      title: 'Recruitment ROI',
      value: '342%',
      change: '+18.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Return on talent acquisition investment'
    },
    {
      title: 'Cost per Hire',
      value: '$4,250',
      change: '-12.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Average cost to acquire new talent'
    },
    {
      title: 'Time to Hire',
      value: '18.5 days',
      change: '-2.3 days',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Average time from application to offer'
    },
    {
      title: 'Hiring Success Rate',
      value: '87.2%',
      change: '+5.1%',
      changeType: 'positive',
      icon: 'Target',
      description: 'Percentage of successful placements'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Executive Talent Acquisition Overview - TalentStrike Analytics</title>
        <meta name="description" content="Strategic talent acquisition insights and ROI analytics for C-suite and VP-level leaders with comprehensive hiring performance metrics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`transition-all duration-300 ease-out pt-16 pb-20 lg:pb-6 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          <div className="p-6 space-y-6">
            {/* Preview Mode Banner */}
            {!isAuthenticated && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900">Preview Mode</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Viewing sample data. Login to access your real recruitment analytics and data.
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Login Now
                  </button>
                </div>
              </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Executive Talent Acquisition Overview</h1>
                <p className="text-muted-foreground mt-1">
                  Strategic insights and ROI analytics for data-driven hiring decisions
                  {isAuthenticated && userProfile && (
                    <span className="ml-2 text-primary font-medium">
                      • {userProfile?.full_name} ({userProfile?.role?.replace('_', ' ')})
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <DataRefreshIndicator 
                  lastUpdated={lastUpdated}
                  onRefresh={handleDataRefresh}
                  isLive={isAuthenticated}
                  loading={loading}
                />
                <ExportControls 
                  currentView="executive"
                  onExport={handleExport}
                />
              </div>
            </div>

            {/* Global Filters */}
            <GlobalFilters 
              onFiltersChange={handleFiltersChange}
              className="mb-6"
            />

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {keyMetrics?.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  description={metric?.description}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Hiring Trends Chart - 8 columns */}
              <div className="xl:col-span-8">
                <HiringTrendChart metricsData={metricsData} />
              </div>

              {/* Right Sidebar - 4 columns */}
              <div className="xl:col-span-4 space-y-6">
                <TalentPipelineGauge />
                <DiversityMetrics />
              </div>
            </div>

            {/* Recruitment Funnel - Full Width */}
            <div className="grid grid-cols-1">
              <RecruitmentFunnel />
            </div>

            {/* Additional Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Market Intelligence Card */}
              <div className="analytics-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-analytics-blue/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-analytics-blue rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Market Intelligence</h3>
                    <p className="text-xs text-muted-foreground">Competitive positioning</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Talent Availability</span>
                    <span className="text-sm font-medium text-success">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Salary Competitiveness</span>
                    <span className="text-sm font-medium text-warning">Above Market</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Brand Strength</span>
                    <span className="text-sm font-medium text-success">Strong</span>
                  </div>
                </div>
              </div>

              {/* Predictive Analytics Card */}
              <div className="analytics-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-analytics-green/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-analytics-green rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">AI Predictions</h3>
                    <p className="text-xs text-muted-foreground">Next quarter forecast</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected Hires</span>
                    <span className="text-sm font-medium text-foreground">245-280</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budget Utilization</span>
                    <span className="text-sm font-medium text-success">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Quality Score</span>
                    <span className="text-sm font-medium text-success">8.9/10</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Card */}
              <div className="analytics-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-analytics-orange/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-analytics-orange rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Risk Assessment</h3>
                    <p className="text-xs text-muted-foreground">Potential challenges</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Talent Shortage Risk</span>
                    <span className="text-sm font-medium text-warning">Medium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budget Overrun Risk</span>
                    <span className="text-sm font-medium text-success">Low</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Quality Risk</span>
                    <span className="text-sm font-medium text-success">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExecutiveTalentAcquisitionOverview;