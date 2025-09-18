import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsDemandTrending = () => {
  const [viewMode, setViewMode] = useState('trending'); // trending, salary, growth
  const [timeRange, setTimeRange] = useState('6m');

  // Mock trending data
  const trendingData = [
    { month: 'Jan', React: 85, Python: 78, Java: 72, JavaScript: 90, TypeScript: 65, AWS: 58 },
    { month: 'Feb', React: 88, Python: 80, Java: 74, JavaScript: 92, TypeScript: 68, AWS: 62 },
    { month: 'Mar', React: 90, Python: 82, Java: 73, JavaScript: 94, TypeScript: 72, AWS: 65 },
    { month: 'Apr', React: 92, Python: 85, Java: 75, JavaScript: 95, TypeScript: 75, AWS: 68 },
    { month: 'May', React: 94, Python: 87, Java: 76, JavaScript: 96, TypeScript: 78, AWS: 72 },
    { month: 'Jun', React: 96, Python: 89, Java: 78, JavaScript: 98, TypeScript: 82, AWS: 75 }
  ];

  // Mock salary benchmarking data
  const salaryData = [
    { skill: 'React', avgSalary: 95000, demand: 96, growth: 15 },
    { skill: 'Python', avgSalary: 105000, demand: 89, growth: 22 },
    { skill: 'JavaScript', avgSalary: 85000, demand: 98, growth: 8 },
    { skill: 'TypeScript', avgSalary: 98000, demand: 82, growth: 35 },
    { skill: 'Java', avgSalary: 92000, demand: 78, growth: 5 },
    { skill: 'AWS', avgSalary: 115000, demand: 75, growth: 28 },
    { skill: 'Node.js', avgSalary: 88000, demand: 72, growth: 18 },
    { skill: 'Angular', avgSalary: 90000, demand: 65, growth: 12 }
  ];

  const skillColors = {
    React: '#61DAFB',
    Python: '#3776AB',
    Java: '#ED8B00',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    AWS: '#FF9900'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-analytics-lg">
          <div className="font-semibold text-foreground mb-2">{label}</div>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{entry?.dataKey}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderTrendingChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={trendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <Tooltip content={<CustomTooltip />} />
        {Object.keys(skillColors)?.map(skill => (
          <Line
            key={skill}
            type="monotone"
            dataKey={skill}
            stroke={skillColors?.[skill]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderSalaryChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salaryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="skill" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
        />
        <Tooltip 
          formatter={(value, name) => [
            name === 'avgSalary' ? `$${value?.toLocaleString()}` : `${value}%`,
            name === 'avgSalary' ? 'Average Salary' : 'Market Demand'
          ]}
        />
        <Bar dataKey="avgSalary" fill="var(--color-primary)" />
      </BarChart>
    </ResponsiveContainer>
  );

  const getTopSkills = () => {
    return salaryData?.sort((a, b) => b?.demand - a?.demand)?.slice(0, 5);
  };

  const getFastestGrowing = () => {
    return salaryData?.sort((a, b) => b?.growth - a?.growth)?.slice(0, 5);
  };

  return (
    <div className="analytics-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skills Demand & Market Analysis</h3>
          <p className="text-sm text-muted-foreground">Real-time skills trending and salary benchmarking</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'trending' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('trending')}
          >
            Trending
          </Button>
          <Button
            variant={viewMode === 'salary' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('salary')}
          >
            Salary
          </Button>
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        {viewMode === 'trending' ? renderTrendingChart() : renderSalaryChart()}
      </div>
      {/* Skills Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top In-Demand Skills */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-success" />
            Most In-Demand Skills
          </h4>
          <div className="space-y-2">
            {getTopSkills()?.map((skill, index) => (
              <div key={skill?.skill} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                  <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-success font-medium">{skill?.demand}%</span>
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-success rounded-full" 
                      style={{ width: `${skill?.demand}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fastest Growing Skills */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center">
            <Icon name="Zap" size={16} className="mr-2 text-warning" />
            Fastest Growing Skills
          </h4>
          <div className="space-y-2">
            {getFastestGrowing()?.map((skill, index) => (
              <div key={skill?.skill} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                  <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-warning font-medium">+{skill?.growth}%</span>
                  <Icon name="ArrowUp" size={14} className="text-warning" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Market Insights */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">Market Leader</div>
            <div className="text-muted-foreground">JavaScript (98% demand)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Highest Salary</div>
            <div className="text-success">AWS ($115,000 avg)</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Emerging Skill</div>
            <div className="text-warning">TypeScript (+35% growth)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsDemandTrending;