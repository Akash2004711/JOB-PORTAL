import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const ExportControls = ({ 
  currentView = 'dashboard',
  onExport,
  className = ""
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'csv', label: 'CSV Data', icon: 'Table' },
    { value: 'xlsx', label: 'Excel Workbook', icon: 'Sheet' },
    { value: 'png', label: 'PNG Image', icon: 'Image' },
    { value: 'pptx', label: 'PowerPoint', icon: 'Presentation' }
  ];

  const exportOptions = {
    dashboard: [
      { value: 'current_view', label: 'Current Dashboard View' },
      { value: 'all_metrics', label: 'All Metrics Summary' },
      { value: 'detailed_report', label: 'Detailed Analytics Report' }
    ],
    executive: [
      { value: 'executive_summary', label: 'Executive Summary' },
      { value: 'kpi_report', label: 'KPI Performance Report' },
      { value: 'board_presentation', label: 'Board Presentation' }
    ],
    operations: [
      { value: 'operations_report', label: 'Operations Report' },
      { value: 'team_performance', label: 'Team Performance Data' },
      { value: 'pipeline_analysis', label: 'Pipeline Analysis' }
    ],
    candidates: [
      { value: 'candidate_data', label: 'Candidate Analytics' },
      { value: 'sourcing_report', label: 'Sourcing Effectiveness' },
      { value: 'diversity_metrics', label: 'Diversity & Inclusion Metrics' }
    ],
    engagement: [
      { value: 'engagement_report', label: 'Engagement Analytics' },
      { value: 'gamification_data', label: 'Gamification Performance' },
      { value: 'user_activity', label: 'User Activity Report' }
    ]
  };

  const getCurrentOptions = () => {
    return exportOptions?.[currentView] || exportOptions?.dashboard;
  };

  const handleExport = async (format, content) => {
    if (onExport && !isExporting) {
      setIsExporting(true);
      try {
        await onExport({ format, content, view: currentView });
      } catch (error) {
        console.error('Export failed:', error);
      } finally {
        setIsExporting(false);
        setIsDropdownOpen(false);
      }
    }
  };

  const getFormatIcon = (format) => {
    const formatData = exportFormats?.find(f => f?.value === format);
    return formatData ? formatData?.icon : 'Download';
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Export Format Selector */}
      <div className="hidden md:block">
        <Select
          options={exportFormats}
          value={exportFormat}
          onChange={setExportFormat}
          placeholder="Export format"
          className="w-40"
        />
      </div>
      {/* Quick Export Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleExport(exportFormat, 'current_view')}
        disabled={isExporting}
        iconName={isExporting ? 'Loader2' : getFormatIcon(exportFormat)}
        iconPosition="left"
        className={isExporting ? 'animate-pulse' : ''}
      >
        {isExporting ? 'Exporting...' : 'Export'}
      </Button>
      {/* Advanced Export Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-9 w-9"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-analytics-lg z-200">
            <div className="p-3 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground">Export Options</h4>
              <p className="text-xs text-muted-foreground mt-1">Choose what to export</p>
            </div>
            
            <div className="py-2">
              {getCurrentOptions()?.map((option) => (
                <div key={option?.value} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">{option?.label}</div>
                    </div>
                    <div className="flex space-x-1">
                      {exportFormats?.slice(0, 3)?.map((format) => (
                        <Button
                          key={format?.value}
                          variant="ghost"
                          size="icon"
                          onClick={() => handleExport(format?.value, option?.value)}
                          disabled={isExporting}
                          className="h-6 w-6"
                          title={`Export as ${format?.label}`}
                        >
                          <Icon name={format?.icon} size={12} />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border bg-muted/30">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Info" size={12} />
                <span>Exports include current filter settings</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Export History (Desktop Only) */}
      <div className="hidden lg:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-xs"
        >
          <Icon name="History" size={14} className="mr-1" />
          Recent
        </Button>
      </div>
    </div>
  );
};

export default ExportControls;