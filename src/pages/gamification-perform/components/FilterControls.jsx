import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange, className = "" }) => {
  const [filters, setFilters] = useState({
    candidateSegment: 'all',
    achievementType: 'all',
    timePeriod: 'daily',
    department: 'all',
    experienceLevel: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const candidateSegmentOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: 'top_performers', label: 'Top Performers' },
    { value: 'rising_stars', label: 'Rising Stars' },
    { value: 'new_joiners', label: 'New Joiners' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const achievementTypeOptions = [
    { value: 'all', label: 'All Achievements' },
    { value: 'badges', label: 'Badges Only' },
    { value: 'milestones', label: 'Milestones Only' },
    { value: 'level_ups', label: 'Level Ups Only' },
    { value: 'streaks', label: 'Streaks Only' }
  ];

  const timePeriodOptions = [
    { value: 'daily', label: 'Daily View' },
    { value: 'weekly', label: 'Weekly View' },
    { value: 'monthly', label: 'Monthly View' },
    { value: 'quarterly', label: 'Quarterly View' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'product', label: 'Product' },
    { value: 'operations', label: 'Operations' }
  ];

  const experienceLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead Level' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      candidateSegment: 'all',
      achievementType: 'all',
      timePeriod: 'daily',
      department: 'all',
      experienceLevel: 'all'
    };
    setFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== 'daily')?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-analytics mb-6 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Gamification Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            <Icon name="RotateCcw" size={14} className="mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden h-8 w-8"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`p-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Candidate Segment Filter */}
          <div>
            <Select
              label="Candidate Segment"
              options={candidateSegmentOptions}
              value={filters?.candidateSegment}
              onChange={(value) => handleFilterChange('candidateSegment', value)}
              className="w-full"
            />
          </div>

          {/* Achievement Type Filter */}
          <div>
            <Select
              label="Achievement Type"
              options={achievementTypeOptions}
              value={filters?.achievementType}
              onChange={(value) => handleFilterChange('achievementType', value)}
              className="w-full"
            />
          </div>

          {/* Time Period Filter */}
          <div>
            <Select
              label="Time Period"
              options={timePeriodOptions}
              value={filters?.timePeriod}
              onChange={(value) => handleFilterChange('timePeriod', value)}
              className="w-full"
            />
          </div>

          {/* Department Filter */}
          <div>
            <Select
              label="Department"
              options={departmentOptions}
              value={filters?.department}
              onChange={(value) => handleFilterChange('department', value)}
              className="w-full"
            />
          </div>

          {/* Experience Level Filter */}
          <div>
            <Select
              label="Experience Level"
              options={experienceLevelOptions}
              value={filters?.experienceLevel}
              onChange={(value) => handleFilterChange('experienceLevel', value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground self-center mr-2">Quick filters:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('candidateSegment', 'top_performers');
              handleFilterChange('timePeriod', 'weekly');
            }}
            className={filters?.candidateSegment === 'top_performers' && filters?.timePeriod === 'weekly' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Icon name="Trophy" size={14} className="mr-1" />
            Top Weekly
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('achievementType', 'badges');
              handleFilterChange('timePeriod', 'daily');
            }}
            className={filters?.achievementType === 'badges' && filters?.timePeriod === 'daily' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Icon name="Award" size={14} className="mr-1" />
            Daily Badges
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('candidateSegment', 'rising_stars');
              handleFilterChange('timePeriod', 'monthly');
            }}
            className={filters?.candidateSegment === 'rising_stars' && filters?.timePeriod === 'monthly' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Icon name="TrendingUp" size={14} className="mr-1" />
            Rising Monthly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;