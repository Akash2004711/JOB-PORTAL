import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const GlobalFilters = ({ onFiltersChange, className = "" }) => {
  const [filters, setFilters] = useState({
    timeRange: '30d',
    department: 'all',
    comparison: 'previous',
    location: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'product', label: 'Product' },
    { value: 'operations', label: 'Operations' }
  ];

  const comparisonOptions = [
    { value: 'previous', label: 'Previous period' },
    { value: 'year_ago', label: 'Same period last year' },
    { value: 'benchmark', label: 'Industry benchmark' },
    { value: 'target', label: 'Target goals' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'apac', label: 'Asia Pacific' },
    { value: 'remote', label: 'Remote' }
  ];

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      timeRange: '30d',
      department: 'all',
      comparison: 'previous',
      location: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== 'previous')?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-analytics ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={18} color="var(--color-muted-foreground)" />
          <h3 className="text-sm font-semibold text-foreground">Global Filters</h3>
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
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`p-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Time Range Filter */}
          <div>
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={filters?.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
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

          {/* Comparison Filter */}
          <div>
            <Select
              label="Compare to"
              options={comparisonOptions}
              value={filters?.comparison}
              onChange={(value) => handleFilterChange('comparison', value)}
              className="w-full"
            />
          </div>

          {/* Location Filter */}
          <div>
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
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
            onClick={() => handleFilterChange('timeRange', '7d')}
            className={filters?.timeRange === '7d' ? 'bg-primary text-primary-foreground' : ''}
          >
            This Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('timeRange', '30d')}
            className={filters?.timeRange === '30d' ? 'bg-primary text-primary-foreground' : ''}
          >
            This Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('timeRange', '90d')}
            className={filters?.timeRange === '90d' ? 'bg-primary text-primary-foreground' : ''}
          >
            This Quarter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilters;