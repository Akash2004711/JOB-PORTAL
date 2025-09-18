import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend = 'up',
  description,
  className = "" 
}) => {
  const getTrendColor = () => {
    if (changeType === 'positive') return trend === 'up' ? 'text-success' : 'text-destructive';
    if (changeType === 'negative') return trend === 'up' ? 'text-destructive' : 'text-success';
    return 'text-warning';
  };

  const getTrendIcon = () => {
    if (changeType === 'positive') return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
    if (changeType === 'negative') return trend === 'up' ? 'TrendingDown' : 'TrendingUp';
    return 'Minus';
  };

  return (
    <div className={`analytics-card p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="analytics-metric text-foreground">{value}</div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-sm font-medium">{change}</span>
          </div>
          <span className="text-xs text-muted-foreground">vs previous period</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;