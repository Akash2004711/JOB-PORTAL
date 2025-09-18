import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const TalentPipelineGauge = ({ className = "" }) => {
  const pipelineHealth = 78; // Overall health percentage
  
  const pipelineData = [
    { name: 'Healthy', value: pipelineHealth, color: 'var(--color-success)' },
    { name: 'Remaining', value: 100 - pipelineHealth, color: 'var(--color-muted)' }
  ];

  const stageMetrics = [
    { stage: 'Sourcing', count: 1247, trend: 'up', change: '+12%' },
    { stage: 'Screening', count: 342, trend: 'up', change: '+8%' },
    { stage: 'Interviewing', count: 89, trend: 'down', change: '-3%' },
    { stage: 'Offers', count: 23, trend: 'up', change: '+15%' }
  ];

  const getHealthStatus = () => {
    if (pipelineHealth >= 80) return { status: 'Excellent', color: 'text-success', icon: 'CheckCircle' };
    if (pipelineHealth >= 60) return { status: 'Good', color: 'text-warning', icon: 'AlertCircle' };
    return { status: 'Needs Attention', color: 'text-destructive', icon: 'XCircle' };
  };

  const healthStatus = getHealthStatus();

  return (
    <div className={`analytics-card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Talent Pipeline Health</h3>
        <p className="text-sm text-muted-foreground mt-1">Real-time pipeline status and flow metrics</p>
      </div>
      {/* Pipeline Health Gauge */}
      <div className="relative mb-6">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pipelineData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                {pipelineData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="analytics-metric text-foreground">{pipelineHealth}%</div>
          <div className={`flex items-center space-x-1 ${healthStatus?.color}`}>
            <Icon name={healthStatus?.icon} size={14} />
            <span className="text-sm font-medium">{healthStatus?.status}</span>
          </div>
        </div>
      </div>
      {/* Stage Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Pipeline Stages</h4>
        {stageMetrics?.map((stage, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-foreground">{stage?.stage}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stage?.count?.toLocaleString()}</span>
              <div className={`flex items-center space-x-1 ${
                stage?.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon name={stage?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span className="text-xs">{stage?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pipeline Velocity */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg. Pipeline Velocity</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">18.5 days</span>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="TrendingDown" size={12} />
              <span className="text-xs">-2.3d</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentPipelineGauge;