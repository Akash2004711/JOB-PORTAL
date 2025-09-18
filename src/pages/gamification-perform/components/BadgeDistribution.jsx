import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const BadgeDistribution = ({ badgeData }) => {
  const COLORS = [
    'var(--color-analytics-blue)',
    'var(--color-analytics-green)', 
    'var(--color-analytics-orange)',
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)'
  ];

  const totalBadges = badgeData?.reduce((sum, item) => sum + item?.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-analytics-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={data?.icon} size={16} />
            <span className="font-semibold text-foreground">{data?.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-medium text-foreground">{data?.count}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="font-medium text-foreground">
              {((data?.count / totalBadges) * 100)?.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="space-y-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <Icon name={entry?.payload?.icon} size={14} className="text-muted-foreground" />
              <span className="text-foreground">{entry?.payload?.name}</span>
            </div>
            <span className="font-medium text-foreground">{entry?.payload?.count}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="analytics-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Award" size={24} className="text-analytics-green" />
        <h2 className="text-xl font-semibold text-foreground">Badge Distribution</h2>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={badgeData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="count"
            >
              {badgeData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend payload={badgeData?.map((item, index) => ({
        ...item,
        color: COLORS?.[index % COLORS?.length]
      }))} />
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">{totalBadges}</p>
            <p className="text-sm text-muted-foreground">Total Badges</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{badgeData?.length}</p>
            <p className="text-sm text-muted-foreground">Badge Types</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDistribution;