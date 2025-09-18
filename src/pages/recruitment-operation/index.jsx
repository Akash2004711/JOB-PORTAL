import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalControls from './components/GlobalControls';
import KPIStrip from './components/KPIStrip';
import RecruiterLeaderboard from './components/RecruiterLeaderboard';
import AlertFeed from './components/AlertFeed';
import JobPerformanceGrid from './components/JobPerformanceGrid';
import ConnectionStatus from './components/ConnectionStatus';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportControls from '../../components/ui/ExportControls';

const RecruitmentOperationsCommandCenter = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    autoRefresh: '15',
    activeJobFilter: 'all',
    recruiterTeam: 'all',
    alertThreshold: 'medium'
  });
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    // Set up auto-refresh based on filter settings
    if (filters?.autoRefresh !== 'off') {
      const interval = setInterval(() => {
        handleDataRefresh();
      }, parseInt(filters?.autoRefresh) * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [filters?.autoRefresh]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDataRefresh = async () => {
    // Simulate data refresh
    setLastRefresh(new Date());
    console.log('Data refreshed at:', new Date()?.toLocaleTimeString());
  };

  const handleExport = async (exportOptions) => {
    console.log('Exporting data:', exportOptions);
    // Simulate export process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6 space-y-6">
          {/* Global Controls */}
          <GlobalControls onFiltersChange={handleFiltersChange} />

          {/* Data Status Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <ConnectionStatus />
            <div className="flex items-center space-x-4">
              <DataRefreshIndicator 
                lastUpdated={lastRefresh}
                isLive={filters?.autoRefresh !== 'off'}
                onRefresh={handleDataRefresh}
              />
              <ExportControls 
                currentView="operations"
                onExport={handleExport}
              />
            </div>
          </div>

          {/* KPI Strip */}
          <KPIStrip />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area - 12 cols equivalent */}
            <div className="xl:col-span-3 space-y-6">
              <RecruiterLeaderboard />
              <JobPerformanceGrid />
            </div>

            {/* Right Panel - 4 cols equivalent */}
            <div className="xl:col-span-1">
              <AlertFeed />
            </div>
          </div>

          {/* Mobile Tab Navigation Hint */}
          <div className="lg:hidden">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Mobile Navigation</h4>
                  <p className="text-xs text-muted-foreground">Swipe between sections or use bottom navigation</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-primary rounded"></div>
                <div className="flex-1 h-2 bg-muted rounded"></div>
                <div className="flex-1 h-2 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruitmentOperationsCommandCenter;