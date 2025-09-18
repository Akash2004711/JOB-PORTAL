import React from 'react';
import Icon from '../../../components/AppIcon';

const RecruitmentFunnel = ({ className = "" }) => {
  const funnelData = [
    { 
      stage: 'Applications', 
      count: 12847, 
      percentage: 100, 
      conversionRate: null,
      bottleneck: false,
      color: 'bg-blue-500'
    },
    { 
      stage: 'Initial Screening', 
      count: 3854, 
      percentage: 30, 
      conversionRate: 30.0,
      bottleneck: false,
      color: 'bg-blue-600'
    },
    { 
      stage: 'Phone/Video Interview', 
      count: 1542, 
      percentage: 12, 
      conversionRate: 40.0,
      bottleneck: false,
      color: 'bg-blue-700'
    },
    { 
      stage: 'Technical Assessment', 
      count: 463, 
      percentage: 3.6, 
      conversionRate: 30.0,
      bottleneck: true,
      color: 'bg-orange-500'
    },
    { 
      stage: 'Final Interview', 
      count: 278, 
      percentage: 2.2, 
      conversionRate: 60.0,
      bottleneck: false,
      color: 'bg-blue-800'
    },
    { 
      stage: 'Offers Extended', 
      count: 167, 
      percentage: 1.3, 
      conversionRate: 60.1,
      bottleneck: false,
      color: 'bg-green-600'
    },
    { 
      stage: 'Offers Accepted', 
      count: 134, 
      percentage: 1.0, 
      conversionRate: 80.2,
      bottleneck: false,
      color: 'bg-green-700'
    }
  ];

  const getStageWidth = (percentage) => {
    const minWidth = 20; // Minimum width for visibility
    const maxWidth = 100;
    return Math.max(minWidth, (percentage / 100) * maxWidth);
  };

  return (
    <div className={`analytics-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recruitment Funnel Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">Stage-by-stage conversion rates with bottleneck identification</p>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-muted-foreground">Normal Flow</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-muted-foreground">Bottleneck</span>
          </div>
        </div>
      </div>
      {/* Funnel Visualization */}
      <div className="space-y-4 mb-6">
        {funnelData?.map((stage, index) => (
          <div key={index} className="relative">
            {/* Stage Bar */}
            <div className="flex items-center space-x-4">
              <div className="w-32 text-right">
                <div className="text-sm font-medium text-foreground">{stage?.stage}</div>
                {stage?.conversionRate && (
                  <div className={`text-xs ${stage?.bottleneck ? 'text-warning' : 'text-muted-foreground'}`}>
                    {stage?.conversionRate}% conversion
                  </div>
                )}
              </div>
              
              <div className="flex-1 relative">
                <div className="h-12 bg-muted rounded-lg overflow-hidden">
                  <div 
                    className={`h-full ${stage?.color} transition-all duration-500 flex items-center justify-between px-4`}
                    style={{ width: `${getStageWidth(stage?.percentage)}%` }}
                  >
                    <span className="text-white text-sm font-medium">
                      {stage?.count?.toLocaleString()}
                    </span>
                    <span className="text-white text-xs">
                      {stage?.percentage?.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                {/* Bottleneck Indicator */}
                {stage?.bottleneck && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" size={12} color="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Conversion Arrow */}
            {index < funnelData?.length - 1 && (
              <div className="flex justify-center my-2">
                <Icon name="ChevronDown" size={16} color="var(--color-muted-foreground)" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="analytics-metric text-foreground">1.0%</div>
          <div className="text-xs text-muted-foreground">Overall Conversion</div>
        </div>
        <div className="text-center">
          <div className="analytics-metric text-warning">30%</div>
          <div className="text-xs text-muted-foreground">Bottleneck Impact</div>
        </div>
        <div className="text-center">
          <div className="analytics-metric text-foreground">18.5d</div>
          <div className="text-xs text-muted-foreground">Avg. Time to Hire</div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="mt-4 p-3 bg-warning/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={14} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <div className="text-sm font-medium text-foreground">Optimization Opportunity</div>
            <div className="text-xs text-muted-foreground mt-1">
              Technical Assessment stage shows 30% conversion vs 40%+ industry benchmark. 
              Consider reviewing assessment difficulty or providing better preparation resources.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentFunnel;