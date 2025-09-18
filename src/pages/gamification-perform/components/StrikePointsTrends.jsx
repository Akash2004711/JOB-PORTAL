import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StrikePointsTrends = ({ trendsData, thresholds }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('totalPoints');

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const metricOptions = [
    { value: 'totalPoints', label: 'Total Points', color: 'var(--color-analytics-blue)' },
    { value: 'averagePoints', label: 'Average Points', color: 'var(--color-analytics-green)' },
    { value: 'activeUsers', label: 'Active Users', color: 'var(--color-analytics-orange)' }
  ];

  const getCurrentData = () => {
    return trendsData?.[timeRange] || [];
  };

  const getCurrentMetric = () => {
    return metricOptions?.find(m => m?.value === selectedMetric);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-analytics-lg">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Total Points: </span>
              <span className="font-medium text-foreground">{data?.totalPoints?.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Average Points: </span>
              <span className="font-medium text-foreground">{data?.averagePoints}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Active Users: </span>
              <span className="font-medium text-foreground">{data?.activeUsers}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getThresholdValue = () => {
    switch (selectedMetric) {
      case 'totalPoints':
        return thresholds?.totalPoints;
      case 'averagePoints':
        return thresholds?.averagePoints;
      case 'activeUsers':
        return thresholds?.activeUsers;
      default:
        return 0;
    }
  };

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Strike Points Trends</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            {timeRangeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={timeRange === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metricOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getCurrentData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={getThresholdValue()} 
              stroke="var(--color-warning)" 
              strokeDasharray="5 5"
              label={{ value: "Target", position: "topRight" }}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={getCurrentMetric()?.color}
              strokeWidth={3}
              dot={{ fill: getCurrentMetric()?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: getCurrentMetric()?.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {metricOptions?.map((metric) => {
          const currentData = getCurrentData();
          const latestValue = currentData?.[currentData?.length - 1]?.[metric?.value] || 0;
          const previousValue = currentData?.[currentData?.length - 2]?.[metric?.value] || 0;
          const change = previousValue ? ((latestValue - previousValue) / previousValue * 100) : 0;
          
          return (
            <div key={metric?.value} className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className="text-lg font-bold text-foreground">
                  {typeof latestValue === 'number' ? latestValue?.toLocaleString() : latestValue}
                </span>
                <Icon 
                  name={change > 0 ? "TrendingUp" : change < 0 ? "TrendingDown" : "Minus"} 
                  size={16} 
                  className={change > 0 ? "text-success" : change < 0 ? "text-destructive" : "text-muted-foreground"}
                />
              </div>
              <p className="text-xs text-muted-foreground">{metric?.label}</p>
              <p className={`text-xs font-medium ${change > 0 ? "text-success" : change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                {change > 0 ? '+' : ''}{change?.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StrikePointsTrends;