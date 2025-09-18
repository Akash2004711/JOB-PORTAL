import React from 'react';
import Icon from '../../../components/AppIcon';

const CandidateMetricsOverview = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Average Credibility Score',
      value: metrics?.avgCredibilityScore,
      change: metrics?.credibilityChange,
      trend: 'up',
      icon: 'Shield',
      color: 'text-analytics-blue',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Badge Distribution',
      value: `${metrics?.badgeDistribution}%`,
      change: metrics?.badgeChange,
      trend: 'up',
      icon: 'Award',
      color: 'text-analytics-green',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Profile Completeness',
      value: `${metrics?.profileCompleteness}%`,
      change: metrics?.completenessChange,
      trend: 'up',
      icon: 'User',
      color: 'text-analytics-orange',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'AI Matching Accuracy',
      value: `${metrics?.aiMatchingAccuracy}%`,
      change: metrics?.matchingChange,
      trend: 'up',
      icon: 'Brain',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const generateSparklineData = () => {
    return Array.from({ length: 12 }, (_, i) => Math.random() * 40 + 60);
  };

  const SparklineChart = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg className="w-16 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards?.map((metric, index) => (
        <div key={index} className="analytics-card p-6 hover:shadow-analytics-lg transition-analytics">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className="text-right">
              <SparklineChart 
                data={generateSparklineData()} 
                color={metric?.color?.includes('blue') ? '#1E40AF' : 
                       metric?.color?.includes('green') ? '#059669' : 
                       metric?.color?.includes('orange') ? '#EA580C' : '#7C3AED'} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="analytics-metric text-foreground">{metric?.value}</span>
              <div className={`flex items-center space-x-1 text-sm ${
                metric?.trend === 'up' ? 'analytics-trend-positive' : 'analytics-trend-negative'
              }`}>
                <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                <span>{metric?.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateMetricsOverview;