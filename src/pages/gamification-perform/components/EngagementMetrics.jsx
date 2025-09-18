import React from 'react';
import Icon from '../../../components/AppIcon';

const EngagementMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: "Active Participants",
      value: metrics?.activeParticipants,
      change: metrics?.activeParticipantsChange,
      icon: "Users",
      color: "text-analytics-blue",
      bgColor: "bg-analytics-blue/10"
    },
    {
      title: "Avg Credibility Score",
      value: `${metrics?.avgCredibilityScore}/100`,
      change: metrics?.credibilityChange,
      icon: "Award",
      color: "text-analytics-green",
      bgColor: "bg-analytics-green/10"
    },
    {
      title: "Total Badges Earned",
      value: metrics?.totalBadges?.toLocaleString(),
      change: metrics?.badgesChange,
      icon: "Trophy",
      color: "text-analytics-orange",
      bgColor: "bg-analytics-orange/10"
    },
    {
      title: "Engagement Rate",
      value: `${metrics?.engagementRate}%`,
      change: metrics?.engagementChange,
      icon: "TrendingUp",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return "TrendingUp";
    if (change < 0) return "TrendingDown";
    return "Minus";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards?.map((metric, index) => (
        <div key={index} className="analytics-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(metric?.change)}`}>
              <Icon name={getChangeIcon(metric?.change)} size={16} />
              <span className="text-sm font-medium">
                {Math.abs(metric?.change)}%
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {metric?.title}
            </h3>
            <p className="analytics-metric text-foreground">
              {metric?.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EngagementMetrics;