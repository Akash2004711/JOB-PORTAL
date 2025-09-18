import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AdvancedFilters = ({ onFiltersChange, savedFilters = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    skillsTaxonomy: 'all',
    experienceLevel: 'all',
    credibilityThreshold: '70',
    timeframe: '30d',
    customDateFrom: '',
    customDateTo: '',
    location: 'all',
    jobCategory: 'all',
    salaryRange: 'all'
  });

  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');

  const skillsOptions = [
    { value: 'all', label: 'All Skills' },
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps & Infrastructure' },
    { value: 'data', label: 'Data Science & Analytics' },
    { value: 'ai_ml', label: 'AI & Machine Learning' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'product', label: 'Product Management' },
    { value: 'marketing', label: 'Digital Marketing' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-8 years)' },
    { value: 'lead', label: 'Lead Level (9-12 years)' },
    { value: 'executive', label: 'Executive (12+ years)' }
  ];

  const timeframeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '6m', label: 'Last 6 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'us', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'apac', label: 'Asia Pacific' },
    { value: 'remote', label: 'Remote Only' }
  ];

  const jobCategoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' }
  ];

  const salaryRangeOptions = [
    { value: 'all', label: 'All Salary Ranges' },
    { value: '0-50k', label: '$0 - $50,000' },
    { value: '50k-80k', label: '$50,000 - $80,000' },
    { value: '80k-120k', label: '$80,000 - $120,000' },
    { value: '120k-160k', label: '$120,000 - $160,000' },
    { value: '160k+', label: '$160,000+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      skillsTaxonomy: 'all',
      experienceLevel: 'all',
      credibilityThreshold: '70',
      timeframe: '30d',
      customDateFrom: '',
      customDateTo: '',
      location: 'all',
      jobCategory: 'all',
      salaryRange: 'all'
    };
    setFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  const saveBookmark = () => {
    if (bookmarkName?.trim()) {
      // In real app, this would save to backend
      console.log('Saving bookmark:', { name: bookmarkName, filters });
      setShowBookmarkModal(false);
      setBookmarkName('');
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== 'all' && value !== '70' && value !== '30d' && value !== ''
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-analytics mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={18} color="var(--color-muted-foreground)" />
          <h3 className="text-sm font-semibold text-foreground">Advanced Filters</h3>
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
            onClick={() => setShowBookmarkModal(true)}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Select
            label="Skills Taxonomy"
            options={skillsOptions}
            value={filters?.skillsTaxonomy}
            onChange={(value) => handleFilterChange('skillsTaxonomy', value)}
            searchable
          />

          <Select
            label="Experience Level"
            options={experienceOptions}
            value={filters?.experienceLevel}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
          />

          <div>
            <Input
              label="Credibility Threshold"
              type="number"
              min="0"
              max="100"
              value={filters?.credibilityThreshold}
              onChange={(e) => handleFilterChange('credibilityThreshold', e?.target?.value)}
              description="Minimum credibility score"
            />
          </div>

          <Select
            label="Timeframe"
            options={timeframeOptions}
            value={filters?.timeframe}
            onChange={(value) => handleFilterChange('timeframe', value)}
          />
        </div>

        {filters?.timeframe === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="From Date"
              type="date"
              value={filters?.customDateFrom}
              onChange={(e) => handleFilterChange('customDateFrom', e?.target?.value)}
            />
            <Input
              label="To Date"
              type="date"
              value={filters?.customDateTo}
              onChange={(e) => handleFilterChange('customDateTo', e?.target?.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => handleFilterChange('location', value)}
          />

          <Select
            label="Job Category"
            options={jobCategoryOptions}
            value={filters?.jobCategory}
            onChange={(value) => handleFilterChange('jobCategory', value)}
          />

          <Select
            label="Salary Range"
            options={salaryRangeOptions}
            value={filters?.salaryRange}
            onChange={(value) => handleFilterChange('salaryRange', value)}
          />
        </div>

        {/* Saved Filters */}
        {savedFilters?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Bookmark" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">Saved Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedFilters?.map((saved, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters(saved?.filters);
                    if (onFiltersChange) {
                      onFiltersChange(saved?.filters);
                    }
                  }}
                >
                  {saved?.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Bookmark Modal */}
      {showBookmarkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
          <div className="bg-card border border-border rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold text-foreground mb-4">Save Filter Combination</h3>
            <Input
              label="Bookmark Name"
              value={bookmarkName}
              onChange={(e) => setBookmarkName(e?.target?.value)}
              placeholder="Enter a name for this filter combination"
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowBookmarkModal(false);
                  setBookmarkName('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveBookmark} disabled={!bookmarkName?.trim()}>
                Save Bookmark
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;