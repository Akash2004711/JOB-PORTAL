import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIStrip = () => {
  const kpiData = [
    {
      id: 'applications',
      label: 'Active Applications',
      value: 1247,
      change: '+12%',
      trend: 'up',
      status: 'good',
      icon: 'FileText',
      description: 'Applications in pipeline'
    },
    {
      id: 'reviews',
      label: 'Pending Reviews',
      value: 89,
      change: '+5%',
      trend: 'up',
      status: 'warning',
      icon: 'Clock',
      description: 'Awaiting recruiter review'
    },
    {
      id: 'interviews',
      label: 'Scheduled Interviews',
      value: 156,
      change: '-3%',
      trend: 'down',
      status: 'good',
      icon: 'Calendar',
      description: 'Interviews this week'
    },
    {
      id: 'offers',
      label: 'Offers Pending',
      value: 23,
      change: '+8%',
      trend: 'up',
      status: 'critical',
      icon: 'Award',
      description: 'Awaiting candidate response'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'good':
        return 'bg-success/10 border-success/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'critical':
        return 'bg-destructive/10 border-destructive/20';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData?.map((kpi) => (
        <div
          key={kpi?.id}
          className={`analytics-card p-4 border-2 ${getStatusBg(kpi?.status)} transition-analytics`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(kpi?.status)}`}>
              <Icon name={kpi?.icon} size={20} className={getStatusColor(kpi?.status)} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(kpi?.trend)}`}>
              <Icon name={getTrendIcon(kpi?.trend)} size={14} />
              <span className="text-xs font-medium">{kpi?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="analytics-metric text-foreground">
              {kpi?.value?.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-foreground">{kpi?.label}</div>
            <div className="text-xs text-muted-foreground">{kpi?.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIStrip;