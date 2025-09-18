import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EngagementTimeline = ({ timelineData, onActivityClick }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedActivityType, setSelectedActivityType] = useState('all');

  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const activityTypes = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'badge', label: 'Badge Earned', icon: 'Award' },
    { value: 'milestone', label: 'Milestone', icon: 'Flag' },
    { value: 'achievement', label: 'Achievement', icon: 'Trophy' },
    { value: 'level_up', label: 'Level Up', icon: 'TrendingUp' }
  ];

  const getFilteredData = () => {
    let data = timelineData?.[selectedPeriod] || [];
    
    if (selectedActivityType !== 'all') {
      data = data?.filter(item => item?.type === selectedActivityType);
    }
    
    return data;
  };

  const getActivityIcon = (type) => {
    const activityType = activityTypes?.find(at => at?.value === type);
    return activityType ? activityType?.icon : 'Activity';
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'badge':
        return 'text-analytics-orange bg-analytics-orange/10';
      case 'milestone':
        return 'text-analytics-blue bg-analytics-blue/10';
      case 'achievement':
        return 'text-analytics-green bg-analytics-green/10';
      case 'level_up':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const groupActivitiesByHour = (activities) => {
    const grouped = {};
    activities?.forEach(activity => {
      const hour = new Date(activity.timestamp)?.getHours();
      if (!grouped?.[hour]) {
        grouped[hour] = [];
      }
      grouped?.[hour]?.push(activity);
    });
    return grouped;
  };

  const getHeatmapIntensity = (count) => {
    if (count === 0) return 'bg-muted/20';
    if (count <= 2) return 'bg-analytics-blue/30';
    if (count <= 5) return 'bg-analytics-blue/60';
    return 'bg-analytics-blue';
  };

  const filteredData = getFilteredData();
  const groupedActivities = groupActivitiesByHour(filteredData);

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Engagement Timeline</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            {periodOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={selectedPeriod === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          <select
            value={selectedActivityType}
            onChange={(e) => setSelectedActivityType(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {activityTypes?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Activity Heatmap */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Activity Heatmap (24 Hours)</h3>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 24 }, (_, hour) => {
            const count = groupedActivities?.[hour]?.length || 0;
            return (
              <div
                key={hour}
                className={`h-8 rounded ${getHeatmapIntensity(count)} flex items-center justify-center cursor-pointer transition-all hover:scale-110`}
                title={`${hour}:00 - ${count} activities`}
              >
                <span className="text-xs font-medium text-foreground">
                  {hour}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
      </div>
      {/* Timeline Activities */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredData?.length > 0 ? (
          filteredData?.map((activity, index) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border hover:shadow-analytics transition-all cursor-pointer"
              onClick={() => onActivityClick(activity)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{activity?.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{formatTime(activity?.timestamp)}</span>
                    {selectedPeriod !== 'today' && (
                      <>
                        <span>•</span>
                        <span>{formatDate(activity?.timestamp)}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{activity?.candidateName}</span>
                    </div>
                    {activity?.points && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={14} className="text-analytics-orange" />
                        <span className="text-sm font-medium text-analytics-orange">
                          +{activity?.points} points
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {activity?.impact && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity?.impact === 'high' ? 'bg-success/10 text-success' :
                      activity?.impact === 'medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {activity?.impact} impact
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activities found for the selected period.</p>
          </div>
        )}
      </div>
      {/* Timeline Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{filteredData?.length}</p>
            <p className="text-xs text-muted-foreground">Total Activities</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {filteredData?.filter(a => a?.type === 'badge')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Badges Earned</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {filteredData?.reduce((sum, a) => sum + (a?.points || 0), 0)}
            </p>
            <p className="text-xs text-muted-foreground">Points Awarded</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {new Set(filteredData.map(a => a.candidateId))?.size}
            </p>
            <p className="text-xs text-muted-foreground">Active Candidates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementTimeline;