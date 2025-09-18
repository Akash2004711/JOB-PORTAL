import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const GlobalControls = ({ onFiltersChange }) => {
  const [autoRefresh, setAutoRefresh] = useState('15');
  const [activeJobFilter, setActiveJobFilter] = useState('all');
  const [recruiterTeam, setRecruiterTeam] = useState('all');
  const [alertThreshold, setAlertThreshold] = useState('medium');

  const refreshIntervals = [
    { value: '5', label: '5 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: 'off', label: 'Manual only' }
  ];

  const jobFilters = [
    { value: 'all', label: 'All Active Jobs' },
    { value: 'urgent', label: 'Urgent Positions' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales & Marketing' },
    { value: 'product', label: 'Product' },
    { value: 'operations', label: 'Operations' }
  ];

  const teamOptions = [
    { value: 'all', label: 'All Teams' },
    { value: 'senior', label: 'Senior Recruiters' },
    { value: 'junior', label: 'Junior Recruiters' },
    { value: 'specialists', label: 'Technical Specialists' },
    { value: 'coordinators', label: 'Coordinators' }
  ];

  const alertThresholds = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical Only' }
  ];

  const handleFilterChange = (key, value) => {
    const filters = { autoRefresh, activeJobFilter, recruiterTeam, alertThreshold };
    filters[key] = value;
    
    if (key === 'autoRefresh') setAutoRefresh(value);
    if (key === 'activeJobFilter') setActiveJobFilter(value);
    if (key === 'recruiterTeam') setRecruiterTeam(value);
    if (key === 'alertThreshold') setAlertThreshold(value);
    
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-analytics">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Main Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <Icon name="Command" size={20} color="var(--color-primary)" />
            <h2 className="text-lg font-semibold text-foreground">Operations Command Center</h2>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-xs font-medium text-success">Live Monitoring</span>
          </div>
        </div>

        {/* Right Section - Filter Controls */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Select
            label="Auto Refresh"
            options={refreshIntervals}
            value={autoRefresh}
            onChange={(value) => handleFilterChange('autoRefresh', value)}
            className="min-w-[120px]"
          />
          
          <Select
            label="Job Filter"
            options={jobFilters}
            value={activeJobFilter}
            onChange={(value) => handleFilterChange('activeJobFilter', value)}
            className="min-w-[140px]"
          />
          
          <Select
            label="Team"
            options={teamOptions}
            value={recruiterTeam}
            onChange={(value) => handleFilterChange('recruiterTeam', value)}
            className="min-w-[120px]"
          />
          
          <Select
            label="Alert Level"
            options={alertThresholds}
            value={alertThreshold}
            onChange={(value) => handleFilterChange('alertThreshold', value)}
            className="min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;